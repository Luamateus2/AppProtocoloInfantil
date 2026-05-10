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

import styles from './styles';
import { LogoSecundaria } from '../../../constants/images';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  function handleContinuar() {
    if (!email.trim()) {
      alert('Digite seu email');
      return;
    }

    setLoading(true);

    navigation.navigate('ConfirmarEmail', {
      email: email.trim(),
    });

    setLoading(false);
  }

  return (
    <LinearGradient
      colors={['#4A90E2', '#1E3C72']}
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
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {/* TOPO */}
            <View style={styles.top}>
              <Image
                source={LogoSecundaria.logo}
                style={styles.logo}
              />
            </View>

            {/* CONTEÚDO */}
            <View style={styles.content}>
              <Text style={styles.title}>
                Esqueceu a senha?
              </Text>

              <Text style={styles.description}>
                Digite o e-mail cadastrado
                para continuar.
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
              />

              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleContinuar}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#4293D5', '#214192']}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    {loading
                      ? 'Carregando...'
                      : 'Continuar'}
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