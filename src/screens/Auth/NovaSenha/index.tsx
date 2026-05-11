import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { updatePassword } from 'firebase/auth';

import { auth } from '../../../services/firebaseConfig';

import styles from './styles';

export default function NovaSenha() {
  const navigation = useNavigation();

  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const regras = {
    min: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[!@#$%&*]/.test(senha),
  };

  const tudoOk =
    regras.min &&
    regras.upper &&
    regras.lower &&
    regras.number &&
    regras.special &&
    senha === confirmar;

  async function salvarSenha() {
    if (!tudoOk) return;

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) return;

      await updatePassword(user, senha);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigation.navigate('Settings' as never);
      }, 1200);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function corItem(ok: boolean) {
    return ok ? '#1E4FA1' : '#D9534F';
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER AZUL LIMPO */}
      <LinearGradient colors={['#1E4FA1', '#2E6FD1']} style={styles.header} />

      {/* SUCCESS CARD */}
      {success && (
        <View style={styles.successCard}>
          <Ionicons name="checkmark-circle" size={60} color="#1E4FA1" />
          <Text style={styles.successTitle}>Senha alterada!</Text>
          <Text style={styles.successText}>
            Atualização realizada com sucesso
          </Text>
        </View>
      )}

      {!success && (
        <SafeAreaView style={styles.body}>
          {/* TÍTULO */}
          <Text style={styles.title}>Alterar Senha</Text>

          <Text style={styles.subtitle}>
            Crie uma senha forte para manter sua conta protegida. Depois de
            confirmar, você volta ao aplicativo.
          </Text>

          {/* INPUTS */}
          <TextInput
            placeholder="Senha"
            secureTextEntry
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
          />

          <TextInput
            placeholder="Confirmar senha"
            secureTextEntry
            style={styles.input}
            value={confirmar}
            onChangeText={setConfirmar}
          />

          {/* CHECKLIST DINÂMICO */}
          <View style={styles.checklist}>

            <View style={styles.checkItem}>
              <Ionicons name="ellipse" size={8} color={corItem(regras.min)} />
              <Text style={[styles.checkText, { color: corItem(regras.min) }]}>
                Mínimo de 8 caracteres
              </Text>
            </View>

            <View style={styles.checkItem}>
              <Ionicons name="ellipse" size={8} color={corItem(regras.upper)} />
              <Text style={[styles.checkText, { color: corItem(regras.upper) }]}>
                Uma letra maiúscula
              </Text>
            </View>

            <View style={styles.checkItem}>
              <Ionicons name="ellipse" size={8} color={corItem(regras.lower)} />
              <Text style={[styles.checkText, { color: corItem(regras.lower) }]}>
                Uma letra minúscula
              </Text>
            </View>

            <View style={styles.checkItem}>
              <Ionicons name="ellipse" size={8} color={corItem(regras.number)} />
              <Text style={[styles.checkText, { color: corItem(regras.number) }]}>
                Um número
              </Text>
            </View>

            <View style={styles.checkItem}>
              <Ionicons name="ellipse" size={8} color={corItem(regras.special)} />
              <Text style={[styles.checkText, { color: corItem(regras.special) }]}>
                Caractere especial (!@#$%)
              </Text>
            </View>

          </View>

          {/* BOTÕES */}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                { opacity: tudoOk ? 1 : 0.4 },
              ]}
              disabled={!tudoOk || loading}
              onPress={salvarSenha}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}