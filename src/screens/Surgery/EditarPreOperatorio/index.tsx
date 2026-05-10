import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
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

import { RootStackParamList } from '../../../routes/types';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

import styles from './styles';

type NavProps = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'EditarPreOperatorio'>;

export default function EditarPreOperatorio() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { pacienteId,dados } = route.params;

  // =========================
  // STATES (pré-preenchidos)
  // =========================
  const [date, setDate] = useState(new Date(dados.data));
  const [showDate, setShowDate] = useState(false);

  const [horario, setHorario] = useState(new Date(dados.horario));
  const [showHorario, setShowHorario] = useState(false);

  const [jejum, setJejum] = useState(new Date(dados.jejum));
  const [showJejum, setShowJejum] = useState(false);

  const [estadoGeral, setEstadoGeral] = useState(dados.estadoGeral);
  const [viaAerea, setViaAerea] = useState(dados.viaAerea);
  const [medicacao, setMedicacao] = useState(dados.medicacao);
  const [observacoes, setObservacoes] = useState(dados.observacoes || '');

  const [openSelect, setOpenSelect] = useState('');

  // =========================
  // FORMATADORES
  // =========================
  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatHour = (d: Date) =>
    d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <HeaderSecundario title="Editar Pré-Operatório" />

        <View style={styles.body}>
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

            {/* DATA */}
            <TouchableOpacity
              style={styles.date}
              onPress={() => setShowDate(true)}
            >
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

            <Text style={styles.section}>
              Avaliação Pré-Anestésica
            </Text>

            {/* HORÁRIO */}
            <View style={styles.row}>
              <Text style={styles.label}>Horário</Text>

              <TouchableOpacity onPress={() => setShowHorario(true)}>
                <View style={styles.input}>
                  <Text style={styles.inputText}>
                    {formatHour(horario)}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color="#214192" />
                </View>
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
                <View style={styles.input}>
                  <Text style={styles.inputText}>
                    {formatHour(jejum)}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color="#214192" />
                </View>
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

              <TouchableOpacity
                onPress={() =>
                  setOpenSelect(openSelect === 'estado' ? '' : 'estado')
                }
              >
                <View style={styles.input}>
                  <Text style={styles.inputText}>{estadoGeral}</Text>
                  <Ionicons name="chevron-down" size={18} color="#214192" />
                </View>
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

              <TouchableOpacity
                onPress={() =>
                  setOpenSelect(openSelect === 'via' ? '' : 'via')
                }
              >
                <View style={styles.input}>
                  <Text style={styles.inputText}>{viaAerea}</Text>
                  <Ionicons name="chevron-down" size={18} color="#214192" />
                </View>
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

              <TouchableOpacity
                onPress={() =>
                  setOpenSelect(openSelect === 'med' ? '' : 'med')
                }
              >
                <View style={styles.input}>
                  <Text style={styles.inputText}>{medicacao}</Text>
                  <Ionicons name="chevron-down" size={18} color="#214192" />
                </View>
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

            {/* OBSERVAÇÕES */}
            <Text style={styles.label}>Observações</Text>

            <TextInput
              style={styles.textArea}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Digite observações..."
              placeholderTextColor="#777"
            />

            {/* BOTÃO */}
            <LinearGradient colors={['#3A7BD5', '#2A5298']} style={styles.button}>
              <TouchableOpacity
                onPress={() =>
                  navigation.goBack()
                }
              >
                <Text style={styles.buttonText}>
                  Atualizar Registro
                </Text>
              </TouchableOpacity>
            </LinearGradient>

          </ScrollView>
        </View>

        <AppFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}