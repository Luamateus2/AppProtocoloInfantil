import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
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

import DateTimePicker from '@react-native-community/datetimepicker';

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
    'EditarIntraOperatorio'
  >;

type RouteParams = RouteProp<
  RootStackParamList,
  'EditarIntraOperatorio'
>;

export default function EditarIntraOperatorio() {

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

  const [ventilacaoProtetora,
    setVentilacaoProtetora] =
    useState<boolean | null>(
      null
    );

  const [analgesiaMultimodal,
    setAnalgesiaMultimodal] =
    useState<boolean | null>(
      null
    );

  const [dexametasona,
    setDexametasona] =
    useState<boolean | null>(
      null
    );

  const [
    monitorizacaoCapnografica,
    setMonitorizacaoCapnografica,
  ] = useState<boolean | null>(
    null
  );

  const [tempoCirurgia,
    setTempoCirurgia] =
    useState(new Date());

  const [showTimePicker,
    setShowTimePicker] =
    useState(false);

  const [complicacoes,
    setComplicacoes] =
    useState('');

  const [observacoes,
    setObservacoes] =
    useState('');

  function formatTime(
    date: Date
  ) {
    return date.toLocaleTimeString(
      'pt-BR',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
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
      setTempoCirurgia(
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

      const intra =
        data.intraOperatorio;

      if (!intra)
        return;

      setVentilacaoProtetora(
        intra.ventilacaoProtetora ??
          null
      );

      setAnalgesiaMultimodal(
        intra.analgesiaMultimodal ??
          null
      );

      setDexametasona(
        intra.dexametasona ??
          null
      );

      setMonitorizacaoCapnografica(
        intra.monitorizacaoCapnografica ??
          null
      );

      setTempoCirurgia(
        parseTime(
          intra.tempoCirurgia
        )
      );

      setComplicacoes(
        intra.complicacoes ||
          ''
      );

      setObservacoes(
        intra.observacoes ||
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

  /* SALVAR */

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
          intraOperatorio: {

            ventilacaoProtetora,

            analgesiaMultimodal,

            dexametasona,

            monitorizacaoCapnografica,

            tempoCirurgia:
              formatTime(
                tempoCirurgia
              ),

            complicacoes,

            observacoes,
          },

          updatedAt:
            serverTimestamp(),
        }
      );

      navigation.navigate(
        'EditarPosOperatorio',
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

      <Text style={styles.label}>
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
            value === true &&
              styles.booleanButtonActive,
          ]}
          onPress={() =>
            onChange(true)
          }
        >
          <Text
            style={[
              styles.booleanText,
              value === true &&
                styles.booleanTextActive,
            ]}
          >
            Sim
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.booleanButton,
            value === false &&
              styles.booleanButtonActiveRed,
          ]}
          onPress={() =>
            onChange(false)
          }
        >
          <Text
            style={[
              styles.booleanText,
              value === false &&
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
          style={styles.header}
        >

          <TouchableOpacity
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
            Editar
            Intra-Operatório
          </Text>

          <View
            style={{ width: 22 }}
          />

        </View>

        <View style={styles.body}>

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          >

            <BooleanSelector
              label="Ventilação protetora"
              value={
                ventilacaoProtetora
              }
              onChange={
                setVentilacaoProtetora
              }
            />

            <BooleanSelector
              label="Analgesia multimodal"
              value={
                analgesiaMultimodal
              }
              onChange={
                setAnalgesiaMultimodal
              }
            />

            <BooleanSelector
              label="Dexametasona administrada"
              value={
                dexametasona
              }
              onChange={
                setDexametasona
              }
            />

            <BooleanSelector
              label="Monitorização capnográfica"
              value={
                monitorizacaoCapnografica
              }
              onChange={
                setMonitorizacaoCapnografica
              }
            />

            <Text
              style={styles.label}
            >
              Tempo de cirurgia
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
                  tempoCirurgia
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
                  tempoCirurgia
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

            <Text
              style={styles.label}
            >
              Complicações
            </Text>

            <TextInput
              value={
                complicacoes
              }
              onChangeText={
                setComplicacoes
              }
              multiline
              placeholder="Descreva se houver..."
              placeholderTextColor="#777"
              style={
                styles.textArea
              }
            />

            <Text
              style={styles.label}
            >
              Observações
            </Text>

            <TextInput
              value={
                observacoes
              }
              onChangeText={
                setObservacoes
              }
              multiline
              placeholder="Observações adicionais..."
              placeholderTextColor="#777"
              style={
                styles.textArea
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