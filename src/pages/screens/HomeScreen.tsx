import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8; // 80% da largura da tela

export default function Home({ navigation }: any) {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigation.replace("Login");
    });
    return unsub;
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.title}>Protocolo Infantil</Text>
          <TouchableOpacity
            style={styles.configButton}
            onPress={() => navigation.navigate("Configuracoes")}
          >
            <Ionicons name="settings-outline" size={28} color="#1F4E8C" />
          </TouchableOpacity>
        </View>

        {/* MENSAGEM DE BOAS-VINDAS */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Olá, bem-vindo!</Text>
          <Text style={styles.subtitle}>
            Gerencie os pacientes e acompanhe os protocolos
          </Text>
        </View>

        {/* CARDS CENTRALIZADOS */}
        <View style={styles.cardsContainer}>
          {/* Card Cadastrar Paciente */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PacientsCad")}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="person-add-outline" size={40} color="#1F4E8C" />
            </View>
            <Text style={styles.cardTitle}>Cadastrar Paciente</Text>
            <Text style={styles.cardDesc}>
              Adicione um novo paciente ao sistema
            </Text>
          </TouchableOpacity>

          {/* Card Ver Históricos */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("HistoricoPacientes")}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="list-outline" size={40} color="#4A90E2" />
            </View>
            <Text style={styles.cardTitle}>Ver Históricos</Text>
            <Text style={styles.cardDesc}>
              Consulte pacientes já cadastrados
            </Text>
          </TouchableOpacity>
        </View>

        {/* RODAPÉ OPCIONAL (ex: versão) */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>v1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#1E293B" },
  configButton: { padding: 4 },
  welcomeContainer: { marginBottom: 40, alignItems: "center" },
  welcomeText: { fontSize: 22, fontWeight: "600", color: "#0F172A" },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: { fontSize: 20, fontWeight: "600", color: "#1E293B", marginBottom: 8 },
  cardDesc: { fontSize: 14, color: "#64748B", textAlign: "center" },
  footer: { alignItems: "center", marginVertical: 20 },
  footerText: { fontSize: 12, color: "#94A3B8" },
});