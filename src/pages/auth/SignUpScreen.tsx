import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../routes/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

export default function SignUpScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    // Limpa mensagens anteriores
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !senha) {
      setErrorMessage("Preencha e-mail e senha!");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setSuccessMessage("Cadastro realizado com sucesso!");
      // Aguarda 2 segundos e redireciona
      setTimeout(() => {
        navigation.replace("SignIn");
      }, 2000);
    } catch (error: any) {
      setErrorMessage("Falha ao criar conta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Criar Conta</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {successMessage !== "" && (
            <Text style={styles.successText}>{successMessage}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
            <Text style={styles.registerText}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1F4E8C",
    width: "100%",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    marginTop: 18,
    color: "#007bff",
    fontSize: 14,
  },
  errorText: {
    color: "#d9534f",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
  },
  successText: {
    color: "#5cb85c",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
  },
});