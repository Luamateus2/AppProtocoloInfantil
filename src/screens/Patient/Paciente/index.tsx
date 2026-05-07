import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Pacientes'
>;

export default function Pacientes() {
  const navigation = useNavigation<NavProps>();

  const [busca, setBusca] = useState('');

  const pacientes = [
    {
      id: 1,
      nome: 'João Silva',
      idade: 5,
      peso: 22.5,
      asa: 'ASA I',
      cirurgia: 'Adenoidectomia',
      comorbidade: 'Nenhuma',
      data: '12/03/2026',
    },
    {
      id: 2,
      nome: 'Maria Souza',
      idade: 8,
      peso: 31.2,
      asa: 'ASA II',
      cirurgia: 'Amigdalectomia',
      comorbidade: 'Asma',
      data: '10/03/2026',
    },
    {
      id: 3,
      nome: 'Pedro Carlos',
      idade: 6,
      peso: 25.7,
      asa: 'ASA I',
      cirurgia: 'Laringoscopia',
      comorbidade: 'Rinite',
      data: '14/03/2026',
    },
  ];

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pacientes</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#214192"
              />

              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="Buscar paciente..."
                placeholderTextColor="#8A94A6"
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity style={styles.filterButton}>
              <Ionicons
                name="options-outline"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {pacientes.map((paciente) => (
              <TouchableOpacity
                key={paciente.id}
                style={styles.card}
                activeOpacity={0.8}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {paciente.nome
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.name}>
                    {paciente.nome}
                  </Text>

                  <Text style={styles.details}>
                    {paciente.idade} anos • {paciente.peso} kg
                  </Text>

                  <Text style={styles.details}>
                    {paciente.asa} • {paciente.cirurgia}
                  </Text>

                  <Text style={styles.details}>
                    Comorbidade: {paciente.comorbidade}
                  </Text>

                  <Text style={styles.details}>
                    Cadastro: {paciente.data}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#214192"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <SafeAreaView edges={['bottom']} style={styles.navWrapper}>
          <View style={styles.nav}>
            <Ionicons name="home-outline" size={20} color="#fff" />
            <Ionicons name="search-outline" size={20} color="#fff" />
            <Ionicons
              name="notifications-outline"
              size={20}
              color="#fff"
            />
            <Ionicons name="person-outline" size={20} color="#fff" />
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </LinearGradient>
  );
}