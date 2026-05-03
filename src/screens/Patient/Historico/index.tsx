import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Historico'>;

export default function Historico() {
  const navigation = useNavigation<NavProps>();

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
      </View>

      {/* NOME PACIENTE */}
      <View style={styles.patientContainer}>
        <Text style={styles.patientName}>João Silva</Text>
      </View>

      {/* LINHA + LISTA */}
      <View style={styles.timelineContainer}>

        {/* LINHA VERTICAL */}
        <View style={styles.line} />

        <ScrollView contentContainerStyle={styles.list}>

          {/* ITEM */}
          <View style={styles.itemRow}>
            <View style={styles.circle} />

            <View style={styles.card}>
              <Text style={styles.date}>12/03/2026 - 10:30</Text>
              <Text style={styles.title}>Pós-Operatório</Text>
              <Text style={styles.description}>
                Paciente estável, alta em breve.
              </Text>
              <Text style={styles.arrow}>↗</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View style={styles.circle} />

            <View style={styles.card}>
              <Text style={styles.date}>12/03/2026 - 09:15</Text>
              <Text style={styles.title}>Intra-Operatório</Text>
              <Text style={styles.description}>
                Anestesia Geral, sem intercorrências.
              </Text>
              <Text style={styles.arrow}>↗</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View style={styles.circle} />

            <View style={styles.card}>
              <Text style={styles.date}>12/03/2026 - 08:30</Text>
              <Text style={styles.title}>Pré-Operatório</Text>
              <Text style={styles.description}>
                Avaliação OK, jejum adequado.
              </Text>
              <Text style={styles.arrow}>↗</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View style={styles.circle} />

            <View style={styles.card}>
              <Text style={styles.date}>11/03/2026 - 11:00</Text>
              <Text style={styles.title}>Exames</Text>
              <Text style={styles.description}>
                Taxas OK, para realizar procedimento.
              </Text>
              <Text style={styles.arrow}>↗</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View style={styles.circle} />

            <View style={styles.card}>
              <Text style={styles.date}>10/03/2026 - 09:30</Text>
              <Text style={styles.title}>Consulta</Text>
              <Text style={styles.description}>
                Avaliação prévia realizada.
              </Text>
              <Text style={styles.arrow}>↗</Text>
            </View>
          </View>

        </ScrollView>
      </View>

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