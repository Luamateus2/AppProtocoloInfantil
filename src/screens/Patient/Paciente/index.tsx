import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Pacientes'>;

export default function Pacientes() {
  const navigation = useNavigation<NavProps>();

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pacientes</Text>
      </View>

      {/* BUSCA */}
      <View style={styles.searchContainer}>
        <LinearGradient
          colors={['#4A90E2', '#1E3C72']}
          style={styles.searchBox}
        >
          <TextInput
            placeholder="João Silva"
            placeholderTextColor="#FFF"
            style={styles.searchInput}
          />
        </LinearGradient>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* SUGESTÕES */}
      <View style={styles.suggestions}>
        <Text style={styles.suggestionText}>João Silva</Text>
        <Text style={styles.suggestionText}>João Vitor</Text>
        <Text style={styles.suggestionText}>João Fernandes</Text>
        <Text style={styles.suggestionText}>João Pereira</Text>
      </View>

      {/* LISTA */}
      <ScrollView contentContainerStyle={styles.list}>

        {/* CARD */}
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JS</Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.name}>João Silva</Text>
            <Text style={styles.details}>
              5 anos • Cirurgia: Adenoidectomia
            </Text>
            <Text style={styles.details}>
              Último registro: 12/03/2026
            </Text>
          </View>

          <Text style={styles.arrow}>↗</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MS</Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.name}>Maria Souza</Text>
            <Text style={styles.details}>
              8 anos • Cirurgia: Amigdalectomia
            </Text>
            <Text style={styles.details}>
              Último registro: 10/03/2026
            </Text>
          </View>

          <Text style={styles.arrow}>↗</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>PC</Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.name}>Pedro Carlos</Text>
            <Text style={styles.details}>
              6 anos • Cirurgia: Laringoscopia
            </Text>
            <Text style={styles.details}>
              Último registro: 14/03/2026
            </Text>
          </View>

          <Text style={styles.arrow}>↗</Text>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>🏠</Text>
        <Text style={styles.navItem}>🔍</Text>
        <Text style={styles.navItem}>🔔</Text>
        <Text style={styles.navItem}>👤</Text>
      </View>

    </SafeAreaView>
  );
}