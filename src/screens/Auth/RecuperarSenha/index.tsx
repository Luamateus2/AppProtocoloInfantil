import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { resetPassword } from '../../../services/authService';

import styles from './styles';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (!email) {
      Alert.alert('Erro', 'Digite seu email');
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email);

      Alert.alert(
        'Sucesso',
        'Enviamos um link para redefinir sua senha no seu email.'
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >

          {/* TOPO */}
          <LinearGradient
            colors={['#4A90E2', '#1E3C72']}
            style={styles.top}
          >
            <View style={styles.logo}>
              <Text>LOGO</Text>
            </View>
          </LinearGradient>

          {/* CONTEÚDO */}
          <View style={styles.content}>
            <Text style={styles.title}>Esqueceu a senha?</Text>

            <Text style={styles.description}>
              Digite o e-mail cadastrado e enviaremos o link para você criar uma nova senha.
            </Text>

            <Text style={styles.label}>Email</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Enviando...' : 'Enviar'}
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}