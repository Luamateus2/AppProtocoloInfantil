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
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import AppFooter from '../../../components/Footer/Footer';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<
    RootStackParamList,
    'EditarPaciente'
  >;

type RouteParams = RouteProp<
  RootStackParamList,
  'EditarPaciente'
>;

export default function EditarPaciente() {

  const navigation =
    useNavigation<NavProps>();

  const route =
    useRoute<RouteParams>();

  const { pacienteId } =
    route.params;

  /* STATES */

  const [nomeCompleto,
    setNomeCompleto] =
    useState('');

  const [dataNascimento,
    setDataNascimento] =
    useState('');

  const [idade,
    setIdade] =
    useState('');

  const [asa,
    setAsa] =
    useState('');

  const [peso,
    setPeso] =
    useState('');

  const [procedimento,
    setProcedimento] =
    useState('');

  const [comorbidade,
    setComorbidade] =
    useState('');

  const [observacoes,
    setObservacoes] =
    useState('');

  const [loading,
    setLoading] =
    useState(false);

  const [loadingPaciente,
    setLoadingPaciente] =
    useState(true);

  /* CARREGAR PACIENTE */

  async function carregarPaciente() {

    try {

      const pacienteRef =
        doc(
          db,
          'pacientes',
          pacienteId
        );

      const snapshot =
        await getDoc(
          pacienteRef
        );

      if (
        !snapshot.exists()
      ) {

        Alert.alert(
          'Erro',
          'Paciente não encontrado.'
        );

        navigation.goBack();

        return;
      }

      const data =
        snapshot.data();

      setNomeCompleto(
        data.nomeCompleto ||
          ''
      );

      setDataNascimento(
        data.dataNascimento ||
          ''
      );

      setIdade(
        data.idade || ''
      );

      setAsa(
        data.asa || ''
      );

      setPeso(
        data.peso || ''
      );

      setProcedimento(
        data.procedimento ||
          ''
      );

      setComorbidade(
        data.comorbidade ||
          ''
      );

      setObservacoes(
        data.observacoes ||
          ''
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar o paciente.'
      );

    } finally {

      setLoadingPaciente(
        false
      );
    }
  }

  /* EDITAR PACIENTE */

  async function editarPaciente() {

    try {

      setLoading(true);

      const pacienteRef =
        doc(
          db,
          'pacientes',
          pacienteId
        );

      await updateDoc(
        pacienteRef,
        {
          nomeCompleto,

          dataNascimento,

          idade,

          asa,

          peso,

          procedimento,

          comorbidade,

          observacoes,

          updatedAt:
            serverTimestamp(),
        }
      );

      navigation.navigate(
        'EditarIntraOperatorio',
        {
          pacienteId,
        }
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível atualizar o paciente.'
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    carregarPaciente();

  }, []);

  return (
    <LinearGradient
      colors={[
        '#214192',
        '#4293D5',
      ]}
      style={{ flex: 1 }}
    >

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}
      >

        {/* HEADER */}

        <View
          style={styles.header}
        >

          <TouchableOpacity
            style={
              styles.backButton
            }
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>

          <Text
            style={
              styles.headerTitle
            }
          >
            Editar Paciente
          </Text>

          <View
            style={{
              width: 22,
            }}
          />

        </View>

        {/* BODY */}

        <View style={styles.body}>

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          >

            <Text
              style={
                styles.sectionTitle
              }
            >
              Dados do Paciente
            </Text>

            {/* NOME */}

            <Text
              style={styles.label}
            >
              Nome Completo
            </Text>

            <TextInput
              placeholder="Digite o nome completo"
              placeholderTextColor="#999"
              style={styles.input}
              value={
                nomeCompleto
              }
              onChangeText={
                setNomeCompleto
              }
            />

            {/* DATA + IDADE */}

            <View
              style={styles.row}
            >

              <View
                style={styles.half}
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Data de
                  Nascimento
                </Text>

                <TextInput
                  placeholder="dd/mm/aaaa"
                  placeholderTextColor="#999"
                  style={
                    styles.input
                  }
                  value={
                    dataNascimento
                  }
                  onChangeText={
                    setDataNascimento
                  }
                />

              </View>

              <View
                style={styles.half}
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Idade
                </Text>

                <TextInput
                  placeholder="anos"
                  placeholderTextColor="#999"
                  style={
                    styles.input
                  }
                  value={idade}
                  onChangeText={
                    setIdade
                  }
                  keyboardType="numeric"
                />

              </View>

            </View>

            {/* ASA + PESO */}

            <View
              style={styles.row}
            >

              <View
                style={styles.half}
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Classificação
                  ASA
                </Text>

                <TouchableOpacity
                  style={
                    styles.select
                  }
                >

                  <Text
                    style={
                      styles.selectText
                    }
                  >
                    {asa ||
                      'Selecione'}
                  </Text>

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color="#214192"
                  />

                </TouchableOpacity>

              </View>

              <View
                style={styles.half}
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Peso (kg)
                </Text>

                <TextInput
                  placeholder="Ex: 20 kg"
                  placeholderTextColor="#999"
                  style={
                    styles.input
                  }
                  value={peso}
                  onChangeText={
                    setPeso
                  }
                  keyboardType="numeric"
                />

              </View>

            </View>

            {/* PROCEDIMENTO */}

            <Text
              style={styles.label}
            >
              Procedimento
              Cirúrgico
            </Text>

            <TextInput
              placeholder="Ex: Adenoidectomia"
              placeholderTextColor="#999"
              style={styles.input}
              value={
                procedimento
              }
              onChangeText={
                setProcedimento
              }
            />

            {/* COMORBIDADE */}

            <Text
              style={styles.label}
            >
              Comorbidade
              Respiratória
            </Text>

            <TextInput
              placeholder="Ex: Asma, cardiopatia..."
              placeholderTextColor="#999"
              style={styles.input}
              value={
                comorbidade
              }
              onChangeText={
                setComorbidade
              }
            />

            {/* OBSERVAÇÕES */}

            <Text
              style={styles.label}
            >
              Observações
            </Text>

            <TextInput
              placeholder="Informações adicionais..."
              placeholderTextColor="#999"
              style={[
                styles.input,
                styles.textArea,
              ]}
              multiline
              value={
                observacoes
              }
              onChangeText={
                setObservacoes
              }
            />

            {/* BOTÕES */}

            <View
              style={
                styles.buttonRow
              }
            >

              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={() =>
                  navigation.goBack()
                }
              >
                <Text
                  style={
                    styles.cancelText
                  }
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.saveButton
                }
                onPress={
                  editarPaciente
                }
                disabled={
                  loading ||
                  loadingPaciente
                }
              >
                <Text
                  style={
                    styles.saveText
                  }
                >
                  {loading
                    ? 'Salvando...'
                    : 'Próximo'}
                </Text>
              </TouchableOpacity>

            </View>

          </ScrollView>

        </View>

        <AppFooter />

      </SafeAreaView>

    </LinearGradient>
  );
}