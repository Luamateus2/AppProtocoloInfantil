// index.tsx

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

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
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import {
  db,
  auth,
} from '../../../services/firebaseConfig';

import {
  RootStackParamList,
} from '../../../routes/types';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';
import CardModal from '../../../components/Card';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps =
  RouteProp<
    RootStackParamList,
    'PosOperatorio'
  >;

export default function PosOperatorio() {

  const navigation =
    useNavigation<NavProps>();

  const route =
    useRoute<RouteProps>();

  const pacienteId =
    route.params?.pacienteId;

  const [date, setDate] =
    useState(new Date());

  const [showDate, setShowDate] =
    useState(false);

  const [
    horarioTermino,
    setHorarioTermino,
  ] = useState(new Date());

  const [
    showHorario,
    setShowHorario,
  ] = useState(false);

  const [
    recuperacao,
    setRecuperacao,
  ] = useState('Estável');

  const [
    sinaisVitais,
    setSinaisVitais,
  ] = useState(
    '98 bpm | SpO2: 99%'
  );

  const [dor, setDor] =
    useState('2');

  const [
    observacoes,
    setObservacoes,
  ] = useState(
    'Paciente acordado, sem queixas,\nmantendo saturação adequada.'
  );

  const [
    openSelect,
    setOpenSelect,
  ] = useState('');

  const [loading, setLoading] =
    useState(false);

  const [
    modalVisible,
    setModalVisible,
  ] = useState(false);

  const [message, setMessage] =
    useState('');

  const [type, setType] =
    useState<
      'error' | 'success'
    >('error');

  function showError(
    msg: string
  ) {

    setMessage(msg);

    setType('error');

    setModalVisible(true);
  }

  function showSuccess(
    msg: string
  ) {

    setMessage(msg);

    setType('success');

    setModalVisible(true);
  }

  const formatDate = (
    d: Date
  ) =>
    d.toLocaleDateString(
      'pt-BR'
    );

  const formatHour = (
    d: Date
  ) =>
    d.toLocaleTimeString(
      'pt-BR',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );

  async function salvarRegistro() {

    if (!pacienteId) {

      showError(
        'ID do paciente não encontrado.'
      );

      return;
    }

    if (!auth.currentUser) {

      showError(
        'Usuário não está logado.'
      );

      return;
    }

    try {

      setLoading(true);

      await setDoc(
        doc(
          db,
          'posOperatorio',
          pacienteId
        ),
        {
          usuarioId:
            auth.currentUser.uid,

          pacienteId,

          data:
            formatDate(date),

          horarioTermino:
            formatHour(
              horarioTermino
            ),

          recuperacao,
          sinaisVitais,
          dor,
          observacoes,

          criadoEm:
            serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      showSuccess(
        'Registro salvo com sucesso.'
      );

    } catch (error) {

      console.log(error);

      showError(
        'Não foi possível salvar o registro.'
      );

    } finally {

      setLoading(false);
    }
  }

  function fecharModal() {

    setModalVisible(false);

    if (type === 'success') {

      navigation.navigate(
        'Home'
      );
    }
  }

  function SelectBox({
    value,
    opened = false,
  }: {
    value: string;
    opened?: boolean;
  }) {

    return (
      <View style={styles.input}>

        <Text
          style={
            styles.inputText
          }
          numberOfLines={1}
        >
          {value}
        </Text>

        <Ionicons
          name={
            opened
              ? 'chevron-up'
              : 'chevron-down'
          }
          size={18}
          color="#214192"
        />

      </View>
    );
  }

  function OptionList({
    items,
    onSelect,
  }: {
    items: string[];
    onSelect: (
      item: string
    ) => void;
  }) {

    return (
      <View style={styles.dropdown}>

        {items.map(item => (

          <TouchableOpacity
            key={item}
            style={styles.option}
            activeOpacity={0.85}
            onPress={() => {

              onSelect(item);

              setOpenSelect('');
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
        ))}

      </View>
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
        barStyle="light-content"
      />

      <SafeAreaView
        style={styles.safeArea}
        edges={['top']}
      >

        <HeaderSecundario
          title="Pós-Operatório"
          showBackButton
        />

        <View style={styles.body}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.scrollContent
            }
          >

            <TouchableOpacity
              style={styles.date}
              onPress={() =>
                setShowDate(true)
              }
            >

              <Text
                style={
                  styles.dateText
                }
              >
                {formatDate(date)}
              </Text>

            </TouchableOpacity>

            {showDate && (

              <DateTimePicker
                value={date}
                mode="date"
                onChange={(
                  event,
                  selectedDate
                ) => {

                  setShowDate(false);

                  if (
                    selectedDate
                  ) {

                    setDate(
                      selectedDate
                    );
                  }
                }}
              />
            )}

            <View style={styles.row}>

              <Text style={styles.label}>
                Horário de Término
              </Text>

              <TouchableOpacity
                style={
                  styles.dropdownWrapper
                }
                activeOpacity={0.85}
                onPress={() =>
                  setShowHorario(true)
                }
              >

                <SelectBox
                  value={formatHour(
                    horarioTermino
                  )}
                />

              </TouchableOpacity>

            </View>

            {showHorario && (

              <DateTimePicker
                value={
                  horarioTermino
                }
                mode="time"
                is24Hour
                onChange={(
                  event,
                  selectedTime
                ) => {

                  setShowHorario(false);

                  if (
                    selectedTime
                  ) {

                    setHorarioTermino(
                      selectedTime
                    );
                  }
                }}
              />
            )}

            <View
              style={[
                styles.row,
                {
                  zIndex: 999,
                },
              ]}
            >

              <Text style={styles.label}>
                Recuperação
              </Text>

              <View
                style={
                  styles.dropdownWrapper
                }
              >

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect ===
                        'recuperacao'
                        ? ''
                        : 'recuperacao'
                    )
                  }
                >

                  <SelectBox
                    value={
                      recuperacao
                    }
                    opened={
                      openSelect ===
                      'recuperacao'
                    }
                  />

                </TouchableOpacity>

                {openSelect ===
                  'recuperacao' && (

                  <OptionList
                    items={[
                      'Estável',
                      'Sonolento',
                      'Agitado',
                      'Instável',
                    ]}
                    onSelect={
                      setRecuperacao
                    }
                  />
                )}

              </View>

            </View>

            <View
              style={[
                styles.row,
                {
                  zIndex: 998,
                },
              ]}
            >

              <Text style={styles.label}>
                Sinais Vitais
              </Text>

              <View
                style={
                  styles.dropdownWrapper
                }
              >

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect ===
                        'sinais'
                        ? ''
                        : 'sinais'
                    )
                  }
                >

                  <SelectBox
                    value={
                      sinaisVitais
                    }
                    opened={
                      openSelect ===
                      'sinais'
                    }
                  />

                </TouchableOpacity>

                {openSelect ===
                  'sinais' && (

                  <OptionList
                    items={[
                      '98 bpm | SpO2: 99%',
                      '90 bpm | SpO2: 98%',
                      '86 bpm | SpO2: 97%',
                      '100 bpm | SpO2: 96%',
                    ]}
                    onSelect={
                      setSinaisVitais
                    }
                  />
                )}

              </View>

            </View>

            <View
              style={[
                styles.row,
                {
                  zIndex: 997,
                },
              ]}
            >

              <Text style={styles.label}>
                Dor (Escala)
              </Text>

              <View
                style={
                  styles.dropdownWrapper
                }
              >

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect ===
                        'dor'
                        ? ''
                        : 'dor'
                    )
                  }
                >

                  <SelectBox
                    value={dor}
                    opened={
                      openSelect ===
                      'dor'
                    }
                  />

                </TouchableOpacity>

                {openSelect ===
                  'dor' && (

                  <OptionList
                    items={[
                      '0',
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                    ]}
                    onSelect={
                      setDor
                    }
                  />
                )}

              </View>

            </View>

            <Text
              style={
                styles.observacoesLabel
              }
            >
              Observações
            </Text>

            <TextInput
              style={styles.textArea}
              multiline
              value={observacoes}
              onChangeText={
                setObservacoes
              }
              placeholder="Paciente acordado, sem queixas, mantendo saturação adequada."
              placeholderTextColor="#5E6D95"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                salvarRegistro
              }
              disabled={loading}
            >

              <LinearGradient
                colors={[
                  '#3A7BD5',
                  '#2A5298',
                ]}
                style={styles.button}
              >

                <Text
                  style={
                    styles.buttonText
                  }
                >
                  {loading
                    ? 'Salvando...'
                    : 'Salvar Registro'}
                </Text>

              </LinearGradient>

            </TouchableOpacity>

          </ScrollView>

        </View>

        <AppFooter />

        <CardModal
          visible={modalVisible}
          onClose={fecharModal}
        >

          <View
            style={{
              alignItems:
                'center',
            }}
          >

            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 15,
                fontWeight: '600',

                color:
                  type ===
                  'success'
                    ? '#214192'
                    : '#C62828',
              }}
            >
              {message}
            </Text>

            <TouchableOpacity
              onPress={
                fecharModal
              }
              style={{
                backgroundColor:
                  type ===
                  'success'
                    ? '#4A90E2'
                    : '#C62828',

                padding: 12,

                borderRadius: 10,

                width: '100%',

                alignItems:
                  'center',
              }}
            >

              <Text
                style={{
                  color: '#fff',
                  fontWeight:
                    '600',
                }}
              >
                OK
              </Text>

            </TouchableOpacity>

          </View>

        </CardModal>

      </SafeAreaView>

    </LinearGradient>
  );
}