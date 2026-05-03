import React from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../routes/types';
import { styles } from './styles'

type NavProps = NativeStackNavigationProp<RootStackParamList>;

export default function NovoPaciente() {
  const navigation = useNavigation<NavProps>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Novo Paciente</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Dados do Paciente</Text>

          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            placeholder="Ex: João Silva"
            style={styles.input}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                placeholder="dd/mm/aaaa"
                style={styles.input}
              />
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                placeholder="anos"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>ASA</Text>
              <TextInput
                placeholder="Selecione"
                style={styles.input}
              />
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                placeholder="Ex: 20 kg"
                style={styles.input}
              />
            </View>
          </View>

          <Text style={styles.label}>Procedimento Cirúrgico</Text>
          <TextInput
            placeholder="Ex: Adenoidectomia"
            style={styles.input}
          />

          <Text style={styles.label}>Comorbidades</Text>
          <TextInput
            placeholder="Ex: Asma, cardiopatia..."
            style={styles.input}
          />

          <Text style={styles.label}>Observações</Text>
          <TextInput
            placeholder="Informações adicionais..."
            style={[styles.input, styles.textArea]}
            multiline
          />

          {/* BOTÕES */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}