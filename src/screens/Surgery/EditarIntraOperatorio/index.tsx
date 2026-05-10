import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
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

import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../../../routes/types';

import styles from './styles';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps = RouteProp<
  RootStackParamList,
  'EditarIntraOperatorio'
>;

export default function EditarIntraOperatorio() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { pacienteId, dados } = route.params;

  // DATA
  const [date, setDate] = useState(new Date(dados.data));
  const [showDate, setShowDate] = useState(false);

  // HORÁRIO
  const [horarioInicio, setHorarioInicio] = useState(
    new Date(dados.horarioInicio)
  );

  const [showHorario, setShowHorario] = useState(false);

  // SELECTS
  const [anestesia, setAnestesia] = useState(dados.anestesia);
  const [viaAerea, setViaAerea] = useState(dados.viaAerea);
  const [intercorrencias, setIntercorrencias] = useState(
    dados.intercorrencias
  );

  const [openSelect, setOpenSelect] = useState('');

  // OBS
  const [observacoes, setObservacoes] = useState(
    dados.observacoes || ''
  );

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR');

  const formatHour = (d: Date) =>
    d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <HeaderSecundario title="Editar Intra-Operatório" />

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
            <Text style={styles.label}>
              Horário de Início
            </Text>

            <TouchableOpacity
              style={styles.select}
              onPress={() => setShowHorario(true)}
            >
              <Text style={styles.selectText}>
                {formatHour(horarioInicio)}
              </Text>

              <Ionicons
                name="time-outline"
                size={18}
                color="#214192"
              />
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

            <TouchableOpacity
              style={styles.select}
              onPress={() =>
                setOpenSelect(
                  openSelect === 'anestesia' ? '' : 'anestesia'
                )
              }
            >
              <Text style={styles.selectText}>
                {anestesia}
              </Text>

              <Ionicons
                name="chevron-down"
                size={18}
                color="#214192"
              />
            </TouchableOpacity>
          </View>

          {openSelect === 'anestesia' && (
            <View style={styles.dropdown}>
              {[
                'Geral Inalatória',
                'Raquidiana',
                'Sedação',
                'Local',
              ].map(item => (
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

            <TouchableOpacity
              style={styles.select}
              onPress={() =>
                setOpenSelect(openSelect === 'via' ? '' : 'via')
              }
            >
              <Text style={styles.selectText}>
                {viaAerea}
              </Text>

              <Ionicons
                name="chevron-down"
                size={18}
                color="#214192"
              />
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
            <Text style={styles.label}>
              Intercorrências
            </Text>

            <TouchableOpacity
              style={styles.select}
              onPress={() =>
                setOpenSelect(openSelect === 'inter' ? '' : 'inter')
              }
            >
              <Text style={styles.selectText}>
                {intercorrencias}
              </Text>

              <Ionicons
                name="chevron-down"
                size={18}
                color="#214192"
              />
            </TouchableOpacity>
          </View>

          {openSelect === 'inter' && (
            <View style={styles.dropdown}>
              {[
                'Nenhuma',
                'Hipotensão',
                'Bradicardia',
                'Dessaturação',
              ].map(item => (
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
          <Text style={styles.obsLabel}>
            Observações
          </Text>

          <TextInput
            style={styles.textArea}
            multiline
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Procedimento..."
            placeholderTextColor="#777"
          />

          {/* BOTÃO */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>
              Atualizar Registro
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      <AppFooter />
    </View>
  );
}