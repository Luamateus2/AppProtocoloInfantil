import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../../../routes/types';
import { login } from '../../../services/authService';
import { IMAGES } from '../../../constants/images';

import CardModal from '../../../components/Card';
import styles from './style';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<NavProps>();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    senha: false,
  });

  // 👇 NOVOS ESTADOS
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  async function handleLogin() {
    const newErrors = {
      email: !email.trim(),
      senha: !senha.trim(),
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.senha) return;

    try {
      setLoading(true);

      await login(email, senha);

      navigation.navigate('Home');
    } catch (error: any) {
      setErrorMessage(error.message);
      setModalVisible(true);
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
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Image source={IMAGES.logo} style={styles.logo} />
          </View>

          {/* CONTENT */}
          <LinearGradient colors={['#4A90E2', '#2F5DA8']} style={styles.content}>
            <Text style={styles.title}>Bem-Vindo</Text>

            <Text style={styles.description}>
              Acesse sua conta para continuar
            </Text>

            {/* EMAIL */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="exemplo@dominio.com"
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: false }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#777"
            />

            {errors.email && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={14} color="#F8F9FA" />
                <Text style={styles.errorText}>Campo obrigatório</Text>
              </View>
            )}

            {/* SENHA */}
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="Senha"
              style={[styles.input, errors.senha && styles.inputError]}
              secureTextEntry
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                setErrors((prev) => ({ ...prev, senha: false }));
              }}
              placeholderTextColor="#777"
            />

            {errors.senha && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={14} color="#F8F9FA" />
                <Text style={styles.errorText}>Campo obrigatório</Text>
              </View>
            )}

            {/* ESQUECI SENHA */}
            <TouchableOpacity>
              <Text style={styles.forgot}>Esqueci minha senha</Text>
            </TouchableOpacity>

            {/* BOTÃO LOGIN */}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            {/* CADASTRO */}
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.register}>
                Não tem conta? <Text style={styles.link}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>

        {/* 🔥 CARD DE ERRO FIREBASE */}
        <CardModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="alert-circle" size={40} color="#E53935" />
            </View>

            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '600',
                marginBottom: 15,
              }}
            >
              {errorMessage}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: '#4A90E2',
                padding: 12,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </CardModal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}