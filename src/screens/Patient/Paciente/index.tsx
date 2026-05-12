import React, {
  useEffect,
  useState,
} from 'react';

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
  query,
  deleteDoc,
  doc,
  where,
} from 'firebase/firestore';

import {
  db,
  auth,
} from '../../../services/firebaseConfig';

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
  const navigation =
    useNavigation<NavProps>();

  const [busca, setBusca] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [pacientes, setPacientes] =
    useState<PacienteType[]>([]);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [
    confirmarExclusao,
    setConfirmarExclusao,
  ] = useState(false);

  const [
    pacienteSelecionado,
    setPacienteSelecionado,
  ] = useState<string | null>(null);

  async function buscarPacientes() {
    const user = auth.currentUser;

    if (!user) {
      setPacientes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const q = query(
        collection(db, 'pacientes'),
        where('usuarioId', '==', user.uid)
      );

      const querySnapshot =
        await getDocs(q);

      const lista: PacienteType[] = [];

      querySnapshot.forEach((docItem) => {
        const data = docItem.data();

        lista.push({
          id: docItem.id,
          nomeCompleto:
            data.nomeCompleto ||
            data.nome ||
            '',
          idade:
            String(data.idade || ''),
          peso:
            String(data.peso || ''),
          asa:
            data.asa ||
            data.classificacaoAsa ||
            data.classficacaoAsa ||
            '',
          procedimento:
            data.procedimento ||
            data.tipoCirurgia ||
            '',
          comorbidade:
            data.comorbidade ||
            data.comorbidadeResp ||
            '',
          dataNascimento:
            data.dataNascimento || '',
        });
      });

      lista.sort((a, b) =>
        a.nomeCompleto.localeCompare(
          b.nomeCompleto
        )
      );

      setPacientes(lista);
    } catch (error) {
      console.log(
        'Erro ao buscar pacientes:',
        error
      );

      setPacientes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarPacientes();
  }, []);

  const pacientesFiltrados =
    pacientes.filter((paciente) => {
      const nome =
        paciente.nomeCompleto
          ?.toLowerCase()
          .trim() || '';

      const textoBusca =
        busca.toLowerCase().trim();

      return nome.includes(textoBusca);
    });

  async function excluirPaciente(id: string) {
    try {
      await deleteDoc(
        doc(db, 'pacientes', id)
      );

      await deleteDoc(
        doc(db, 'preOperatorio', id)
      ).catch(() => {});

      await deleteDoc(
        doc(db, 'intraOperatorio', id)
      ).catch(() => {});

      await deleteDoc(
        doc(db, 'posOperatorio', id)
      ).catch(() => {});

      setPacientes((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

      setModalVisible(false);
      setConfirmarExclusao(false);
      setPacienteSelecionado(null);
    } catch (error) {
      console.log(
        'Erro ao excluir paciente:',
        error
      );
    }
  }

  function editarPaciente(id: string) {
    setModalVisible(false);
    setConfirmarExclusao(false);

    navigation.navigate(
      'EditarPaciente',
      {
        pacienteId: id,
      }
    );
  }

  function abrirModalPaciente(id: string) {
    setPacienteSelecionado(id);
    setConfirmarExclusao(false);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
    setConfirmarExclusao(false);
    setPacienteSelecionado(null);
  }

  function pegarIniciais(nome: string) {
    if (!nome) {
      return 'P';
    }

    return nome
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

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
        <Header title="Pacientes" />

        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <LinearGradient
              colors={['#4C91E6', '#214192']}
              style={styles.searchBox}
            >
              <Ionicons
                name="search"
                size={20}
                color="#FFF"
              />

              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="João Silva"
                placeholderTextColor="rgba(255,255,255,0.8)"
                style={styles.searchInput}
              />
            </LinearGradient>

            <TouchableOpacity
              style={styles.filterButton}
            >
              <Ionicons
                name="filter"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

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

              {pacientesFiltrados.map((paciente) => (
                <View
                  key={paciente.id}
                  style={styles.card}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {pegarIniciais(
                        paciente.nomeCompleto
                      )}
                    </Text>
                  </View>

                  <View style={styles.cardInfo}>
                    <Text style={styles.name}>
                      {paciente.nomeCompleto ||
                        'Paciente sem nome'}
                    </Text>

                    <Text style={styles.details}>
                      {paciente.idade || '-'} anos •{' '}
                      {paciente.peso || '-'} kg
                    </Text>

                    <Text style={styles.details}>
                      ASA: {paciente.asa || '-'} •{' '}
                      {paciente.procedimento ||
                        '-'}
                    </Text>

                    <Text style={styles.details}>
                      Comorbidade:{' '}
                      {paciente.comorbidade || '-'}
                    </Text>

                    <Text style={styles.details}>
                      Nascimento:{' '}
                      {paciente.dataNascimento ||
                        '-'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      abrirModalPaciente(
                        paciente.id
                      )
                    }
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

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={fecharModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor:
                'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 290,
                backgroundColor: '#fff',
                borderRadius: 18,
                padding: 22,
              }}
            >
              {!confirmarExclusao ? (
                <>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      marginBottom: 8,
                      textAlign: 'center',
                      color: '#214192',
                    }}
                  >
                    O que deseja fazer?
                  </Text>

                  <TouchableOpacity
                    style={{
                      padding: 13,
                      backgroundColor: '#214192',
                      borderRadius: 12,
                      marginTop: 12,
                    }}
                    onPress={() => {
                      if (pacienteSelecionado) {
                        editarPaciente(
                          pacienteSelecionado
                        );
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '700',
                      }}
                    >
                      Editar Paciente
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      padding: 13,
                      backgroundColor: '#D9534F',
                      borderRadius: 12,
                      marginTop: 10,
                    }}
                    onPress={() =>
                      setConfirmarExclusao(true)
                    }
                  >
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '700',
                      }}
                    >
                      Excluir Paciente
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={fecharModal}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 14,
                        color: '#214192',
                        fontWeight: '700',
                      }}
                    >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Ionicons
                    name="warning-outline"
                    size={42}
                    color="#D9534F"
                    style={{
                      alignSelf: 'center',
                      marginBottom: 8,
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      textAlign: 'center',
                      color: '#D9534F',
                    }}
                  >
                    Confirmar exclusão
                  </Text>

                  <Text
                    style={{
                      color: '#555',
                      textAlign: 'center',
                      fontSize: 14,
                      marginTop: 8,
                      marginBottom: 18,
                    }}
                  >
                    Tem certeza que deseja excluir este
                    paciente? Essa ação não poderá ser
                    desfeita.
                  </Text>

                  <TouchableOpacity
                    style={{
                      padding: 13,
                      backgroundColor: '#D9534F',
                      borderRadius: 12,
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      if (pacienteSelecionado) {
                        excluirPaciente(
                          pacienteSelecionado
                        );
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '700',
                      }}
                    >
                      Sim, excluir
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      padding: 12,
                      backgroundColor: '#E8EEF9',
                      borderRadius: 12,
                    }}
                    onPress={() =>
                      setConfirmarExclusao(false)
                    }
                  >
                    <Text
                      style={{
                        color: '#214192',
                        textAlign: 'center',
                        fontWeight: '700',
                      }}
                    >
                      Não excluir
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

        <AppFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}