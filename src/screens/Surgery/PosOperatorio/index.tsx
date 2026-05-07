import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';

export default function PosOperatorio() {
  const navigation = useNavigation();

  const [eva, setEva] = useState('');
  const [riscoObstrucao, setRiscoObstrucao] = useState<boolean | null>(null);
  const [alimentacaoPrecoce, setAlimentacaoPrecoce] = useState<
    boolean | null
  >(null);

  const [criterioAlta, setCriterioAlta] = useState<boolean | null>(null);

  const [tempoAlta, setTempoAlta] = useState(new Date());

  const [showTimePicker, setShowTimePicker] = useState(false);

  const [observacoes, setObservacoes] = useState('');

  const [loading, setLoading] = useState(false);

  function salvarRegistro() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('Registro salvo com sucesso');
    }, 1200);
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const onChangeTime = (_: any, selectedDate?: Date) => {
    setShowTimePicker(false);

    if (selectedDate) {
      setTempoAlta(selectedDate);
    }
  };

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
      <Text style={styles.label}>{label}</Text>

      <View style={styles.booleanContainer}>
        <TouchableOpacity
          style={[
            styles.booleanButton,
            value === true && styles.booleanButtonActive,
          ]}
          onPress={() => onChange(true)}
        >
          <Text
            style={[
              styles.booleanText,
              value === true && styles.booleanTextActive,
            ]}
          >
            Sim
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.booleanButton,
            value === false && styles.booleanButtonActiveRed,
          ]}
          onPress={() => onChange(false)}
        >
          <Text
            style={[
              styles.booleanText,
              value === false && styles.booleanTextActive,
            ]}
          >
            Não
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Pós-Operatório</Text>

          <View style={{ width: 22 }} />
        </View>

        <View style={styles.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>12/03/2026</Text>
            </View>

            <Text style={styles.label}>
              Escala de dor (EVA de 0 a 10)
            </Text>

            <TextInput
              value={eva}
              onChangeText={setEva}
              keyboardType="numeric"
              placeholder="Ex: 7"
              placeholderTextColor="#777"
              maxLength={2}
              style={styles.input}
            />

            <BooleanSelector
              label="Risco de obstrução de vias aéreas"
              value={riscoObstrucao}
              onChange={setRiscoObstrucao}
            />

            <BooleanSelector
              label="Alimentação precoce"
              value={alimentacaoPrecoce}
              onChange={setAlimentacaoPrecoce}
            />

            <BooleanSelector
              label="Critério de alta"
              value={criterioAlta}
              onChange={setCriterioAlta}
            />

            <Text style={styles.label}>
              Tempo até alta
            </Text>

            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timeText}>
                {formatTime(tempoAlta)}
              </Text>

              <Ionicons
                name="time-outline"
                size={20}
                color="#214192"
              />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={tempoAlta}
                mode="time"
                is24Hour
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeTime}
              />
            )}

            <Text style={styles.label}>
              Observações pós-operatórias
            </Text>

            <TextInput
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Digite observações..."
              placeholderTextColor="#777"
              style={styles.textArea}
            />

            <LinearGradient
              colors={['#3A7BD5', '#214192']}
              style={styles.button}
            >
              <TouchableOpacity
                onPress={salvarRegistro}
                disabled={loading}
                style={{ width: '100%', alignItems: 'center' }}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Salvando...' : 'Salvar Registro'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </View>

        <SafeAreaView edges={['bottom']} style={styles.navWrapper}>
          <View style={styles.nav}>
            <Ionicons name="home-outline" size={20} color="#fff" />
            <Ionicons name="search-outline" size={20} color="#fff" />
            <Ionicons name="notifications-outline" size={20} color="#fff" />
            <Ionicons name="person-outline" size={20} color="#fff" />
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </LinearGradient>
  );
}