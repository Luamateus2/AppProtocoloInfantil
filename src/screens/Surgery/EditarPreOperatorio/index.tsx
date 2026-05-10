import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

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
    'EditarPreOperatorio'
  >;

type RouteParams = RouteProp<
  RootStackParamList,
  'EditarPreOperatorio'
>;

export default function EditarPreoperatorio() {

  const navigation =
    useNavigation<NavProps>();

  const route =
    useRoute<RouteParams>();

  const { pacienteId } =
    route.params;

  const [loading,
    setLoading] =
    useState(false);

  const [loadingPaciente,
    setLoadingPaciente] =
    useState(true);

  const [date,
    setDate] =
    useState(new Date());

  const [showDate,
    setShowDate] =
    useState(false);

  const [tempoJejum,
    setTempoJejum] =
    useState(new Date());

  const [showTimePicker,
    setShowTimePicker] =
    useState(false);

  const [jejumLiquidos,
    setJejumLiquidos] =
    useState<boolean | null>(
      null
    );

  const [
    carboidratoPreOperatorio,
    setCarboidratoPreOperatorio,
  ] =
    useState<boolean | null>(
      null
    );

  const [viaAereaDificil,
    setViaAereaDificil] =
    useState<boolean | null>(
      null
    );

  const [
    avaliacaoAnsiedade,
    setAvaliacaoAnsiedade,
  ] =
    useState<boolean | null>(
      null
    );

  const [observacoes,
    setObservacoes] =
    useState('');

  const formatDate = (
    d: Date
  ) =>
    d.toLocaleDateString(
      'pt-BR'
    );

  const formatTime = (
    date: Date
  ) => {
    return date.toLocaleTimeString(
      'pt-BR',
      {
        hour: '2-digit',
        minute:
          '2-digit',
      }
    );
  };

  function parseDate(
    dateString: string
  ) {

    if (!dateString)
      return new Date();

    const [
      day,
      month,
      year,
    ] =
      dateString.split('/');

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  }

  function parseTime(
    timeString: string
  ) {

    const date =
      new Date();

    if (!timeString)
      return date;

    const [
      hours,
      minutes,
    ] =
      timeString.split(':');

    date.setHours(
      Number(hours)
    );

    date.setMinutes(
      Number(minutes)
    );

    return date;
  }

  const onChangeTime = (
    _: any,
    selectedDate?: Date
  ) => {

    setShowTimePicker(
      false
    );

    if (selectedDate) {
      setTempoJejum(
        selectedDate
      );
    }
  };

  /* CARREGAR DADOS */

  async function carregarDados() {

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

      const pre =
        data.preOperatorio;

      if (!pre)
        return;

      setDate(
        parseDate(
          pre.data
        )
      );

      setJejumLiquidos(
        pre.jejumLiquidos ??
          null
      );

      setTempoJejum(
        parseTime(
          pre.tempoJejum
        )
      );

      setCarboidratoPreOperatorio(
        pre.carboidratoPreOperatorio ??
          null
      );

      setViaAereaDificil(
        pre.viaAereaDificil ??
          null
      );

      setAvaliacaoAnsiedade(
        pre.avaliacaoAnsiedade ??
          null
      );

      setObservacoes(
        pre.observacoes ||
          ''
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados.'
      );

    } finally {

      setLoadingPaciente(
        false
      );
    }
  }

  async function salvarEdicao() {

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
          preOperatorio: {

            data:
              formatDate(
                date
              ),

            jejumLiquidos,

            tempoJejum:
              formatTime(
                tempoJejum
              ),

            carboidratoPreOperatorio,

            viaAereaDificil,

            avaliacaoAnsiedade,

            observacoes,
          },

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
        'Não foi possível salvar.'
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    carregarDados();

  }, []);

  const BooleanSelector = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value:
      | boolean
      | null;
    onChange: (
      value: boolean
    ) => void;
  }) => (
    <View style={styles.row}>

      <Text
        style={
          styles.label
        }
      >
        {label}
      </Text>

      <View
        style={
          styles.booleanContainer
        }
      >

        <TouchableOpacity
          style={[
            styles.booleanButton,
            value ===
              true &&
              styles.booleanButtonActive,
          ]}
          onPress={() =>
            onChange(true)
          }
        >
          <Text
            style={[
              styles.booleanText,
              value ===
                true &&
                styles.booleanTextActive,
            ]}
          >
            Sim
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.booleanButton,
            value ===
              false &&
              styles.booleanButtonActiveRed,
          ]}
          onPress={() =>
            onChange(false)
          }
        >
          <Text
            style={[
              styles.booleanText,
              value ===
                false &&
                styles.booleanTextActive,
            ]}
          >
            Não
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  return (
    <LinearGradient
      colors={[
        '#214192',
        '#4293D5',
      ]}
      style={{ flex: 1 }}
    >

      <StatusBar
        barStyle="light-content"
      />

      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}
      >

        <View
          style={
            styles.header
          }
        >

          <TouchableOpacity
            style={
              styles.back
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
              styles.title
            }
          >
            Editar
            Pré-Operatório
          </Text>

          <View
            style={{
              width: 22,
            }}
          />

        </View>

        <View
          style={styles.body}
        >

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          >

            <TouchableOpacity
              style={
                styles.date
              }
              onPress={() =>
                setShowDate(
                  true
                )
              }
            >
              <Text
                style={
                  styles.dateText
                }
              >
                {formatDate(
                  date
                )}
              </Text>
            </TouchableOpacity>

            {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                display={
                  Platform.OS ===
                  'ios'
                    ? 'spinner'
                    : 'default'
                }
                onChange={(
                  _,
                  selectedDate
                ) => {

                  setShowDate(
                    false
                  );

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

            <BooleanSelector
              label="Jejum de líquidos"
              value={
                jejumLiquidos
              }
              onChange={
                setJejumLiquidos
              }
            />

            <Text
              style={
                styles.label
              }
            >
              Tempo de jejum
            </Text>

            <TouchableOpacity
              style={
                styles.timeButton
              }
              onPress={() =>
                setShowTimePicker(
                  true
                )
              }
            >
              <Text
                style={
                  styles.timeText
                }
              >
                {formatTime(
                  tempoJejum
                )}
              </Text>

              <Ionicons
                name="time-outline"
                size={20}
                color="#214192"
              />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={
                  tempoJejum
                }
                mode="time"
                is24Hour
                display={
                  Platform.OS ===
                  'ios'
                    ? 'spinner'
                    : 'default'
                }
                onChange={
                  onChangeTime
                }
              />
            )}

            <BooleanSelector
              label="Carboidrato pré-operatório administrado"
              value={
                carboidratoPreOperatorio
              }
              onChange={
                setCarboidratoPreOperatorio
              }
            />

            <BooleanSelector
              label="Avaliação de via aérea difícil"
              value={
                viaAereaDificil
              }
              onChange={
                setViaAereaDificil
              }
            />

            <BooleanSelector
              label="Avaliação de ansiedade"
              value={
                avaliacaoAnsiedade
              }
              onChange={
                setAvaliacaoAnsiedade
              }
            />

            <Text
              style={
                styles.label
              }
            >
              Observações
            </Text>

            <TextInput
              placeholder="Digite observações..."
              placeholderTextColor="#999"
              style={
                styles.input
              }
              multiline
              value={
                observacoes
              }
              onChangeText={
                setObservacoes
              }
            />

            <LinearGradient
              colors={[
                '#3A7BD5',
                '#2A5298',
              ]}
              style={
                styles.button
              }
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems:
                    'center',
                }}
                onPress={
                  salvarEdicao
                }
                disabled={
                  loading ||
                  loadingPaciente
                }
              >
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  {loading
                    ? 'Salvando...'
                    : 'Próximo'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>

          </ScrollView>

        </View>

        <AppFooter />

      </SafeAreaView>

    </LinearGradient>
  );
}