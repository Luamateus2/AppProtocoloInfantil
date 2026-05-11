import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
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
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps =
  RouteProp<RootStackParamList, 'PosOperatorio'>;

export default function PosOperatorio() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const pacienteId = route.params?.pacienteId;

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [horarioTermino, setHorarioTermino] =
    useState(new Date());

  const [showHorario, setShowHorario] =
    useState(false);

  const [recuperacao, setRecuperacao] =
    useState('Estável');

  const [sinaisVitais, setSinaisVitais] =
    useState('98 bpm | SpO2: 99%');

  const [dor, setDor] =
    useState('2');

  const [observacoes, setObservacoes] =
    useState(
      'Paciente acordado, sem queixas,\nmantendo saturação adequada.'
    );

  const [openSelect, setOpenSelect] =
    useState('');

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatHour = (d: Date) =>
    d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  async function salvarRegistro() {
    if (!pacienteId) {
      Alert.alert(
        'Erro',
        'ID do paciente não encontrado.'
      );
      return;
    }

    try {
      await setDoc(
        doc(db, 'posOperatorio', pacienteId),
        {
          pacienteId,
          data: formatDate(date),
          horarioTermino: formatHour(horarioTermino),
          recuperacao,
          sinaisVitais,
          dor,
          observacoes,
          criadoEm: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      Alert.alert(
        'Sucesso',
        'Registro salvo com sucesso.'
      );

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar o registro.'
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
          style={styles.inputText}
          numberOfLines={1}
        >
          {value}
        </Text>

        <Ionicons
          name={opened ? 'chevron-up' : 'chevron-down'}
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
    onSelect: (item: string) => void;
  }) {
    return (
      <View style={styles.dropdown}>
        {items.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.option}
            onPress={() => {
              onSelect(item);
              setOpenSelect('');
            }}
          >
            <Text style={styles.optionText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#214192', '#4293D5']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

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
            contentContainerStyle={styles.scrollContent}
          >
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
                onChange={(event, selectedDate) => {
                  setShowDate(false);

                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}

            <View style={styles.row}>
              <Text style={styles.label}>
                Horário de Término
              </Text>

              <TouchableOpacity
                style={styles.dropdownWrapper}
                activeOpacity={0.85}
                onPress={() => setShowHorario(true)}
              >
                <SelectBox
                  value={formatHour(horarioTermino)}
                />
              </TouchableOpacity>
            </View>

            {showHorario && (
              <DateTimePicker
                value={horarioTermino}
                mode="time"
                is24Hour
                onChange={(event, selectedTime) => {
                  setShowHorario(false);

                  if (selectedTime) {
                    setHorarioTermino(selectedTime);
                  }
                }}
              />
            )}

            <View style={styles.row}>
              <Text style={styles.label}>
                Recuperação
              </Text>

              <View style={styles.dropdownWrapper}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect === 'recuperacao'
                        ? ''
                        : 'recuperacao'
                    )
                  }
                >
                  <SelectBox
                    value={recuperacao}
                    opened={openSelect === 'recuperacao'}
                  />
                </TouchableOpacity>

                {openSelect === 'recuperacao' && (
                  <OptionList
                    items={[
                      'Estável',
                      'Sonolento',
                      'Agitado',
                      'Instável',
                    ]}
                    onSelect={setRecuperacao}
                  />
                )}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Sinais Vitais
              </Text>

              <View style={styles.dropdownWrapper}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect === 'sinais'
                        ? ''
                        : 'sinais'
                    )
                  }
                >
                  <SelectBox
                    value={sinaisVitais}
                    opened={openSelect === 'sinais'}
                  />
                </TouchableOpacity>

                {openSelect === 'sinais' && (
                  <OptionList
                    items={[
                      '98 bpm | SpO2: 99%',
                      '90 bpm | SpO2: 98%',
                      '86 bpm | SpO2: 97%',
                      '100 bpm | SpO2: 96%',
                    ]}
                    onSelect={setSinaisVitais}
                  />
                )}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Dor (Escala)
              </Text>

              <View style={styles.dropdownWrapper}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect === 'dor' ? '' : 'dor'
                    )
                  }
                >
                  <SelectBox
                    value={dor}
                    opened={openSelect === 'dor'}
                  />
                </TouchableOpacity>

                {openSelect === 'dor' && (
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
                    onSelect={setDor}
                  />
                )}
              </View>
            </View>

            <Text style={styles.observacoesLabel}>
              Observações
            </Text>

            <TextInput
              style={styles.textArea}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Paciente acordado, sem queixas, mantendo saturação adequada."
              placeholderTextColor="#5E6D95"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={salvarRegistro}
            >
              <LinearGradient
                colors={['#3A7BD5', '#2A5298']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  Salvar Registro
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <AppFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}