import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import styles from './styles';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../../../routes/types';

import AppFooter from '../../../components/Footer';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Pacientes'
>;

type PacienteType = {
  id: string;

  nomeCompleto: string;

  idade: string;

  peso: string;

  asa: string;

  procedimento: string;

  comorbidade: string;

  dataNascimento: string;
};

export default function Pacientes() {

  const navigation = useNavigation<NavProps>();

  const [busca, setBusca] = useState('');

  const [loading, setLoading] = useState(true);

  const [pacientes,
    setPacientes] = useState<PacienteType[]>([]);

  async function buscarPacientes() {

    try {

      setLoading(true);

      const q = query(
        collection(db, 'pacientes'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);

      const lista: PacienteType[] = [];

      querySnapshot.forEach((doc) => {

        lista.push({
          id: doc.id,
          ...doc.data(),
        } as PacienteType);

      });

      setPacientes(lista);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    buscarPacientes();

  }, []);

  /* PESQUISA */

  const pacientesFiltrados = pacientes.filter(
    (paciente) => {

      const nome =
        paciente.nomeCompleto
          ?.toLowerCase()
          .trim();

      const textoBusca =
        busca
          .toLowerCase()
          .trim();

      return nome.includes(textoBusca);
    }
  );

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

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >

            <Ionicons
              name="arrow-back-outline"
              size={26}
              color="#FFFFFF"
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Pacientes
          </Text>

          <View style={{ width: 26 }} />

        </View>

        {/* BODY */}

        <View style={styles.body}>

          {/* CAMPO BUSCA */}

          <View style={styles.searchContainer}>

            <View style={styles.searchBox}>

              <Ionicons
                name="search-outline"
                size={20}
                color="#214192"
              />

              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="Buscar paciente..."
                placeholderTextColor="#8A94A6"
                style={styles.searchInput}
              />

            </View>

            <TouchableOpacity
              style={styles.filterButton}
            >

              <Ionicons
                name="options-outline"
                size={20}
                color="#fff"
              />

            </TouchableOpacity>

          </View>

          {/* LOADING */}

          {loading ? (

            <ActivityIndicator
              size="large"
              color="#214192"
              style={{ marginTop: 40 }}
            />

          ) : (

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 120,
              }}
            >

              {/* SEM RESULTADO */}

              {pacientesFiltrados.length === 0 && (

                <View
                  style={{
                    marginTop: 40,
                    alignItems: 'center',
                  }}
                >

                  <Ionicons
                    name="people-outline"
                    size={50}
                    color="#214192"
                  />

                  <Text
                    style={{
                      marginTop: 10,
                      color: '#214192',
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Nenhum paciente encontrado
                  </Text>

                </View>

              )}

              {/* LISTA */}

              {pacientesFiltrados.map((paciente) => (

                <TouchableOpacity
                  key={paciente.id}
                  style={styles.card}
                  activeOpacity={0.8}
                >

                  {/* AVATAR */}

                  <View style={styles.avatar}>

                    <Text style={styles.avatarText}>

                      {paciente.nomeCompleto
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}

                    </Text>

                  </View>

                  {/* INFORMAÇÕES */}

                  <View style={styles.cardInfo}>

                    <Text style={styles.name}>
                      {paciente.nomeCompleto}
                    </Text>

                    <Text style={styles.details}>
                      {paciente.idade} anos • {paciente.peso} kg
                    </Text>

                    <Text style={styles.details}>
                      {paciente.asa} • {paciente.procedimento}
                    </Text>

                    <Text style={styles.details}>
                      Comorbidade: {paciente.comorbidade}
                    </Text>

                    <Text style={styles.details}>
                      Nascimento: {paciente.dataNascimento}
                    </Text>

                  </View>

                  {/* SETA */}

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#214192"
                  />

                </TouchableOpacity>

              ))}

            </ScrollView>

          )}

        </View>


        <AppFooter />

      </SafeAreaView>

    </LinearGradient>
  );
}