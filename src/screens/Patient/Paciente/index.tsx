import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import styles from './styles';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../../../routes/types';

import {
  useNavigation,
} from '@react-navigation/native';

import AppFooter from '../../../components/Footer/Footer';
import Header from '../../../components/HeaderSecundario';

type NavProps =
  NativeStackNavigationProp<
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
  const [pacientes, setPacientes] = useState<PacienteType[]>([]);

  // MODAL
  const [modalVisible, setModalVisible] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<string | null>(null);

  async function buscarPacientes() {
    try {
      setLoading(true);

      const q = query(
        collection(db, 'pacientes'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);

      const lista: PacienteType[] = [];

      querySnapshot.forEach(doc => {
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

  const pacientesFiltrados = pacientes.filter(paciente => {
    const nome = paciente.nomeCompleto?.toLowerCase().trim();
    const textoBusca = busca.toLowerCase().trim();

    return nome.includes(textoBusca);
  });

  // EXCLUIR
  async function excluirPaciente(id: string) {
    try {
      await deleteDoc(doc(db, 'pacientes', id));

      setPacientes(prev =>
        prev.filter(item => item.id !== id)
      );

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  // EDITAR
  function editarPaciente(id: string) {
    setModalVisible(false);

    navigation.navigate('EditarPaciente', {
      pacienteId: id,
    });
  }

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Header title="Pacientes" />

        <View style={styles.body}>

          {/* BUSCA */}
          <View style={styles.searchContainer}>
            <LinearGradient
              colors={['#4C91E6', '#214192']}
              style={styles.searchBox}
            >
              <Ionicons name="search" size={20} color="#FFF" />

              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="João Silva"
                placeholderTextColor="rgba(255,255,255,0.8)"
                style={styles.searchInput}
              />
            </LinearGradient>

            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={18} color="#fff" />
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
              contentContainerStyle={{ paddingBottom: 120 }}
            >
              {/* VAZIO */}
              {pacientesFiltrados.length === 0 && (
                <View style={{ marginTop: 40, alignItems: 'center' }}>
                  <Ionicons name="people-outline" size={50} color="#214192" />

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
              {pacientesFiltrados.map(paciente => (
                <View key={paciente.id} style={styles.card}>

                  {/* AVATAR */}
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {paciente.nomeCompleto
                        ?.split(' ')
                        .map(n => n[0])
                        .join('')
                        .slice(0, 2)}
                    </Text>
                  </View>

                  {/* INFO */}
                  <View style={styles.cardInfo}>
                    <Text style={styles.name}>
                      {paciente.nomeCompleto}
                    </Text>

                    <Text style={styles.details}>
                      {paciente.idade} anos • {paciente.peso} kg
                    </Text>

                    <Text style={styles.details}>
                      ASA: {paciente.asa} • {paciente.procedimento}
                    </Text>

                    <Text style={styles.details}>
                      Comorbidade: {paciente.comorbidade}
                    </Text>

                    <Text style={styles.details}>
                      Nascimento: {paciente.dataNascimento}
                    </Text>
                  </View>

                  {/* SETA */}
                  <TouchableOpacity
                    onPress={() => {
                      setPacienteSelecionado(paciente.id);
                      setModalVisible(true);
                    }}
                  >
                    <Ionicons
                      name="return-up-forward"
                      size={22}
                      color="#2A4FB2"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* MODAL */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 260,
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  marginBottom: 15,
                  textAlign: 'center',
                  color: '#214192',
                }}
              >
                O que deseja fazer?
              </Text>

              {/* EDITAR */}
              <TouchableOpacity
                style={{
                  padding: 12,
                  backgroundColor: '#214192',
                  borderRadius: 8,
                  marginBottom: 10,
                }}
                onPress={() =>
                  editarPaciente(pacienteSelecionado!)
                }
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>
                  Editar Paciente
                </Text>
              </TouchableOpacity>

              {/* EXCLUIR */}
              <TouchableOpacity
                style={{
                  padding: 12,
                  backgroundColor: '#D9534F',
                  borderRadius: 8,
                  marginBottom: 10,
                }}
                onPress={() =>
                  excluirPaciente(pacienteSelecionado!)
                }
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>
                  Excluir Paciente
                </Text>
              </TouchableOpacity>

              {/* CANCELAR */}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    color: '#214192',
                    fontWeight: '600',
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <AppFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}