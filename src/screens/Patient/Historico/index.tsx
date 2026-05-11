import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
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
  where,
} from 'firebase/firestore';

import { LinearGradient } from 'expo-linear-gradient';

import {
  db,
  auth,
} from '../../../services/firebaseConfig';

import AppFooter from '../../../components/Footer/Footer';
import Header from '../../../components/HeaderSecundario';

import {
  RootStackParamList,
} from '../../../routes/types';

import {
  setaBaixo,
  setaDireita,
} from '../../../constants/images';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<
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
  const navigation =
    useNavigation<NavProps>();

  const [loading, setLoading] =
    useState(true);

  const [historico, setHistorico] =
    useState<HistoricoItem[]>([]);

  const [nomePaciente, setNomePaciente] =
    useState('Paciente');

  function formatarDataFirestore(valor: any) {
    if (!valor) {
      return '';
    }

    if (valor?.toDate) {
      return valor
        .toDate()
        .toLocaleString('pt-BR');
    }

    return String(valor);
  }

  async function buscarHistorico() {
    if (!auth.currentUser) {
      setHistorico([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const lista: HistoricoItem[] = [];

      const nomesPacientes: {
        [key: string]: string;
      } = {};

      const pacientesSnap =
        await getDocs(
          query(
            collection(db, 'pacientes'),
            where(
              'usuarioId',
              '==',
              auth.currentUser.uid
            ),
            orderBy('createdAt', 'desc')
          )
        );

      pacientesSnap.forEach((docItem) => {
        const data = docItem.data();

        const nome =
          data.nomeCompleto ||
          'Paciente';

        nomesPacientes[docItem.id] =
          nome;

        if (lista.length === 0) {
          setNomePaciente(nome);
        }

        lista.push({
          id: `paciente-${docItem.id}`,
          paciente: nome,
          data:
            formatarDataFirestore(
              data.createdAt
            ) ||
            data.dataNascimento ||
            '',
          titulo: 'Cadastro',
          descricao:
            data.procedimento ||
            data.observacoes ||
            'Paciente cadastrado no sistema.',
        });
      });

      const preSnap =
        await getDocs(
          query(
            collection(db, 'preOperatorio'),
            where(
              'usuarioId',
              '==',
              auth.currentUser.uid
            )
          )
        );

      preSnap.forEach((docItem) => {
        const data = docItem.data();

        const paciente =
          nomesPacientes[
            data.pacienteId
          ] ||
          data.pacienteId ||
          'Paciente';

        lista.push({
          id: `pre-${docItem.id}`,
          paciente,
          data: data.data || '',
          titulo: 'Pré-Operatório',
          descricao:
            data.observacoes ||
            'Avaliação OK, jejum adequado.',
        });
      });

      const intraSnap =
        await getDocs(
          query(
            collection(db, 'intraOperatorio'),
            where(
              'usuarioId',
              '==',
              auth.currentUser.uid
            )
          )
        );

      intraSnap.forEach((docItem) => {
        const data = docItem.data();

        const paciente =
          nomesPacientes[
            data.pacienteId
          ] ||
          data.pacienteId ||
          'Paciente';

        lista.push({
          id: `intra-${docItem.id}`,
          paciente,
          data: data.data || '',
          titulo: 'Intra-Operatório',
          descricao:
            data.observacoes ||
            `Anestesia ${data.anestesia || 'Geral'}, sem intercorrências.`,
        });
      });

      const posSnap =
        await getDocs(
          query(
            collection(db, 'posOperatorio'),
            where(
              'usuarioId',
              '==',
              auth.currentUser.uid
            )
          )
        );

      posSnap.forEach((docItem) => {
        const data = docItem.data();

        const paciente =
          nomesPacientes[
            data.pacienteId
          ] ||
          data.pacienteId ||
          'Paciente';

        lista.push({
          id: `pos-${docItem.id}`,
          paciente,
          data: data.data || '',
          titulo: 'Pós-Operatório',
          descricao:
            data.observacoes ||
            'Paciente estável, alta em breve.',
        });
      });

      setHistorico(lista);
    } catch (error) {
      console.log(
        'Erro ao buscar histórico:',
        error
      );
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
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView
        style={styles.safeArea}
        edges={['top']}
      >
        <Header title="Histórico" />

        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#214192"
            />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                styles.scrollContent
              }
            >
              <View style={styles.patientBadge}>
                <Text style={styles.patientBadgeText}>
                  {nomePaciente}
                </Text>
              </View>

              <View style={styles.timelineWrapper}>
                <View style={styles.timelineLine} />

                {historico.map((item) => (
                  <View
                    key={item.id}
                    style={styles.row}
                  >
                    <View style={styles.leftCol}>
                      <Image
                        source={setaBaixo.logo}
                        style={styles.dotIcon}
                        resizeMode="contain"
                      />
                    </View>

                    <View style={styles.card}>
                      <Text style={styles.date}>
                        {item.data}
                      </Text>

                      <Text style={styles.title}>
                        {item.titulo}
                      </Text>

                      <Text
                        style={styles.description}
                        numberOfLines={1}
                      >
                        {item.descricao}
                      </Text>

                      <Image
                        source={setaDireita.logo}
                        style={styles.arrowImage}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                ))}

                {historico.length === 0 && (
                  <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>
                      Nenhum histórico encontrado
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>

        <AppFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}