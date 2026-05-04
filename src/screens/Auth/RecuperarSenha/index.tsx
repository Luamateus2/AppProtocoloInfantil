import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { resetPassword } from '../../../services/authService';

import styles from './styles';
import { LogoSecundaria } from '../../../constants/images';
export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (!email.trim()) {
      alert('Digite seu email');
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email);

      alert('Enviamos um link para redefinir sua senha no seu email.');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#4A90E2', '#1E3C72']} // 🔥 SUA COR ORIGINAL
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >

           
          <View style={styles.top}>
            <Image source={LogoSecundaria.logo} style={styles.logo} />
          </View>
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
                style={styles.buttonWrapper}
                onPress={handleResetPassword}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#4293D5','#214192']} 
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Enviando...' : 'Entrar'}
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