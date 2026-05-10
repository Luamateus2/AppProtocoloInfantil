import React, { useState, useEffect } from 'react';

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
  updateDoc,
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

export default function EditarPreOperatorio() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { pacienteId } = route.params;

  /* STATES */
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [horario, setHorario] = useState(new Date());
  const [showHorario, setShowHorario] = useState(false);

  const [jejum, setJejum] = useState(new Date());
  const [showJejum, setShowJejum] = useState(false);

  const [estadoGeral, setEstadoGeral] = useState('');
  const [viaAerea, setViaAerea] = useState('');
  const [medicacao, setMedicacao] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [openSelect, setOpenSelect] = useState('');

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatHour = (d: Date) =>
    d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  /* CARREGAR DADOS */
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

  /* SALVAR E ATUALIZAR */
  async function salvar() {
    try {
      const ref = doc(db, 'preOperatorio', pacienteId);

      await updateDoc(ref, {
        data: formatDate(date),
        horario: formatHour(horario),
        jejum: formatHour(jejum),
        estadoGeral,
        viaAerea,
        medicacao,
        observacoes,
      });

      navigation.navigate('IntraOperatorio', {
        pacienteId,
      });

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const SelectBox = ({ value }: any) => (
    <View style={styles.input}>
      <Text style={styles.inputText}>{value}</Text>
      <Ionicons name="chevron-down" size={18} color="#214192" />
    </View>
  );

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        <HeaderSecundario title="Pré-Operatório" />

        <View style={styles.body}>
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

            {/* DATA */}
            <TouchableOpacity style={styles.date} onPress={() => setShowDate(true)}>
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </TouchableOpacity>

            {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={(e, d) => {
                  setShowDate(false);
                  if (d) setDate(d);
                }}
              />
            )}

            <Text style={styles.section}>Avaliação Pré-Anestésica</Text>

            {/* HORÁRIO */}
            <View style={styles.row}>
              <Text style={styles.label}>Horário</Text>

              <TouchableOpacity onPress={() => setShowHorario(true)}>
                <SelectBox value={formatHour(horario)} />
              </TouchableOpacity>
            </View>

            {showHorario && (
              <DateTimePicker
                value={horario}
                mode="time"
                is24Hour
                onChange={(e, d) => {
                  setShowHorario(false);
                  if (d) setHorario(d);
                }}
              />
            )}

            {/* JEJUM */}
            <View style={styles.row}>
              <Text style={styles.label}>Jejum</Text>

              <TouchableOpacity onPress={() => setShowJejum(true)}>
                <SelectBox value={formatHour(jejum)} />
              </TouchableOpacity>
            </View>

            {showJejum && (
              <DateTimePicker
                value={jejum}
                mode="time"
                is24Hour
                onChange={(e, d) => {
                  setShowJejum(false);
                  if (d) setJejum(d);
                }}
              />
            )}

            {/* ESTADO GERAL */}
            <View style={styles.row}>
              <Text style={styles.label}>Estado Geral</Text>

              <TouchableOpacity onPress={() =>
                setOpenSelect(openSelect === 'estado' ? '' : 'estado')
              }>
                <SelectBox value={estadoGeral} />
              </TouchableOpacity>
            </View>

            {openSelect === 'estado' && (
              <View style={styles.dropdown}>
                {['Estável', 'Regular', 'Crítico'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setEstadoGeral(item);
                      setOpenSelect('');
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* VIA AÉREA */}
            <View style={styles.row}>
              <Text style={styles.label}>Via Aérea</Text>

              <TouchableOpacity onPress={() =>
                setOpenSelect(openSelect === 'via' ? '' : 'via')
              }>
                <SelectBox value={viaAerea} />
              </TouchableOpacity>
            </View>

            {openSelect === 'via' && (
              <View style={styles.dropdown}>
                {['Mallampati I', 'Mallampati II', 'Mallampati III'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setViaAerea(item);
                      setOpenSelect('');
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* MEDICAÇÃO */}
            <View style={styles.row}>
              <Text style={styles.label}>Medicação</Text>

              <TouchableOpacity onPress={() =>
                setOpenSelect(openSelect === 'med' ? '' : 'med')
              }>
                <SelectBox value={medicacao} />
              </TouchableOpacity>
            </View>

            {openSelect === 'med' && (
              <View style={styles.dropdown}>
                {['Nenhuma', 'Anti-hipertensivo', 'Anticoagulante'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setMedicacao(item);
                      setOpenSelect('');
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* OBS */}
            <Text style={styles.label}>Observações</Text>

            <TextInput
              style={styles.textArea}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
            />

            {/* BOTÃO */}
            <LinearGradient colors={['#3A7BD5', '#2A5298']} style={styles.button}>
              <TouchableOpacity onPress={salvar}>
                <Text style={styles.buttonText}>Salvar e Continuar</Text>
              </TouchableOpacity>
            </LinearGradient>

          </ScrollView>
        </View>

        <AppFooter />

      </SafeAreaView>
    </LinearGradient>
  );
}