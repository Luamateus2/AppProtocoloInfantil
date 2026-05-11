import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

import {
  db,
} from '../../services/firebaseConfig';

import {
  RootStackParamList,
} from '../../routes/types';

import AppFooter from '../../components/Footer/Footer';

import styles from './styles';

type NavigationProps =
  NativeStackNavigationProp<
    RootStackParamList,
    'Home'
  >;

interface Registro {
  id: string;
  nome: string;
  tipo: string;
  data: string;
  iniciais: string;
}

export default function Home() {
  const navigation =
    useNavigation<NavigationProps>();

  const [registros, setRegistros] =
    useState<Registro[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    buscarHistorico();
  }, []);

  function gerarIniciais(nome: string) {
    return nome
      .split(' ')
      .filter(Boolean)
      .map((n: string) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  async function buscarHistorico() {
    try {
      setLoading(true);

      const lista: Registro[] = [];

      const pacientesSnap =
        await getDocs(
          query(
            collection(db, 'pacientes'),
            orderBy('createdAt', 'desc'),
            limit(4)
          )
        );

      pacientesSnap.forEach((doc) => {
        const data = doc.data();

        const nome =
          data.nomeCompleto ||
          'Paciente';

        lista.push({
          id: `paciente-${doc.id}`,
          nome,
          tipo: 'Cadastro do Paciente',
          data:
            data.dataNascimento ||
            '',
          iniciais:
            gerarIniciais(nome),
        });
      });

      const preSnap =
        await getDocs(
          query(
            collection(db, 'preOperatorio'),
            limit(4)
          )
        );

      preSnap.forEach((doc) => {
        const data = doc.data();

        lista.push({
          id: `pre-${doc.id}`,
          nome:
            data.pacienteId ||
            'Paciente',
          tipo: 'Pré-Operatório',
          data:
            data.data ||
            '',
          iniciais: 'PR',
        });
      });

      const intraSnap =
        await getDocs(
          query(
            collection(db, 'intraOperatorio'),
            limit(4)
          )
        );

      intraSnap.forEach((doc) => {
        const data = doc.data();

        lista.push({
          id: `intra-${doc.id}`,
          nome:
            data.pacienteId ||
            'Paciente',
          tipo: 'Intra-Operatório',
          data:
            data.data ||
            '',
          iniciais: 'IN',
        });
      });

      const posSnap =
        await getDocs(
          query(
            collection(db, 'posOperatorio'),
            limit(4)
          )
        );

      posSnap.forEach((doc) => {
        const data = doc.data();

        lista.push({
          id: `pos-${doc.id}`,
          nome:
            data.pacienteId ||
            'Paciente',
          tipo: 'Pós-Operatório',
          data:
            data.data ||
            '',
          iniciais: 'PO',
        });
      });

      setRegistros(
        lista.slice(0, 4)
      );

    } catch (error) {
      console.log(
        'Erro ao buscar histórico:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const menu = [
    {
      icon: 'people-outline',
      label: 'Pacientes',
    },
    {
      icon: 'add-outline',
      label: 'Novo\nCadastro',
    },
    {
      icon: 'clipboard-outline',
      label: 'Protocolos',
    },
    {
      icon: 'time-outline',
      label: 'Histórico',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={[
          '#214192',
          '#4293D5',
        ]}
        style={
          styles.headerGradient
        }
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate(
                    'Settings'
                  )
                }
              >
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/150?img=12',
                  }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.headerText}>
              Seja Bem-Vindo
            </Text>

            <Image
              source={{
                uri: 'https://i.pravatar.cc/150?img=12',
              }}
              style={styles.avatar}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          <View style={styles.menuContainer}>
            {menu.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={styles.menuCard}
                onPress={() => {
                  if (
                    item.label.includes(
                      'Novo'
                    )
                  ) {
                    navigation.navigate(
                      'NovoPaciente'
                    );
                  }

                  if (
                    item.label.includes(
                      'Pacientes'
                    )
                  ) {
                    navigation.navigate(
                      'Pacientes'
                    );
                  }

                  if (
                    item.label.includes(
                      'Histórico'
                    )
                  ) {
                    navigation.navigate(
                      'Historico'
                    );
                  }
                }}
              >
                <Ionicons
                  name={
                    item.icon as any
                  }
                  size={28}
                  color="#FFFFFF"
                />

                <Text style={styles.menuText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Últimos Registros
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'Historico'
                )
              }
            >
              <Text style={styles.seeAll}>
                Ver Todos &gt;
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#214192"
              />
            ) : registros.length === 0 ? (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: '#777',
                }}
              >
                Nenhum registro encontrado
              </Text>
            ) : (
              registros.map((item) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={item.id}
                  style={styles.card}
                >
                  <View
                    style={
                      styles.initialCircle
                    }
                  >
                    <Text
                      style={
                        styles.initialText
                      }
                    >
                      {item.iniciais}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.infoContainer
                    }
                  >
                    <Text style={styles.name}>
                      {item.nome}
                    </Text>

                    <Text
                      style={
                        styles.subtitle
                      }
                    >
                      {item.tipo}
                      {item.data
                        ? ` • ${item.data}`
                        : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      <AppFooter />
    </View>
  );
}