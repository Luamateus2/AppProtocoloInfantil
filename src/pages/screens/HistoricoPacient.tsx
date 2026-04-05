import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../services/firebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function HistoricoPacientes({ navigation }: any) {
  const [pacientes, setPacientes] = useState<any[]>([]);

  useEffect(() => {
    carregarPacientes();
  }, []);

  async function carregarPacientes() {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "pacientes"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPacientes(lista);
  }

  async function excluirPaciente(id: string) {
    Alert.alert("Confirmar", "Deseja excluir este paciente e todos os seus dados?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, "pacientes", id));
          carregarPacientes();
        },
      },
    ]);
  }

  function formatarData(dataISO: string) {
    if (!dataISO) return "";
    const d = new Date(dataISO);
    return d.toLocaleDateString("pt-BR");
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Histórico de Pacientes</Text>
        <FlatList
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.patientName}>Paciente ID: {item.id.slice(-6)}</Text>
                <Text>Idade: {item.idade} anos</Text>
                <Text>Peso: {item.peso} kg</Text>
                <Text>ASA: {item.classificacaoAsa}</Text>
                <Text>Cadastro: {formatarData(item.dataCadastro)}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate("DetalhesPaciente", { id: item.id })}
                >
                  <Text style={styles.actionText}>Ver detalhes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => excluirPaciente(item.id)}
                >
                  <Text style={styles.actionText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F8FB" },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#1F4E8C", marginBottom: 20 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardContent: { marginBottom: 12 },
  patientName: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  editButton: { backgroundColor: "#4A90E2", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  deleteButton: { backgroundColor: "#d9534f", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  actionText: { color: "#fff", fontWeight: "bold" },
});