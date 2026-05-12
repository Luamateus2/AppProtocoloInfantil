import React, {
  useState,
} from 'react';

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

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  sendPasswordResetEmail,
} from 'firebase/auth';

import {
  auth,
} from '../../../services/firebaseConfig';

import styles from './styles';

export default function RecuperarSenha() {
  const [email, setEmail] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const navigation =
    useNavigation<any>();

  async function handleContinuar() {
    const emailFormatado =
      email.trim().toLowerCase();

    if (!emailFormatado) {
      Alert.alert(
        'Atenção',
        'Digite seu email.'
      );

      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        emailFormatado
      );

      navigation.navigate(
        'ConfirmarEmail',
        {
          email: emailFormatado,
        }
      );

    } catch (error: any) {
      console.log(
        'Erro ao enviar redefinição:',
        error
      );

      let mensagem =
        'Não foi possível enviar o email de redefinição.';

      if (
        error.code ===
        'auth/invalid-email'
      ) {
        mensagem =
          'Digite um email válido.';
      }

      if (
        error.code ===
        'auth/user-not-found'
      ) {
        mensagem =
          'Nenhuma conta encontrada com este email.';
      }

      if (
        error.code ===
        'auth/too-many-requests'
      ) {
        mensagem =
          'Muitas tentativas. Tente novamente mais tarde.';
      }

      Alert.alert(
        'Erro',
        mensagem
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={[
        '#4A90E2',
        '#1E3C72',
      ]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={
              false
            }
          >
            <View style={styles.top} />

            <View style={styles.content}>
              <Text style={styles.title}>
                Esqueceu a senha?
              </Text>

              <Text
                style={
                  styles.description
                }
              >
                Digite o e-mail cadastrado
                e enviaremos o link para você
                criar uma nova senha.
              </Text>

              <Text style={styles.label}>
                Email
              </Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              <TouchableOpacity
                style={
                  styles.buttonWrapper
                }
                onPress={
                  handleContinuar
                }
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[
                    '#4293D5',
                    '#214192',
                  ]}
                  style={[
                    styles.button,
                    loading && {
                      opacity: 0.7,
                    },
                  ]}
                >
                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    {loading
                      ? 'Enviando...'
                      : 'Enviar'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}