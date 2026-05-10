// Historico.tsx

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

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

import {
  RootStackParamList,
} from '../../../routes/types';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Historico'
>;

type HistoricoItem = {
  id: string;
  paciente: string;
  data: string;
  titulo: string;
  descricao: string;
};

export default function Historico() {

  const navigation = useNavigation<NavProps>();

  const [loading, setLoading] = useState(true);

  const [historico,
    setHistorico] =
    useState<HistoricoItem[]>([]);

  async function buscarHistorico() {

    try {

      setLoading(true);

      const q = query(
        collection(db, 'pacientes'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot =
        await getDocs(q);

      const lista: HistoricoItem[] = [];

      querySnapshot.forEach((doc) => {

        const data = doc.data();

        /* PRÉ */

        if (data.preOperatorio) {

          lista.push({
            id: `${doc.id}-pre`,

            paciente:
              data.nomeCompleto || 'Paciente',

            data:
              data.createdAt
                ?.toDate?.()
                ?.toLocaleString('pt-BR') ||
              'Sem data',

            titulo: 'Pré-Operatório',

            descricao:
              data.preOperatorio
                ?.observacoes ||
              'Registro pré-operatório realizado.',
          });
        }

        /* INTRA */

        if (data.intraOperatorio) {

          lista.push({
            id: `${doc.id}-intra`,

            paciente:
              data.nomeCompleto || 'Paciente',

            data:
              data.createdAt
                ?.toDate?.()
                ?.toLocaleString('pt-BR') ||
              'Sem data',

            titulo: 'Intra-Operatório',

            descricao:
              data.intraOperatorio
                ?.observacoes ||
              'Registro intra-operatório realizado.',
          });
        }

        /* PÓS */

        if (data.posOperatorio) {

          lista.push({
            id: `${doc.id}-pos`,

            paciente:
              data.nomeCompleto || 'Paciente',

            data:
              data.createdAt
                ?.toDate?.()
                ?.toLocaleString('pt-BR') ||
              'Sem data',

            titulo: 'Pós-Operatório',

            descricao:
              data.posOperatorio
                ?.observacoes ||
              'Registro pós-operatório realizado.',
          });
        }

      });

      setHistorico(lista);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    buscarHistorico();

  }, []);

  return (

    <LinearGradient
      colors={['#214192', '#4293D5']}
      style={{ flex: 1 }}
    >

      <StatusBar barStyle="light-content" />

      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}
      >

         {/* HEADER REUTILIZÁVEL */}
                <Header
                  title="Histórico"
                />
        

        {/* CONTEÚDO */}

        <View style={styles.content}>

          {loading ? (

            <ActivityIndicator
              size="large"
              color="#214192"
              style={{ marginTop: 40 }}
            />

          ) : (

            <ScrollView
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            >

              {/* LINHA DA TIMELINE */}

              <View style={styles.absoluteLine} />

              {historico.map((item) => (

                <View
                  key={item.id}
                  style={styles.itemRow}
                >

                  {/* BOLINHA */}

                  <View style={styles.circleContainer}>

                    <View style={styles.circle} />

                  </View>

                  {/* CARD */}

                  <View style={styles.card}>

                    <Text style={styles.date}>
                      {item.data}
                    </Text>

                    <Text style={styles.title}>
                      {item.titulo}
                    </Text>

                    <Text style={styles.patient}>
                      {item.paciente}
                    </Text>

                    <Text style={styles.description}>
                      {item.descricao}
                    </Text>

                    <Text style={styles.arrow}>
                      →
                    </Text>

                  </View>

                </View>

              ))}

              {!loading &&
                historico.length === 0 && (

                <View style={styles.emptyContainer}>

                  <Text style={styles.emptyText}>
                    Nenhum histórico encontrado
                  </Text>

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