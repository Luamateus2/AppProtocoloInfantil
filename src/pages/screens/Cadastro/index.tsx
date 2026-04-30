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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../routes/types';
import { register } from '../../../services/authService';

import styles from './styles';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

export default function Cadastro() {
  const navigation = useNavigation<NavProps>();

  const [nome, setNome] = useState('');
  const [crm, setCrm] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nome || !crm || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);

      const user = await register(email, senha);

      console.log('Usuário criado:', user);

      Alert.alert('Sucesso', 'Conta criada com sucesso!');

      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Erro ao cadastrar', error.message);
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
          <LinearGradient
            colors={['#4A90E2', '#1E3C72']}
            style={styles.content}
          >
            <Text style={styles.title}>Cadastro</Text>

            <Text style={styles.description}>
              Preencha seus dados para criar uma conta.
            </Text>

            {/* Nome */}
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />

            {/* CRM */}
            <Text style={styles.label}>CRM:</Text>
            <TextInput
              value={crm}
              onChangeText={setCrm}
              style={styles.input}
            />

            {/* Email */}
            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setSenha}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
            />

            {/* Confirmar senha */}
            <Text style={styles.label}>Confirmar senha:</Text>
            <TextInput
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
            />

            <Text style={styles.supportText}>
              ⓘ A senha deve ter pelo menos 6 caracteres
            </Text>

            {/* Botão cadastrar */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>

            {/* Voltar */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.back}>Voltar</Text>
            </TouchableOpacity>

          </LinearGradient>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}