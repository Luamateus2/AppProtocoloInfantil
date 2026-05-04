import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

import styles from './styles';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'PreOperatorio'
>;

export default function Preoperatorio() {
  const navigation = useNavigation<NavProps>();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const formatDate = (d: Date) => d.toLocaleDateString('pt-BR');

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Pré-Operatório</Text>
        </View>

        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <TouchableOpacity
              style={styles.date}
              onPress={() => setShow(true)}
            >
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={(e, d) => {
                  setShow(false);
                  if (d) setDate(d);
                }}
              />
            )}

            <Text style={styles.section}>
              Avaliação Pré-Anestésica
            </Text>

            {[
              ['Horário', '08:30'],
              ['Jejum', 'Sim (8h)'],
              ['Estado Geral', 'Estável'],
              ['Via Aérea', 'Mallampati I'],
              ['Medicação em Uso', 'Nenhuma'],
            ].map(([label, value], i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.label}>{label}</Text>

                <TouchableOpacity style={styles.input}>
                  <Text style={styles.inputText}>{value}</Text>
                  <Ionicons name="chevron-down" size={14} color="#214192" />
                </TouchableOpacity>
              </View>
            ))}

            <Text style={styles.label}>Observações</Text>

            <View style={styles.textArea}>
              <Text style={styles.placeholder}>
                Paciente colaborativo
              </Text>
            </View>

            {/* BOTÃO FUNCIONANDO */}
            <LinearGradient
              colors={['#3A7BD5', '#2A5298']}
              style={styles.button}
            >
              <TouchableOpacity
                style={{ width: '100%', alignItems: 'center' }}
                onPress={() => navigation.navigate('IntraOperatorio')}
              >
                <Text style={styles.buttonText}>Salvar Registro</Text>
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