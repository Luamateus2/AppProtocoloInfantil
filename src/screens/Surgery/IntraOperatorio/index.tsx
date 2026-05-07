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
  'IntraOperatorio'
>;

type RouteParams = RouteProp<
  RootStackParamList,
  'IntraOperatorio'
>;

export default function IntraOperatorio() {

  const navigation = useNavigation<NavProps>();

  const route = useRoute<RouteParams>();

  const { pacienteId } = route.params;

  const [loading, setLoading] = useState(false);

  const [ventilacaoProtetora,
    setVentilacaoProtetora] =
    useState<boolean | null>(null);

  const [analgesiaMultimodal,
    setAnalgesiaMultimodal] =
    useState<boolean | null>(null);

  const [dexametasona,
    setDexametasona] =
    useState<boolean | null>(null);

  const [monitorizacaoCapnografica,
    setMonitorizacaoCapnografica] =
    useState<boolean | null>(null);

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
      setTempoCirurgia(selectedDate);
    }
  };

  async function salvarIntraOperatorio() {

    try {

      setLoading(true);

      const pacienteRef = doc(
        db,
        'pacientes',
        pacienteId
      );

      await updateDoc(pacienteRef, {
        intraOperatorio: {

          ventilacaoProtetora,

          analgesiaMultimodal,

          dexametasona,

          monitorizacaoCapnografica,

          tempoCirurgia:
            formatTime(tempoCirurgia),

          complicacoes,

          observacoes,
        },
      });

      navigation.navigate(
        'PosOperatorio',
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
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Intra-Operatório
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

            <BooleanSelector
              label="Ventilação protetora"
              value={ventilacaoProtetora}
              onChange={
                setVentilacaoProtetora
              }
            />

            <BooleanSelector
              label="Analgesia multimodal"
              value={analgesiaMultimodal}
              onChange={
                setAnalgesiaMultimodal
              }
            />

            <BooleanSelector
              label="Dexametasona administrada"
              value={dexametasona}
              onChange={setDexametasona}
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

            {/* TEMPO */}

            <Text style={styles.label}>
              Tempo de cirurgia
            </Text>

            <TouchableOpacity
              style={styles.timeButton}
              onPress={() =>
                setShowTimePicker(true)
              }
            >

              <Text style={styles.timeText}>
                {formatTime(tempoCirurgia)}
              </Text>

              <Ionicons
                name="time-outline"
                size={20}
                color="#214192"
              />

            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={tempoCirurgia}
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

            {/* COMPLICAÇÕES */}

            <Text style={styles.label}>
              Complicações intra-operatórias
            </Text>

            <TextInput
              value={complicacoes}
              onChangeText={
                setComplicacoes
              }
              placeholder="Descreva se houver..."
              placeholderTextColor="#777"
              multiline
              style={styles.textArea}
            />

            {/* OBSERVAÇÕES */}

            <Text style={styles.label}>
              Observações
            </Text>

            <TextInput
              value={observacoes}
              onChangeText={
                setObservacoes
              }
              multiline
              placeholder="Observações adicionais..."
              placeholderTextColor="#777"
              style={styles.textArea}
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
                onPress={
                  salvarIntraOperatorio
                }
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