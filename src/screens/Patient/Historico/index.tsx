import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

import { LinearGradient } from 'expo-linear-gradient';

import { db } from '../../../services/firebaseConfig';

import AppFooter from '../../../components/Footer/Footer';
import Header from '../../../components/HeaderSecundario';

import styles from './styles';

import { RootStackParamList } from '../../../routes/types';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Historico'
>;

export default function Historico() {
  const navigation = useNavigation<NavProps>();

  const [loading, setLoading] = useState(true);
  const [historico, setHistorico] = useState<any[]>([]);

  async function buscarHistorico() {
    try {
      setLoading(true);

      const q = query(
        collection(db, 'pacientes'),
        orderBy('createdAt', 'desc')
      );

      const snap = await getDocs(q);

      const lista: any[] = [];

      snap.forEach((doc) => {
        const data = doc.data();

        if (data.preOperatorio) {
          lista.push({
            id: `${doc.id}-pre`,
            paciente: data.nomeCompleto,
            data: data.createdAt?.toDate?.().toLocaleString('pt-BR'),
            titulo: 'Pré-Operatório',
            descricao: data.preOperatorio.observacoes,
          });
        }

        if (data.intraOperatorio) {
          lista.push({
            id: `${doc.id}-intra`,
            paciente: data.nomeCompleto,
            data: data.createdAt?.toDate?.().toLocaleString('pt-BR'),
            titulo: 'Intra-Operatório',
            descricao: data.intraOperatorio.observacoes,
          });
        }

        if (data.posOperatorio) {
          lista.push({
            id: `${doc.id}-pos`,
            paciente: data.nomeCompleto,
            data: data.createdAt?.toDate?.().toLocaleString('pt-BR'),
            titulo: 'Pós-Operatório',
            descricao: data.posOperatorio.observacoes,
          });
        }
      });

      setHistorico(lista);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarHistorico();
  }, []);

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        <Header title="Histórico" />

        <View style={styles.content}>

          {loading ? (
            <ActivityIndicator size="large" color="#214192" />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>

              {/* LINHA CENTRAL FIXA */}
              <View style={styles.timelineLine} />

              {historico.map((item) => (
                <View key={item.id} style={styles.row}>

                  {/* COLUNA ESQUERDA (BOLINHA) */}
                  <View style={styles.leftCol}>
                    <View style={styles.dot} />
                  </View>

                  {/* CARD */}
                  <View style={styles.card}>

                    <Text style={styles.date}>{item.data}</Text>

                    <Text style={styles.title}>{item.titulo}</Text>

                    <Text style={styles.patient}>{item.paciente}</Text>

                    <Text style={styles.description}>
                      {item.descricao}
                    </Text>

                    <Text style={styles.arrow}>›</Text>

                  </View>

                </View>
              ))}

              {historico.length === 0 && (
                <View style={{ marginTop: 40, alignItems: 'center' }}>
                  <Text>Nenhum histórico encontrado</Text>
                </View>
              )}

            </ScrollView>
          )}

        </View>

        <AppFooter />

      </SafeAreaView>
    </LinearGradient>
  );
}