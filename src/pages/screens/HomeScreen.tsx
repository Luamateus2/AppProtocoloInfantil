import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth, db } from "../../services/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Home({ navigation }: any) {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigation.replace("Login");
    });
    return unsub;
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(lista);
    });
    return unsub;
  }, []);

  async function excluir(id: string) {
    await deleteDoc(doc(db, "tasks", id));
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Protocolo Infantil</Text>
          <TouchableOpacity
            style={styles.configButton}
            onPress={() => navigation.navigate("Configuracoes")}
          >
            <Text style={styles.config}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* SEÇÃO DE GERENCIAMENTO DE PACIENTES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pacientes</Text>
          <TouchableOpacity
            style={styles.patientButton}
            onPress={() => navigation.navigate("PacientsCad")}
          >
            <Text style={styles.patientButtonText}>Cadastrar Paciente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.patientButton, styles.historyButton]}
            onPress={() => navigation.navigate("HistoricoPacientes")}
          >
            <Text style={styles.patientButtonText}>Ver Históricos</Text>
          </TouchableOpacity>
        </View>

       
            
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F8FB" },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F4E8C",
  },
  configButton: {
    padding: 8,
    borderRadius: 8,
  },
  config: {
    fontSize: 28,
    color: "#1F4E8C",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  patientButton: {
    backgroundColor: "#1F4E8C",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  historyButton: {
    backgroundColor: "#4A90E2",
    marginBottom: 0,
  },
  patientButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  task: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  taskText: {
    fontSize: 17,
    color: "#333",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#1F4E8C",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  delete: {
    color: "#1F4E8C",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});