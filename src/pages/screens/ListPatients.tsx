import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth, db } from "../../services/firebaseConfig";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export interface Patient {
  id?: string;
  nome: string;
  idade: string;
  peso: string;
  // outros campos do paciente
}

export default function ListPatientsScreen({ navigation }: any) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Verifica login
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) navigation.replace("SignIn");
    });
    return unsubAuth;
  }, []);

  // Busca pacientes
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "patients"), where("uid", "==", user.uid));
    const unsubSnapshot = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Patient),
      }));
      setPatients(lista);
      setLoading(false);
    });

    return unsubSnapshot;
  }, []);

  // Excluir paciente
  const excluir = async (id: string) => {
    try {
      await deleteDoc(doc(db, "patients", id));
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
    }
  };

  const renderPatient = ({ item }: { item: Patient }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nome}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditarPaciente", { id: item.id })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => excluir(item.id!)}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Pacientes</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#1565C0" style={{ marginTop: 20 }} />
        ) : patients.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum paciente cadastrado.</Text>
        ) : (
          <FlatList
            data={patients}
            keyExtractor={(item) => item.id!}
            renderItem={renderPatient}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Patients")}
        >
          <Text style={styles.buttonText}>Cadastrar Novo Paciente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E3F2FD" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1565C0", marginBottom: 20 },
  emptyText: { fontSize: 18, textAlign: "center", marginTop: 40, color: "#546E7A" },

  item: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: { fontSize: 18, color: "#212121" },
  actions: { flexDirection: "row", alignItems: "center" },

  editButton: {
    backgroundColor: "#1565C0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
  },
  editText: { color: "#fff", fontWeight: "bold" },

  delete: { color: "#E53935", fontSize: 18, fontWeight: "bold" },

  button: {
    backgroundColor: "#1565C0",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "bold", textAlign: "center" },
});