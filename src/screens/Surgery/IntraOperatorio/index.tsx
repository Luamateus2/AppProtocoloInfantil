import React, { useState, useEffect } from 'react';

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

import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import styles from './styles';

// COMPONENTES
import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps =
  RouteProp<RootStackParamList, 'IntraOperatorio'>;

export default function EditarIntraOperatorio() {

  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { pacienteId } = route.params;

  /* STATES */
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [horarioInicio, setHorarioInicio] = useState(new Date());
  const [showHorario, setShowHorario] = useState(false);

  const [anestesia, setAnestesia] = useState('');
  const [viaAerea, setViaAerea] = useState('');
  const [intercorrencias, setIntercorrencias] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [openSelect, setOpenSelect] = useState('');

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatHour = (d: Date) =>
    d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  /* CARREGAR */
  async function carregarDados() {
    try {
      const ref = doc(db, 'intraOperatorio', pacienteId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        setAnestesia(data.anestesia || 'Geral Inalatória');
        setViaAerea(data.viaAerea || 'Máscara Laríngea');
        setIntercorrencias(data.intercorrencias || 'Nenhuma');
        setObservacoes(data.observacoes || '');
      }

    } catch (error) {
      console.log(error);
    }
  }

  /* SALVAR */
  async function salvar() {
    try {
      const ref = doc(db, 'intraOperatorio', pacienteId);

      await updateDoc(ref, {
        data: formatDate(date),
        horarioInicio: formatHour(horarioInicio),
        anestesia,
        viaAerea,
        intercorrencias,
        observacoes,
      });

      navigation.navigate('PosOperatorio', {
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
    <View style={styles.select}>
      <Text style={styles.selectText}>{value}</Text>
      <Ionicons name="chevron-down" size={18} color="#214192" />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <HeaderSecundario title="Intra-Operatório" />

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
            <Text style={styles.label}>Horário de Início</Text>

            <TouchableOpacity onPress={() => setShowHorario(true)}>
              <SelectBox value={formatHour(horarioInicio)} />
            </TouchableOpacity>
          </View>

          {showHorario && (
            <DateTimePicker
              value={horarioInicio}
              mode="time"
              is24Hour
              onChange={(e, d) => {
                setShowHorario(false);
                if (d) setHorarioInicio(d);
              }}
            />
          )}

          {/* ANESTESIA */}
          <View style={styles.row}>
            <Text style={styles.label}>Anestesia</Text>

            <TouchableOpacity onPress={() =>
              setOpenSelect(openSelect === 'anestesia' ? '' : 'anestesia')
            }>
              <SelectBox value={anestesia} />
            </TouchableOpacity>
          </View>

          {openSelect === 'anestesia' && (
            <View style={styles.dropdown}>
              {['Geral Inalatória', 'Raquidiana', 'Sedação', 'Local'].map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.option}
                  onPress={() => {
                    setAnestesia(item);
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
              {[
                'Máscara Laríngea',
                'Intubação Orotraqueal',
                'Cateter Nasal',
                'Ventilação Espontânea',
              ].map(item => (
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

          {/* INTERCORRÊNCIAS */}
          <View style={styles.row}>
            <Text style={styles.label}>Intercorrências</Text>

            <TouchableOpacity onPress={() =>
              setOpenSelect(openSelect === 'inter' ? '' : 'inter')
            }>
              <SelectBox value={intercorrencias} />
            </TouchableOpacity>
          </View>

          {openSelect === 'inter' && (
            <View style={styles.dropdown}>
              {['Nenhuma', 'Hipotensão', 'Bradicardia', 'Dessaturação'].map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.option}
                  onPress={() => {
                    setIntercorrencias(item);
                    setOpenSelect('');
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* OBS */}
          <Text style={styles.obsLabel}>Observações</Text>

          <TextInput
            style={styles.textArea}
            multiline
            value={observacoes}
            onChangeText={setObservacoes}
          />

          {/* BOTÃO */}
          <TouchableOpacity style={styles.button} onPress={salvar}>
            <Text style={styles.buttonText}>Salvar e Continuar</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      <AppFooter />
    </View>
  );
}