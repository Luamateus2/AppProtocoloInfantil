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

import { RootStackParamList } from '../../../routes/types';
import { register } from '../../../services/authService';
import { LogoPrincipal } from '../../../constants/images';

import CardModal from '../../../components/Card';
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

  const [errors, setErrors] = useState({
    nome: false,
    crm: false,
    email: false,
    senha: false,
    confirmarSenha: false,
  });

  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState<'error' | 'success'>('error');

  function showError(msg: string) {
    setMessage(msg);
    setType('error');
    setModalVisible(true);
  }

  function showSuccess(msg: string) {
    setMessage(msg);
    setType('success');
    setModalVisible(true);
  }

  async function handleRegister() {
    console.log('CLICK BOTÃO CADASTRO');

    const newErrors = {
      nome: !nome.trim(),
      crm: !crm.trim(),
      email: !email.trim(),
      senha: !senha.trim(),
      confirmarSenha: !confirmarSenha.trim(),
    };

    setErrors(newErrors);

    if (
      newErrors.nome ||
      newErrors.crm ||
      newErrors.email ||
      newErrors.senha ||
      newErrors.confirmarSenha
    ) {
      showError('Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      showError('As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      showError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);

      console.log('CHAMANDO FIREBASE REGISTER');

      await register(email, senha,crm);

      console.log('CADASTRO OK');

      showSuccess('Conta criada com sucesso!');
    } catch (error: any) {
      console.log('ERRO FIREBASE:', error);

      showError(error?.message || 'Erro inesperado');
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.header}>
            <Image source={LogoPrincipal.logo} style={styles.logo} />
          </View>
          <LinearGradient colors={['#4A90E2', '#1E3C72']} style={styles.content}>

            <View style={styles.form}>

              <Text style={styles.title}>Cadastro</Text>

              <Text style={styles.description}>
                Preencha seus dados para criar uma conta.
              </Text>

              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                value={nome}
                onChangeText={(text) => {
                  setNome(text);
                  setErrors(prev => ({ ...prev, nome: false }));
                }}
                style={[styles.input, errors.nome && styles.inputError]}
              />

              <Text style={styles.label}>CRM</Text>
              <TextInput
                value={crm}
                onChangeText={(text) => {
                  setCrm(text);
                  setErrors(prev => ({ ...prev, crm: false }));
                }}
                style={[styles.input, errors.crm && styles.inputError]}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors(prev => ({ ...prev, email: false }));
                }}
                style={[styles.input, errors.email && styles.inputError]}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                value={senha}
                onChangeText={(text) => {
                  setSenha(text);
                  setErrors(prev => ({ ...prev, senha: false }));
                }}
                secureTextEntry
                style={[styles.input, errors.senha && styles.inputError]}
              />

              <Text style={styles.label}>Confirmar senha</Text>
              <TextInput
                value={confirmarSenha}
                onChangeText={(text) => {
                  setConfirmarSenha(text);
                  setErrors(prev => ({ ...prev, confirmarSenha: false }));
                }}
                secureTextEntry
                style={[styles.input, errors.confirmarSenha && styles.inputError]}
              />

              <Text style={styles.supportText}>
                ⓘ A senha deve ter pelo menos 6 caracteres
              </Text>

            </View>
            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.backButton}
              >
                <Text style={styles.back}>Voltar</Text>
              </TouchableOpacity>

            </View>

          </LinearGradient>

        </ScrollView>
        <CardModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);

            if (type === 'success') {
              navigation.navigate('Login');
            }
          }}
        >
          <View style={{ alignItems: 'center' }}>

            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 15,
                fontWeight: '600',
              }}
            >
              {message}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);

                if (type === 'success') {
                  navigation.navigate('Login');
                }
              }}
              style={{
                backgroundColor: '#4A90E2',
                padding: 12,
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                OK
              </Text>
            </TouchableOpacity>

          </View>
        </CardModal>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}