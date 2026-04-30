import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../routes/types';
import { login } from '../../../services/authService';

import styles from './style';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<NavProps>();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin() {
    if (!email || !senha) {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const user = await login(email, senha);

      console.log('Usuário logado:', user);

      navigation.navigate('Home');
    } catch (error: any) {
      console.log('ERRO COMPLETO:', error);
      console.log('CODE:', error?.code);
      console.log('MESSAGE:', error?.message);

      if (error?.code === 'auth/user-not-found') {
        setErrorMessage('Este email não está cadastrado');
      } else if (
        error?.code === 'auth/wrong-password' ||
        error?.code === 'auth/invalid-credential'
      ) {
        setErrorMessage('Email ou senha incorretos');
      } else if (error?.code === 'auth/invalid-email') {
        setErrorMessage('Email inválido');
      } else {
        setErrorMessage(error?.message || 'Erro inesperado');
      }
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text>LOGO</Text>
            </View>
          </View>

          {/* Conteúdo */}
          <LinearGradient colors={['#4A90E2', '#1E3C72']} style={styles.content}>
            <Text style={styles.title}>Bem-Vindo</Text>

            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            {/* Email */}
            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage(null);
              }}
              placeholder="exemplo@dominio.com"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Senha */}
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                setErrorMessage(null);
              }}
              placeholder="Senha"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry
            />

            {/* Esqueci senha */}
            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
              <Text style={styles.forgot}>Esqueci minha senha</Text>
            </TouchableOpacity>

            {/* ERRO */}
            {errorMessage && (
              <View style={styles.errorCard}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            {/* Botão login */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            {/* Cadastro */}
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.register}>
                Não tem conta? <Text style={styles.link}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}