import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Cadastro'
>;

export default function Cadastro() {
  const navigation = useNavigation<NavProps>();

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Novo Paciente</Text>
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.sectionTitle}>Dados do Paciente</Text>

            {/* NOME */}
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              placeholder="Ex: João Silva"
              placeholderTextColor="#999"
              style={styles.input}
            />

            {/* DATA + IDADE */}
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput
                  placeholder="dd/mm/aaaa"
                  placeholderTextColor="#999"
                  style={styles.input}
                />
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Idade</Text>
                <TextInput
                  placeholder="anos"
                  placeholderTextColor="#999"
                  style={styles.input}
                />
              </View>
            </View>

            {/* ASA + PESO */}
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>ASA</Text>

                <TouchableOpacity style={styles.select}>
                  <Text style={styles.selectText}>Selecione</Text>
                  <Ionicons name="chevron-down" size={18} color="#214192" />
                </TouchableOpacity>
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput
                  placeholder="Ex: 20 kg"
                  placeholderTextColor="#999"
                  style={styles.input}
                />
              </View>
            </View>

            {/* PROCEDIMENTO */}
            <Text style={styles.label}>Procedimento Cirúrgico</Text>
            <TextInput
              placeholder="Ex: Adenoidectomia"
              placeholderTextColor="#999"
              style={styles.input}
            />

            {/* COMORBIDADES */}
            <Text style={styles.label}>Comorbidades</Text>
            <TextInput
              placeholder="Ex: Asma, cardiopatia..."
              placeholderTextColor="#999"
              style={styles.input}
            />

            {/* OBSERVAÇÕES */}
            <Text style={styles.label}>Observações</Text>
            <TextInput
              placeholder="Informações adicionais..."
              placeholderTextColor="#999"
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

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => navigation.navigate('PreOperatorio')}
              >
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>

        {/* NAVBAR */}
        <SafeAreaView edges={['bottom']} style={styles.bottomWrapper}>
          <View style={styles.bottomTab}>
            <Ionicons name="home-outline" size={22} color="#fff" />
            <Ionicons name="search-outline" size={22} color="#fff" />
            <Ionicons name="notifications-outline" size={22} color="#fff" />
            <Ionicons name="person-outline" size={22} color="#fff" />
          </View>
        </SafeAreaView>

      </SafeAreaView>
    </LinearGradient>
  );
}