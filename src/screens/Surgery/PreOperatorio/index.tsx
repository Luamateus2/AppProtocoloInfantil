import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import styles from "./styles";

export default function PreOperatorio() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#2F6FB6", "#1F4FA3"]}
        style={styles.header}
      >
        <TouchableOpacity>
          <ChevronLeft color="#fff" size={26} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pré-Operatório</Text>
        <View style={{ width: 26 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* DATE */}
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>12/03/2026</Text>
        </View>

        <Text style={styles.sectionTitle}>
          Avaliação Pré-Anestésica
        </Text>

        {/* FORM */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Horário</Text>
          <View style={styles.inputBox}>
            <Text style={styles.value}>08:30</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Jejum</Text>
          <View style={styles.inputBox}>
            <Text style={styles.value}>Sim (8h)</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Estado Geral</Text>
          <View style={styles.inputBox}>
            <Text style={styles.value}>Estável</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Via Aérea</Text>
          <View style={styles.inputBox}>
            <Text style={styles.value}>Mallampati I</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Medicação em Uso</Text>
          <View style={styles.inputBox}>
            <Text style={styles.value}>Nenhuma</Text>
          </View>
        </View>

        {/* OBSERVAÇÕES */}
        <Text style={styles.label}>Observações</Text>
        <TextInput
          multiline
          placeholder="Paciente colaborativo, sem alterações relevantes"
          style={styles.textArea}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Registro</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM NAV MOCK */}
      <View style={styles.bottomBar}>
        <View style={styles.tabItem} />
        <View style={styles.tabItem} />
        <View style={styles.tabItem} />
        <View style={styles.tabItem} />
      </View>
    </SafeAreaView>
  );
}