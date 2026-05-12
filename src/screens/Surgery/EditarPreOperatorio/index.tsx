import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
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
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps =
  RouteProp<RootStackParamList, 'EditarPreOperatorio'>;

export default function EditarPreOperatorio() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const {
    pacienteId,
    pacienteEditado,
  } = route.params;

  const [loading, setLoading] =
    useState(true);

  const [date, setDate] =
    useState(new Date());

  const [showDate, setShowDate] =
    useState(false);

  const [horario, setHorario] =
    useState(new Date());

  const [showHorario, setShowHorario] =
    useState(false);

  const [jejum, setJejum] =
    useState(new Date());

  const [showJejum, setShowJejum] =
    useState(false);

  const [estadoGeral, setEstadoGeral] =
    useState('Estável');

  const [viaAerea, setViaAerea] =
    useState('Mallampati I');

  const [medicacao, setMedicacao] =
    useState('Nenhuma');

  const [observacoes, setObservacoes] =
    useState('');

  const [openSelect, setOpenSelect] =
    useState('');

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatHour = (d: Date) =>
    d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  function converterHoraParaDate(hora?: string) {
    if (!hora) return new Date();

    const [h, m] = hora.split(':');

    const novaData = new Date();

    novaData.setHours(Number(h));
    novaData.setMinutes(Number(m));
    novaData.setSeconds(0);

    return novaData;
  }

  async function carregarDados() {
    try {
      const ref = doc(
        db,
        'preOperatorio',
        pacienteId
      );

      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        setEstadoGeral(data.estadoGeral || 'Estável');

        setViaAerea(data.viaAerea || 'Mallampati I');

        setMedicacao(data.medicacao || 'Nenhuma');

        setObservacoes(data.observacoes || '');

        if (data.horario) {
          setHorario(
            converterHoraParaDate(data.horario)
          );
        }

        if (data.jejum) {
          setJejum(
            converterHoraParaDate(data.jejum)
          );
        }
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar o pré-operatório.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function continuar() {
    navigation.navigate('EditarIntraOperatorio', {
      pacienteId,

      pacienteEditado,

      preOperatorioEditado: {
        data: formatDate(date),

        horario: formatHour(horario),

        jejum: formatHour(jejum),

        estadoGeral,

        viaAerea,

        medicacao,

        observacoes,
      },
    });
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
          name={
            opened
              ? 'chevron-up'
              : 'chevron-down'
          }
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
            activeOpacity={0.85}
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

  if (loading) {
    return (
      <LinearGradient
        colors={['#214192', '#4293D5']}
        style={styles.container}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={['top']}
        >
          <HeaderSecundario
            title="Editar Pré-Operatório"
            showBackButton
          />

          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#214192"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
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
          title="Editar Pré-Operatório"
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
                style={styles.dropdownWrapper}
                activeOpacity={0.85}
                onPress={() => setShowHorario(true)}
              >
                <SelectBox
                  value={formatHour(horario)}
                />
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
                style={styles.dropdownWrapper}
                activeOpacity={0.85}
                onPress={() => setShowJejum(true)}
              >
                <SelectBox
                  value={formatHour(jejum)}
                />
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

            <View style={[styles.row, { zIndex: 999 }]}>
              <Text style={styles.label}>
                Estado Geral
              </Text>

              <View style={styles.dropdownWrapper}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect === 'estado'
                        ? ''
                        : 'estado'
                    )
                  }
                >
                  <SelectBox
                    value={estadoGeral}
                    opened={
                      openSelect === 'estado'
                    }
                  />
                </TouchableOpacity>

                {openSelect === 'estado' && (
                  <OptionList
                    items={[
                      'Estável',
                      'Regular',
                      'Crítico',
                    ]}
                    onSelect={setEstadoGeral}
                  />
                )}
              </View>
            </View>

            <View style={[styles.row, { zIndex: 998 }]}>
              <Text style={styles.label}>
                Via Aérea
              </Text>

              <View style={styles.dropdownWrapper}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect === 'via'
                        ? ''
                        : 'via'
                    )
                  }
                >
                  <SelectBox
                    value={viaAerea}
                    opened={
                      openSelect === 'via'
                    }
                  />
                </TouchableOpacity>

                {openSelect === 'via' && (
                  <OptionList
                    items={[
                      'Mallampati I',
                      'Mallampati II',
                      'Mallampati III',
                    ]}
                    onSelect={setViaAerea}
                  />
                )}
              </View>
            </View>

            <View style={[styles.row, { zIndex: 997 }]}>
              <Text style={styles.label}>
                Medicação
              </Text>

              <View style={styles.dropdownWrapper}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setOpenSelect(
                      openSelect === 'med'
                        ? ''
                        : 'med'
                    )
                  }
                >
                  <SelectBox
                    value={medicacao}
                    opened={
                      openSelect === 'med'
                    }
                  />
                </TouchableOpacity>

                {openSelect === 'med' && (
                  <OptionList
                    items={[
                      'Nenhuma',
                      'Anti-hipertensivo',
                      'Anticoagulante',
                    ]}
                    onSelect={setMedicacao}
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
              placeholder="Paciente em boas condições para procedimento."
              placeholderTextColor="#5E6D95"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={continuar}
            >
              <LinearGradient
                colors={['#3A7BD5', '#2A5298']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  Continuar
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