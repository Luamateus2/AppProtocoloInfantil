import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function PosOperatorio() {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pós-Operatório</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* DATA */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>12/03/2026</Text>
        </View>

        {/* CAMPOS */}
        <View style={styles.field}>
          <Text style={styles.label}>Horário de Término</Text>
          <TouchableOpacity style={styles.select}>
            <Text style={styles.selectText}>10:30</Text>
            <Ionicons name="chevron-down" size={16} color="#2F5DA8" />
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Recuperação</Text>
          <TouchableOpacity style={styles.select}>
            <Text style={styles.selectText}>Estável</Text>
            <Ionicons name="chevron-down" size={16} color="#2F5DA8" />
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Sinais Vitais</Text>
          <TouchableOpacity style={styles.select}>
            <Text style={styles.selectText}>98 bpm | SpO2: 99%</Text>
            <Ionicons name="chevron-down" size={16} color="#2F5DA8" />
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Dor (Escala)</Text>
          <TouchableOpacity style={styles.select}>
            <Text style={styles.selectText}>2</Text>
            <Ionicons name="chevron-down" size={16} color="#2F5DA8" />
          </TouchableOpacity>
        </View>

        {/* OBSERVAÇÕES */}
        <Text style={styles.label}>Observações</Text>
        <TextInput
          multiline
          placeholder="Paciente acordado, sem queixas, mantendo saturação adequada."
          placeholderTextColor="#666"
          style={styles.textArea}
        />

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Registro</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={22} color="#fff" />
        <Ionicons name="search-outline" size={22} color="#fff" />
        <Ionicons name="notifications-outline" size={22} color="#fff" />
        <Ionicons name="person-outline" size={22} color="#fff" />
      </View>

    </View>
  );
}