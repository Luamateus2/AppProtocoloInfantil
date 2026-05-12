import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

import {
  sendPasswordResetEmail,
} from 'firebase/auth';

import {
  auth,
} from '../../../services/firebaseConfig';

import styles from './styles';

import {
  ConfirmarEmail as ConfirmarEmailImage,
  voltarIconAzul,
} from '../../../constants/images';

export default function ConfirmarEmail() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const [loading, setLoading] =
    useState(false);

  const email =
    route.params?.email ||
    'exemplo@email.com';

  async function handleReenviar() {
    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email.trim().toLowerCase()
      );

      Alert.alert(
        'Sucesso',
        'E-mail reenviado com sucesso.'
      );
    } catch (error: any) {
      console.log(
        'Erro ao reenviar email:',
        error
      );

      let mensagem =
        'Não foi possível reenviar o email.';

      if (
        error.code ===
        'auth/invalid-email'
      ) {
        mensagem =
          'Email inválido.';
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
      style={styles.container}
    >
      <SafeAreaView
        style={styles.safeArea}
        edges={['top']}
      >
        <View style={styles.blueHeader} />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }
              activeOpacity={0.7}
            >
              <Image
                source={
                  voltarIconAzul.logo
                }
                style={{
                  width: 24,
                  height: 24,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Confirmar e-mail
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Image
              source={
                ConfirmarEmailImage.logo
              }
              style={
                styles.confirmarImage
              }
              resizeMode="contain"
            />
          </View>

          <Text style={styles.text}>
            Enviamos um link de confirmação
            para:
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>

          <Text style={styles.description}>
            Por favor, verifique sua caixa
            de entrada e clique no link
            para redefinir sua senha.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonWrapper}
            onPress={handleReenviar}
            disabled={loading}
          >
            <LinearGradient
              colors={[
                '#4A90E2',
                '#214192',
              ]}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 1,
                y: 0,
              }}
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
                  ? 'Reenviando...'
                  : 'Reenviar E-mail'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footer} />
      </SafeAreaView>
    </LinearGradient>
  );
}