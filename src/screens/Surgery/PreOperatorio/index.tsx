import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps =
  RouteProp<RootStackParamList, 'PreOperatorio'>;

export default function PreOperatorio() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { pacienteId } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [horario, setHorario] = useState(new Date());
  const [showHorario, setShowHorario] = useState(false);

  const [jejum, setJejum] = useState(new Date());
  const [showJejum, setShowJejum] = useState(false);

  const [estadoGeral, setEstadoGeral] = useState('Estável');
  const [viaAerea, setViaAerea] = useState('Mallampati I');
  const [medicacao, setMedicacao] = useState('Nenhuma');
  const [observacoes, setObservacoes] = useState('');

  const [openSelect, setOpenSelect] = useState('');

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatHour = (d: Date) =>
    d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  async function carregarDados() {
    try {
      const ref = doc(db, 'preOperatorio', pacienteId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        setEstadoGeral(data.estadoGeral || 'Estável');
        setViaAerea(data.viaAerea || 'Mallampati I');
        setMedicacao(data.medicacao || 'Nenhuma');
        setObservacoes(data.observacoes || '');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function salvar() {
    if (!pacienteId) {
      Alert.alert(
        'Erro',
        'ID do paciente não encontrado.'
      );
      return;
    }

    try {
      const ref = doc(db, 'preOperatorio', pacienteId);

      await setDoc(
        ref,
        {
          pacienteId,
          data: formatDate(date),
          horario: formatHour(horario),
          jejum: formatHour(jejum),
          estadoGeral,
          viaAerea,
          medicacao,
          observacoes,
        },
        {
          merge: true,
        }
      );

      navigation.navigate('IntraOperatorioG', {
        pacienteId,
      });

    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar'
      );
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function SelectBox({ value }: { value: string }) {
    return (
      <View style={styles.input}>
        <Text style={styles.inputText}>
          {value}
        </Text>

        <Ionicons
          name="chevron-down"
          size={18}
          color="#214192"
        />
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
          title="Pré-Operatório"
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

            <Text style={styles.section}>
              Avaliação Pré-Anestésica
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>
                Horário
              </Text>

              <TouchableOpacity
                onPress={() => setShowHorario(true)}
              >
                <SelectBox value={formatHour(horario)} />
              </TouchableOpacity>
            </View>

            {showHorario && (
              <DateTimePicker
                value={horario}
                mode="time"
                is24Hour
                onChange={(event, selectedTime) => {
                  setShowHorario(false);

                  if (selectedTime) {
                    setHorario(selectedTime);
                  }
                }}
              />
            )}

            <View style={styles.row}>
              <Text style={styles.label}>
                Jejum
              </Text>

              <TouchableOpacity
                onPress={() => setShowJejum(true)}
              >
                <SelectBox value={formatHour(jejum)} />
              </TouchableOpacity>
            </View>

            {showJejum && (
              <DateTimePicker
                value={jejum}
                mode="time"
                is24Hour
                onChange={(event, selectedTime) => {
                  setShowJejum(false);

                  if (selectedTime) {
                    setJejum(selectedTime);
                  }
                }}
              />
            )}

            <View style={styles.row}>
              <Text style={styles.label}>
                Estado Geral
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setOpenSelect(
                    openSelect === 'estado' ? '' : 'estado'
                  )
                }
              >
                <SelectBox value={estadoGeral} />
              </TouchableOpacity>
            </View>

            {openSelect === 'estado' && (
              <View style={styles.dropdown}>
                {['Estável', 'Regular', 'Crítico'].map(
                  item => (
                    <TouchableOpacity
                      key={item}
                      style={styles.option}
                      onPress={() => {
                        setEstadoGeral(item);
                        setOpenSelect('');
                      }}
                    >
                      <Text style={styles.optionText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )}

            <View style={styles.row}>
              <Text style={styles.label}>
                Via Aérea
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setOpenSelect(
                    openSelect === 'via' ? '' : 'via'
                  )
                }
              >
                <SelectBox value={viaAerea} />
              </TouchableOpacity>
            </View>

            {openSelect === 'via' && (
              <View style={styles.dropdown}>
                {[
                  'Mallampati I',
                  'Mallampati II',
                  'Mallampati III',
                ].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setViaAerea(item);
                      setOpenSelect('');
                    }}
                  >
                    <Text style={styles.optionText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.row}>
              <Text style={styles.label}>
                Medicação
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setOpenSelect(
                    openSelect === 'med' ? '' : 'med'
                  )
                }
              >
                <SelectBox value={medicacao} />
              </TouchableOpacity>
            </View>

            {openSelect === 'med' && (
              <View style={styles.dropdown}>
                {[
                  'Nenhuma',
                  'Anti-hipertensivo',
                  'Anticoagulante',
                ].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setMedicacao(item);
                      setOpenSelect('');
                    }}
                  >
                    <Text style={styles.optionText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.observacoesLabel}>
              Observações
            </Text>

            <TextInput
              style={styles.textArea}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Paciente em boas condições para procedimento."
              placeholderTextColor="#5E6D95"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={salvar}
            >
              <LinearGradient
                colors={['#3A7BD5', '#2A5298']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  Salvar e Continuar
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