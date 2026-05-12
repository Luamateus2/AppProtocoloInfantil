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
  useRoute,
  RouteProp,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import {
  RootStackParamList,
} from '../../../routes/types';

import AppFooter from '../../../components/Footer/Footer';
import Header from '../../../components/HeaderSecundario';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<
    RootStackParamList,
    'EditarPaciente'
  >;

type RouteProps =
  RouteProp<
    RootStackParamList,
    'EditarPaciente'
  >;

export default function EditarPaciente() {

  const navigation =
    useNavigation<NavProps>();

  const route =
    useRoute<RouteProps>();

  const { pacienteId } =
    route.params;

  const [
    nomeCompleto,
    setNomeCompleto,
  ] = useState('');

  const [
    dataNascimento,
    setDataNascimento,
  ] = useState('');

  const [idade, setIdade] =
    useState('');

  const [asa, setAsa] =
    useState('');

  const [peso, setPeso] =
    useState('');

  const [
    procedimento,
    setProcedimento,
  ] = useState('');

  const [
    comorbidade,
    setComorbidade,
  ] = useState('');

  const [
    observacoes,
    setObservacoes,
  ] = useState('');

  const [openAsa, setOpenAsa] =
    useState(false);

  const [
    loadingData,
    setLoadingData,
  ] = useState(true);

  const asaOptions = [
    'ASA I',
    'ASA II',
    'ASA III',
    'ASA IV',
    'ASA V',
  ];

  async function carregarPaciente() {

    try {

      const ref = doc(
        db,
        'pacientes',
        pacienteId
      );

      const snap =
        await getDoc(ref);

      if (!snap.exists()) {

        Alert.alert(
          'Erro',
          'Paciente não encontrado'
        );

        navigation.goBack();

        return;
      }

      const data =
        snap.data();

      setNomeCompleto(
        data.nomeCompleto || ''
      );

      setDataNascimento(
        data.dataNascimento || ''
      );

      setIdade(
        String(data.idade || '')
      );

      setAsa(
        data.asa || ''
      );

      setPeso(
        String(data.peso || '')
      );

      setProcedimento(
        data.procedimento || ''
      );

      setComorbidade(
        data.comorbidade || ''
      );

      setObservacoes(
        data.observacoes || ''
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Falha ao carregar paciente'
      );

    } finally {

      setLoadingData(false);
    }
  }

  useEffect(() => {

    carregarPaciente();

  }, []);

  function continuar() {

    navigation.navigate(
      'EditarPreOperatorio',
      {
        pacienteId,

        pacienteEditado: {
          nomeCompleto,
          dataNascimento,
          idade,
          asa,
          peso,
          procedimento,
          comorbidade,
          observacoes,
        },
      }
    );
  }

  if (loadingData) {

    return (
      <LinearGradient
        colors={[
          '#214192',
          '#4293D5',
        ]}
        style={styles.container}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={['top']}
        >
          <Header
            title="Editar Paciente"
          />

          <View
            style={
              styles.loadingContainer
            }
          >
            <ActivityIndicator
              size="large"
              color="#214192"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[
        '#214192',
        '#4293D5',
      ]}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <SafeAreaView
        style={styles.safeArea}
        edges={['top']}
      >
        <Header
          title="Editar Paciente"
        />

        <View style={styles.body}>

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.scrollContent
            }
          >

            <Text
              style={
                styles.sectionTitle
              }
            >
              Dados do Paciente
            </Text>

            <Text
              style={styles.label}
            >
              Nome Completo
            </Text>

            <TextInput
              placeholder="Digite o nome completo"
              placeholderTextColor="#999"
              style={styles.input}
              value={nomeCompleto}
              onChangeText={
                setNomeCompleto
              }
            />

            <View style={styles.row}>

              <View style={styles.half}>

                <Text
                  style={styles.label}
                >
                  Data de Nascimento
                </Text>

                <TextInput
                  placeholder="dd/mm/aaaa"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={dataNascimento}
                  onChangeText={
                    setDataNascimento
                  }
                />

              </View>

              <View style={styles.half}>

                <Text
                  style={styles.label}
                >
                  Idade
                </Text>

                <TextInput
                  placeholder="anos"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={idade}
                  onChangeText={
                    setIdade
                  }
                  keyboardType="numeric"
                />

              </View>

            </View>

            <View
              style={[
                styles.row,
                {
                  zIndex: 999,
                },
              ]}
            >

              <View style={styles.half}>

                <Text
                  style={styles.label}
                >
                  Classificação ASA
                </Text>

                <View
                  style={
                    styles.dropdownWrapper
                  }
                >

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.select}
                    onPress={() =>
                      setOpenAsa(
                        !openAsa
                      )
                    }
                  >

                    <Text
                      style={
                        styles.selectText
                      }
                      numberOfLines={1}
                    >
                      {asa || 'Selecione'}
                    </Text>

                    <Ionicons
                      name={
                        openAsa
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                      size={18}
                      color="#214192"
                    />

                  </TouchableOpacity>

                  {openAsa && (

                    <View
                      style={
                        styles.dropdown
                      }
                    >

                      {asaOptions.map(
                        item => (

                          <TouchableOpacity
                            key={item}
                            style={
                              styles.option
                            }
                            onPress={() => {

                              setAsa(item);

                              setOpenAsa(
                                false
                              );
                            }}
                          >

                            <Text
                              style={
                                styles.optionText
                              }
                            >
                              {item}
                            </Text>

                          </TouchableOpacity>
                        )
                      )}

                    </View>
                  )}

                </View>

              </View>

              <View style={styles.half}>

                <Text
                  style={styles.label}
                >
                  Peso (kg)
                </Text>

                <TextInput
                  placeholder="Ex: 20 kg"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={peso}
                  onChangeText={
                    setPeso
                  }
                  keyboardType="numeric"
                />

              </View>

            </View>

            <Text
              style={styles.label}
            >
              Procedimento Cirúrgico
            </Text>

            <TextInput
              placeholder="Ex: Adenoidectomia"
              placeholderTextColor="#999"
              style={styles.input}
              value={procedimento}
              onChangeText={
                setProcedimento
              }
            />

            <Text
              style={styles.label}
            >
              Comorbidade Respiratória
            </Text>

            <TextInput
              placeholder="Ex: Asma, cardiopatia..."
              placeholderTextColor="#999"
              style={styles.input}
              value={comorbidade}
              onChangeText={
                setComorbidade
              }
            />

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
              value={observacoes}
              onChangeText={
                setObservacoes
              }
            />

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
                onPress={continuar}
              >

                <Text
                  style={
                    styles.saveText
                  }
                >
                  Continuar
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