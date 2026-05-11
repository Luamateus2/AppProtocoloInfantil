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
  doc,
  getDoc,
} from 'firebase/firestore';

import {
  auth,
  db,
} from '../../services/firebaseConfig';

import {
  RootStackParamList,
} from '../../routes/types';

import {
  LogoPrincipal,
} from '../../constants/images';

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

  const [fotoPerfil, setFotoPerfil] =
    useState<string | null>(null);

  const user = auth.currentUser;

  useEffect(() => {

    buscarHistorico();
    carregarFotoPerfil();

  }, []);

  async function carregarFotoPerfil() {

    try {

      if (!user) return;

      const userRef =
        doc(
          db,
          'usuarios',
          user.uid
        );

      const userSnap =
        await getDoc(userRef);

      if (userSnap.exists()) {

        const data =
          userSnap.data();

        if (data.fotoPerfil) {

          setFotoPerfil(
            data.fotoPerfil
          );

          return;
        }
      }

      if (user.photoURL) {

        setFotoPerfil(
          user.photoURL
        );
      }

    } catch (error) {

      console.log(
        'Erro ao carregar foto:',
        error
      );
    }
  }

  function gerarIniciais(
    nome: string
  ) {

    return nome
      .split(' ')
      .filter(Boolean)
      .map(
        (n: string) => n[0]
      )
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
            collection(
              db,
              'pacientes'
            ),
            orderBy(
              'createdAt',
              'desc'
            ),
            limit(4)
          )
        );

      pacientesSnap.forEach(
        (docItem) => {

          const data =
            docItem.data();

          const nome =
            data.nomeCompleto ||
            'Paciente';

          lista.push({
            id: `paciente-${docItem.id}`,
            nome,
            tipo:
              'Cadastro do Paciente',
            data:
              data.dataNascimento ||
              '',
            iniciais:
              gerarIniciais(
                nome
              ),
          });
        }
      );

      const preSnap =
        await getDocs(
          query(
            collection(
              db,
              'preOperatorio'
            ),
            orderBy(
              'createdAt',
              'desc'
            ),
            limit(4)
          )
        );

      preSnap.forEach(
        (docItem) => {

          const data =
            docItem.data();

          lista.push({
            id: `pre-${docItem.id}`,
            nome:
              data.pacienteId ||
              'Paciente',
            tipo:
              'Pré-Operatório',
            data:
              data.data ||
              '',
            iniciais: 'PR',
          });
        }
      );

      const intraSnap =
        await getDocs(
          query(
            collection(
              db,
              'intraOperatorio'
            ),
            orderBy(
              'createdAt',
              'desc'
            ),
            limit(4)
          )
        );

      intraSnap.forEach(
        (docItem) => {

          const data =
            docItem.data();

          lista.push({
            id: `intra-${docItem.id}`,
            nome:
              data.pacienteId ||
              'Paciente',
            tipo:
              'Intra-Operatório',
            data:
              data.data ||
              '',
            iniciais: 'IN',
          });
        }
      );

      const posSnap =
        await getDocs(
          query(
            collection(
              db,
              'posOperatorio'
            ),
            orderBy(
              'createdAt',
              'desc'
            ),
            limit(4)
          )
        );

      posSnap.forEach(
        (docItem) => {

          const data =
            docItem.data();

          lista.push({
            id: `pos-${docItem.id}`,
            nome:
              data.pacienteId ||
              'Paciente',
            tipo:
              'Pós-Operatório',
            data:
              data.data ||
              '',
            iniciais: 'PO',
          });
        }
      );

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
      route: 'Pacientes',
    },
    {
      icon: 'add-outline',
      label: 'Novo\nCadastro',
      route: 'NovoPaciente',
    },
    {
      icon: 'clipboard-outline',
      label: 'Protocolos',
      route: 'Protocolos',
    },
    {
      icon: 'time-outline',
      label: 'Histórico',
      route: 'Historico',
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

        <SafeAreaView
          edges={['top']}
        >

          <View style={styles.header}>

            <Image
              source={
                LogoPrincipal.logo
              }
              style={styles.logo}
              resizeMode="contain"
            />

            <Text
              style={
                styles.headerText
              }
            >
              Seja Bem-Vindo
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  'Settings'
                )
              }
              style={
                styles.headerAvatar
              }
            >

              {fotoPerfil ? (

                <Image
                  source={{
                    uri: fotoPerfil,
                  }}
                  style={
                    styles.avatar
                  }
                />

              ) : (

                <Ionicons
                  name="person-outline"
                  size={24}
                  color="#214192"
                />
              )}

            </TouchableOpacity>

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

          <View
            style={
              styles.menuContainer
            }
          >

            {menu.map(
              (item, index) => (

                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  style={
                    styles.menuCard
                  }
                  onPress={() =>
                    navigation.navigate(
                      item.route as any
                    )
                  }
                >

                  <Ionicons
                    name={
                      item.icon as any
                    }
                    size={28}
                    color="#FFFFFF"
                  />

                  <Text
                    style={
                      styles.menuText
                    }
                  >
                    {item.label}
                  </Text>

                </TouchableOpacity>
              )
            )}

          </View>

          <View
            style={
              styles.sectionHeader
            }
          >

            <Text
              style={
                styles.sectionTitle
              }
            >
              Últimos Registros
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'Historico'
                )
              }
            >

              <Text
                style={
                  styles.seeAll
                }
              >
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
                  textAlign:
                    'center',
                  marginTop: 20,
                  color: '#777',
                }}
              >
                Nenhum registro encontrado
              </Text>

            ) : (

              registros.map(
                (item) => (

                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.id}
                    style={
                      styles.card
                    }
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
                        {
                          item.iniciais
                        }
                      </Text>

                    </View>

                    <View
                      style={
                        styles.infoContainer
                      }
                    >

                      <Text
                        style={
                          styles.name
                        }
                      >
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
                )
              )
            )}

          </View>

        </ScrollView>

      </View>

      <AppFooter />

    </View>
  );
}