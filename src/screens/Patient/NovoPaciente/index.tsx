import React, { useState } from 'react';

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
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

import {
  db,
  auth,
} from '../../../services/firebaseConfig';

import {
  RootStackParamList,
} from '../../../routes/types';

import AppFooter from '../../../components/Footer/Footer';
import Header from '../../../components/HeaderSecundario';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<
    RootStackParamList,
    'NovoPaciente'
  >;

export default function NovoPaciente() {

  const navigation =
    useNavigation<NavProps>();

  const [nomeCompleto, setNomeCompleto] =
    useState('');

  const [dataNascimento, setDataNascimento] =
    useState('');

  const [idade, setIdade] =
    useState('');

  const [asa, setAsa] =
    useState('');

  const [peso, setPeso] =
    useState('');

  const [procedimento, setProcedimento] =
    useState('');

  const [comorbidade, setComorbidade] =
    useState('');

  const [observacoes, setObservacoes] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [openAsa, setOpenAsa] =
    useState(false);

  const asaOptions = [
    'ASA I',
    'ASA II',
    'ASA III',
    'ASA IV',
    'ASA V',
  ];

  async function salvarPaciente() {

    if (!auth.currentUser) {

      Alert.alert(
        'Erro',
        'Usuário não está logado.'
      );

      return;
    }

    if (
      !nomeCompleto ||
      !idade ||
      !asa
    ) {

      Alert.alert(
        'Atenção',
        'Preencha os campos obrigatórios.'
      );

      return;
    }

    try {

      setLoading(true);

      const docRef =
        await addDoc(
          collection(
            db,
            'pacientes'
          ),
          {
            usuarioId:
              auth.currentUser.uid,

            nomeCompleto,
            dataNascimento,
            idade,
            asa,
            peso,
            procedimento,
            comorbidade,
            observacoes,

            createdAt:
              serverTimestamp(),
          }
        );

      navigation.navigate(
        'PreOperatorio',
        {
          pacienteId:
            docRef.id,
        }
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar o paciente.'
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#214192', '#4293D5']}
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
        <Header title="Novo Paciente" />

        <View style={styles.body}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          >

            <Text style={styles.sectionTitle}>
              Dados do Paciente
            </Text>

            <Text style={styles.label}>
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

                <Text style={styles.label}>
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

                <Text style={styles.label}>
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

                <Text style={styles.label}>
                  Classificação ASA
                </Text>

                <View
                  style={
                    styles.selectWrapper
                  }
                >

                  <TouchableOpacity
                    style={styles.select}
                    activeOpacity={0.85}
                    onPress={() =>
                      setOpenAsa(
                        !openAsa
                      )
                    }
                  >

                    <Text
                      style={[
                        styles.selectText,

                        !asa &&
                          styles.selectPlaceholder,
                      ]}
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
                        option => (

                          <TouchableOpacity
                            key={option}
                            style={
                              styles.option
                            }
                            activeOpacity={0.85}
                            onPress={() => {

                              setAsa(
                                option
                              );

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
                              {option}
                            </Text>

                          </TouchableOpacity>
                        )
                      )}

                    </View>
                  )}

                </View>

              </View>

              <View style={styles.half}>

                <Text style={styles.label}>
                  Peso (kg)
                </Text>

                <TextInput
                  placeholder="Ex: 20"
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

            <Text style={styles.label}>
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

            <Text style={styles.label}>
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

            <Text style={styles.label}>
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

            <View style={styles.buttonRow}>

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
                  salvarPaciente
                }
                disabled={loading}
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