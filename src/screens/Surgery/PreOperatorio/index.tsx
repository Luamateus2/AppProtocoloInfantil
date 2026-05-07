import React, { useState } from 'react';

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
  updateDoc,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import AppFooter from '../../../components/Footer';

import styles from './styles';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'PreOperatorio'
>;

type RouteParams = RouteProp<
  RootStackParamList,
  'PreOperatorio'
>;

export default function Preoperatorio() {

  const navigation = useNavigation<NavProps>();

  const route = useRoute<RouteParams>();

  const { pacienteId } = route.params;

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  const [showDate, setShowDate] = useState(false);

  const [tempoJejum, setTempoJejum] = useState(new Date());

  const [showTimePicker, setShowTimePicker] = useState(false);

  const [jejumLiquidos, setJejumLiquidos] =
    useState<boolean | null>(null);

  const [carboidratoPreOperatorio,
    setCarboidratoPreOperatorio] =
    useState<boolean | null>(null);

  const [viaAereaDificil,
    setViaAereaDificil] =
    useState<boolean | null>(null);

  const [avaliacaoAnsiedade,
    setAvaliacaoAnsiedade] =
    useState<boolean | null>(null);

  const [observacoes, setObservacoes] =
    useState('');

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const onChangeTime = (
    _: any,
    selectedDate?: Date
  ) => {

    setShowTimePicker(false);

    if (selectedDate) {
      setTempoJejum(selectedDate);
    }
  };

  async function salvarPreOperatorio() {

    try {

      setLoading(true);

      const pacienteRef = doc(
        db,
        'pacientes',
        pacienteId
      );

      await updateDoc(pacienteRef, {
        preOperatorio: {
          data: formatDate(date),

          jejumLiquidos,

          tempoJejum: formatTime(tempoJejum),

          carboidratoPreOperatorio,

          viaAereaDificil,

          avaliacaoAnsiedade,

          observacoes,
        },
      });

      navigation.navigate(
        'IntraOperatorio',
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
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Pré-Operatório
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

            {/* DATA */}

            <TouchableOpacity
              style={styles.date}
              onPress={() => setShowDate(true)}
            >

              <Text style={styles.dateText}>
                {formatDate(date)}
              </Text>

            </TouchableOpacity>

            {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                display={
                  Platform.OS === 'ios'
                    ? 'spinner'
                    : 'default'
                }
                onChange={(
                  event,
                  selectedDate
                ) => {

                  setShowDate(false);

                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}

            {/* BOOLEANOS */}

            <BooleanSelector
              label="Jejum de líquidos"
              value={jejumLiquidos}
              onChange={setJejumLiquidos}
            />

            {/* TEMPO */}

            <Text style={styles.label}>
              Tempo de jejum
            </Text>

            <TouchableOpacity
              style={styles.timeButton}
              onPress={() =>
                setShowTimePicker(true)
              }
            >

              <Text style={styles.timeText}>
                {formatTime(tempoJejum)}
              </Text>

              <Ionicons
                name="time-outline"
                size={20}
                color="#214192"
              />

            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={tempoJejum}
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
              value={viaAereaDificil}
              onChange={setViaAereaDificil}
            />

            <BooleanSelector
              label="Avaliação de ansiedade"
              value={avaliacaoAnsiedade}
              onChange={
                setAvaliacaoAnsiedade
              }
            />

            {/* OBSERVAÇÕES */}

            <Text style={styles.label}>
              Observações
            </Text>

            <TextInput
              placeholder="Digite observações..."
              placeholderTextColor="#999"
              style={styles.input}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
            />

            {/* BOTÃO */}

            <LinearGradient
              colors={['#3A7BD5', '#2A5298']}
              style={styles.button}
            >

              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
                onPress={salvarPreOperatorio}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading
                    ? 'Salvando...'
                    : 'Próximo'}
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