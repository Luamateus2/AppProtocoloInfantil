import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

export default function Configuracoes({ navigation }: any) {

  async function handleLogout() {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    } catch (error) {
      console.error("Erro ao sair:", error);
      Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        <View style={styles.menu}>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>⬅ Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>Sair</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 25, paddingTop: 25 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 40 },
  menu: { gap: 18 },
  button: { backgroundColor: "#e9e9e9", paddingVertical: 15, borderRadius: 10, paddingHorizontal: 15 },
  buttonText: { fontSize: 18, fontWeight: "600" },
  logoutButton: { backgroundColor: "#d9534f" },
});