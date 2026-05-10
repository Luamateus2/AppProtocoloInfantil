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
    'EditarPosOperatorio'
  >;

type RouteParams = RouteProp<
  RootStackParamList,
  'EditarPosOperatorio'
>;

export default function EditarPosOperatorio() {

  const navigation =
    useNavigation<NavProps>();

  const route =
    useRoute<RouteParams>();

  const { pacienteId } =
    route.params;

  const [eva,
    setEva] =
    useState('');

  const [riscoObstrucao,
    setRiscoObstrucao] =
    useState<boolean | null>(
      null
    );

  const [alimentacaoPrecoce,
    setAlimentacaoPrecoce] =
    useState<boolean | null>(
      null
    );

  const [criterioAlta,
    setCriterioAlta] =
    useState<boolean | null>(
      null
    );

  const [tempoAlta,
    setTempoAlta] =
    useState(new Date());

  const [showTimePicker,
    setShowTimePicker] =
    useState(false);

  const [observacoes,
    setObservacoes] =
    useState('');

  const [loading,
    setLoading] =
    useState(false);

  const [loadingPaciente,
    setLoadingPaciente] =
    useState(true);

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
      setTempoAlta(
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

      const pos =
        data.posOperatorio;

      if (!pos)
        return;

      setEva(
        pos.eva || ''
      );

      setRiscoObstrucao(
        pos.riscoObstrucao ??
          null
      );

      setAlimentacaoPrecoce(
        pos.alimentacaoPrecoce ??
          null
      );

      setCriterioAlta(
        pos.criterioAlta ??
          null
      );

      setTempoAlta(
        parseTime(
          pos.tempoAlta
        )
      );

      setObservacoes(
        pos.observacoes ||
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

  async function salvarRegistro() {

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
          posOperatorio: {

            eva,

            riscoObstrucao,

            alimentacaoPrecoce,

            criterioAlta,

            tempoAlta:
              formatTime(
                tempoAlta
              ),

            observacoes,
          },

          updatedAt:
            serverTimestamp(),
        }
      );

      Alert.alert(
        'Sucesso',
        'Registro atualizado com sucesso.'
      );

      navigation.navigate(
        'Historico'
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

        <View style={styles.header}>

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
            style={styles.headerTitle}
          >
            Editar
            Pós-Operatório
          </Text>

          <View
            style={{ width: 22 }}
          />

        </View>

        {/* restante da UI permanece igual à sua tela atual */}

        <AppFooter />

      </SafeAreaView>
    </LinearGradient>
  );
}