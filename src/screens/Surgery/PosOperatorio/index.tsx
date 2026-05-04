import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function PosOperatorio() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Pós-Operatório</Text>

          <View style={{ width: 22 }} />
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* DATA */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>12/03/2026</Text>
            </View>

            {/* CAMPOS EM LINHA */}
            {[
              ['Horário de Término', '10:30'],
              ['Recuperação', 'Estável'],
              ['Sinais Vitais', '98 bpm | SpO2: 99%'],
              ['Dor (Escala)', '2'],
            ].map(([label, value], i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.label}>{label}</Text>

                <TouchableOpacity style={styles.select}>
                  <Text style={styles.selectText}>{value}</Text>
                  <Ionicons name="chevron-down" size={14} color="#214192" />
                </TouchableOpacity>
              </View>
            ))}

            {/* OBSERVAÇÕES */}
            <Text style={styles.label}>Observações</Text>

            <TextInput
              multiline
              placeholder="Paciente acordado, sem queixas, mantendo saturação adequada."
              placeholderTextColor="#777"
              style={styles.textArea}
            />

            {/* BOTÃO COM GRADIENTE */}
            <LinearGradient
              colors={['#3A7BD5', '#214192']}
              style={styles.button}
            >
              <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.buttonText}>Salvar Registro</Text>
              </TouchableOpacity>
            </LinearGradient>

          </ScrollView>
        </View>

        {/* NAVBAR */}
        <SafeAreaView edges={['bottom']} style={styles.navWrapper}>
          <View style={styles.nav}>
            <View style={styles.navItem}>
              <Ionicons name="home-outline" size={20} color="#fff" />
            </View>

            <View style={styles.navItem}>
              <Ionicons name="search-outline" size={20} color="#fff" />
            </View>

            <View style={styles.navItem}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </View>

            <View style={styles.navItem}>
              <Ionicons name="person-outline" size={20} color="#fff" />
            </View>
          </View>
        </SafeAreaView>

      </SafeAreaView>
    </LinearGradient>
  );
}