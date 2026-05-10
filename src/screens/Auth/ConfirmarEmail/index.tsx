import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

import {
  LogoSecundaria,
  ConfirmarEmail as ConfirmarEmailImage,
} from '../../../constants/images';

export default function ConfirmarEmail() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const email =
    route.params?.email || 'exemplo@email.com';

  return (
    <LinearGradient
      colors={['#4A90E2', '#1E3C72']}
      style={styles.container}
    >
      <SafeAreaView
        style={styles.safeArea}
        edges={['top']}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={LogoSecundaria.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* CONTEÚDO */}
        <View style={styles.content}>
          {/* TOPO */}
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#2C4FA3"
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Confirmar e-mail
            </Text>
          </View>

          {/* IMAGEM */}
          <View style={styles.iconContainer}>
            <Image
              source={ConfirmarEmailImage.logo}
              style={styles.confirmarImage}
              resizeMode="contain"
            />
          </View>

          {/* TEXTO */}
          <Text style={styles.text}>
            Enviamos um link de confirmação
            para:
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>

          <Text style={styles.description}>
            Por favor, verifique sua caixa de
            entrada e clique no link para
            redefinir sua senha.
          </Text>

          {/* BOTÃO */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={['#4A90E2', '#214192']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Reenviar E-mail
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer} />
      </SafeAreaView>
    </LinearGradient>
  );
}