import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

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
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps = RouteProp<
  RootStackParamList,
  'EditarPosOperatorio'
>;

export default function EditarPosOperatorio() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { pacienteId } = route.params;

  // DATA
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  // HORÁRIO
  const [horarioTermino, setHorarioTermino] = useState(new Date());
  const [showHorario, setShowHorario] = useState(false);

  // CAMPOS
  const [recuperacao, setRecuperacao] = useState('');
  const [sinaisVitais, setSinaisVitais] = useState('');
  const [dor, setDor] = useState('');
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
      const ref = doc(db, 'posOperatorio', pacienteId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        Alert.alert('Erro', 'Registro não encontrado');
        navigation.goBack();
        return;
      }

      const data = snap.data();

      setRecuperacao(data.recuperacao);
      setSinaisVitais(data.sinaisVitais);
      setDor(data.dor);
      setObservacoes(data.observacoes || '');

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Falha ao carregar dados');
    }
  }

  /* ATUALIZAR */
  async function atualizar() {
    try {
      const ref = doc(db, 'posOperatorio', pacienteId);

      await updateDoc(ref, {
        recuperacao,
        sinaisVitais,
        dor,
        observacoes,
      });

      Alert.alert('Sucesso', 'Atualizado com sucesso!');

      navigation.navigate('Home');

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível atualizar');
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <HeaderSecundario title="Editar Pós-Operatório" />

        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* DATA */}
            <TouchableOpacity
              style={styles.dateContainer}
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
                onChange={(e, d) => {
                  setShowDate(false);
                  if (d) setDate(d);
                }}
              />
            )}

            {/* HORÁRIO */}
            <View style={styles.row}>
              <Text style={styles.label}>Horário de Término</Text>

              <TouchableOpacity
                style={styles.select}
                onPress={() => setShowHorario(true)}
              >
                <Text style={styles.selectText}>
                  {formatHour(horarioTermino)}
                </Text>
              </TouchableOpacity>
            </View>

            {showHorario && (
              <DateTimePicker
                value={horarioTermino}
                mode="time"
                is24Hour
                onChange={(e, d) => {
                  setShowHorario(false);
                  if (d) setHorarioTermino(d);
                }}
              />
            )}

            {/* RECUPERAÇÃO */}
            <View style={styles.row}>
              <Text style={styles.label}>Recuperação</Text>

              <TouchableOpacity
                style={styles.select}
                onPress={() =>
                  setOpenSelect(openSelect === 'rec' ? '' : 'rec')
                }
              >
                <Text style={styles.selectText}>{recuperacao}</Text>
              </TouchableOpacity>
            </View>

            {openSelect === 'rec' && (
              <View style={styles.dropdown}>
                {['Estável', 'Regular', 'Observação'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setRecuperacao(item);
                      setOpenSelect('');
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* SINAIS VITAIS */}
            <View style={styles.row}>
              <Text style={styles.label}>Sinais Vitais</Text>

              <TouchableOpacity
                style={styles.select}
                onPress={() =>
                  setOpenSelect(openSelect === 'sinais' ? '' : 'sinais')
                }
              >
                <Text style={styles.selectText}>{sinaisVitais}</Text>
              </TouchableOpacity>
            </View>

            {openSelect === 'sinais' && (
              <View style={styles.dropdown}>
                {[
                  '98 bpm | SpO2: 99%',
                  '90 bpm | SpO2: 97%',
                  '110 bpm | SpO2: 95%',
                ].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setSinaisVitais(item);
                      setOpenSelect('');
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* DOR */}
            <View style={styles.row}>
              <Text style={styles.label}>Dor</Text>

              <TouchableOpacity
                style={styles.select}
                onPress={() =>
                  setOpenSelect(openSelect === 'dor' ? '' : 'dor')
                }
              >
                <Text style={styles.selectText}>{dor}</Text>
              </TouchableOpacity>
            </View>

            {openSelect === 'dor' && (
              <View style={styles.dropdown}>
                {['0', '1', '2', '3', '4', '5'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setDor(item);
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
            <LinearGradient colors={['#3A7BD5', '#214192']} style={styles.button}>
              <TouchableOpacity onPress={atualizar}>
                <Text style={styles.buttonText}>Atualizar</Text>
              </TouchableOpacity>
            </LinearGradient>

          </ScrollView>
        </View>

        <AppFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}