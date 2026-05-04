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

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

import styles from './styles';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'IntraOperatorio'
>;

export default function IntraOperatorio() {
  const navigation = useNavigation<NavProps>();

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Intra-Operatório</Text>

          <View style={{ width: 22 }} />
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>12/03/2026</Text>
            </View>

            {[
              ['Horário de Início', '09:15'],
              ['Anestesia', 'Geral Inalatória'],
              ['Via Aérea', 'Máscara Laríngea'],
              ['Intercorrências', 'Nenhuma'],
            ].map(([label, value], i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.label}>{label}</Text>

                <TouchableOpacity style={styles.select}>
                  <Text style={styles.selectText}>{value}</Text>
                  <Ionicons name="chevron-down" size={14} color="#2A5298" />
                </TouchableOpacity>
              </View>
            ))}

            <Text style={styles.label}>Observações</Text>

            <TextInput
              multiline
              placeholder="Procedimento sem intercorrências..."
              placeholderTextColor="#777"
              style={styles.textArea}
            />

            {/* BOTÃO FUNCIONANDO */}
            <LinearGradient
              colors={['#3A7BD5', '#2A5298']}
              style={styles.button}
            >
              <TouchableOpacity
                style={{ width: '100%', alignItems: 'center' }}
                onPress={() => navigation.navigate('PosOperatorio')}
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