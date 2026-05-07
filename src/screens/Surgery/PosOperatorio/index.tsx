import React, { useState } from 'react';

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
  updateDoc,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import AppFooter from '../../../components/Footer';

import styles from './styles';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'PosOperatorio'
>;

type RouteParams = RouteProp<
  RootStackParamList,
  'PosOperatorio'
>;

export default function PosOperatorio() {

  const navigation = useNavigation<NavProps>();

  const route = useRoute<RouteParams>();

  const { pacienteId } = route.params;

  const [eva, setEva] = useState('');

  const [riscoObstrucao,
    setRiscoObstrucao] =
    useState<boolean | null>(null);

  const [alimentacaoPrecoce,
    setAlimentacaoPrecoce] =
    useState<boolean | null>(null);

  const [criterioAlta,
    setCriterioAlta] =
    useState<boolean | null>(null);

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(
      'pt-BR',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  const onChangeTime = (
    _: any,
    selectedDate?: Date
  ) => {

    setShowTimePicker(false);

    if (selectedDate) {
      setTempoAlta(selectedDate);
    }
  };

  async function salvarRegistro() {

    try {

      setLoading(true);

      const pacienteRef = doc(
        db,
        'pacientes',
        pacienteId
      );

      await updateDoc(pacienteRef, {
        posOperatorio: {

          eva,

          riscoObstrucao,

          alimentacaoPrecoce,

          criterioAlta,

          tempoAlta:
            formatTime(tempoAlta),

          observacoes,
        },
      });

      Alert.alert(
        'Sucesso',
        'Registro salvo com sucesso.'
      );

      navigation.navigate('Home');

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

  const BooleanSelector = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean | null;
    onChange: (value: boolean) => void;
  }) => (
    <View style={styles.row}>

      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.booleanContainer}>

        <TouchableOpacity
          style={[
            styles.booleanButton,
            value === true &&
              styles.booleanButtonActive,
          ]}
          onPress={() => onChange(true)}
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
          onPress={() => onChange(false)}
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
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Pós-Operatório
          </Text>

          <View style={{ width: 22 }} />

        </View>

        {/* BODY */}

        <View style={styles.body}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          >

            <View style={styles.dateContainer}>

              <Text style={styles.dateText}>
                12/03/2026
              </Text>

            </View>

            {/* EVA */}

            <Text style={styles.label}>
              Escala de dor (EVA de 0 a 10)
            </Text>

            <TextInput
              value={eva}
              onChangeText={setEva}
              keyboardType="numeric"
              placeholder="Ex: 7"
              placeholderTextColor="#777"
              maxLength={2}
              style={styles.input}
            />

            {/* BOOLEANOS */}

            <BooleanSelector
              label="Risco de obstrução de vias aéreas"
              value={riscoObstrucao}
              onChange={setRiscoObstrucao}
            />

            <BooleanSelector
              label="Alimentação precoce"
              value={alimentacaoPrecoce}
              onChange={setAlimentacaoPrecoce}
            />

            <BooleanSelector
              label="Critério de alta"
              value={criterioAlta}
              onChange={setCriterioAlta}
            />

            {/* TEMPO */}

            <Text style={styles.label}>
              Tempo até alta
            </Text>

            <TouchableOpacity
              style={styles.timeButton}
              onPress={() =>
                setShowTimePicker(true)
              }
            >

              <Text style={styles.timeText}>
                {formatTime(tempoAlta)}
              </Text>

              <Ionicons
                name="time-outline"
                size={20}
                color="#214192"
              />

            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={tempoAlta}
                mode="time"
                is24Hour
                display={
                  Platform.OS === 'ios'
                    ? 'spinner'
                    : 'default'
                }
                onChange={onChangeTime}
              />
            )}

            {/* OBSERVAÇÕES */}

            <Text style={styles.label}>
              Observações pós-operatórias
            </Text>

            <TextInput
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Digite observações..."
              placeholderTextColor="#777"
              style={styles.textArea}
            />

            {/* BOTÃO */}

            <LinearGradient
              colors={['#3A7BD5', '#214192']}
              style={styles.button}
            >

              <TouchableOpacity
                onPress={salvarRegistro}
                disabled={loading}
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
              >

                <Text style={styles.buttonText}>
                  {loading
                    ? 'Salvando...'
                    : 'Salvar Registro'}
                </Text>

              </TouchableOpacity>

            </LinearGradient>

          </ScrollView>

        </View>

        {/* FOOTER PADRÃO */}

        <AppFooter />

      </SafeAreaView>

    </LinearGradient>
  );
}