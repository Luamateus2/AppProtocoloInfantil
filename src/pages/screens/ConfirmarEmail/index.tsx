import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

export default function ConfirmarEmail() {
  const email = 'exemplo@email.com';

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#4A90E2', '#1E3C72']}
        style={styles.header}
      >
        <View style={styles.logo}>
          <Text>LOGO</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>

        <View style={styles.topRow}>
          <Text style={styles.back}>↩</Text>
          <Text style={styles.title}>Confirmar e-mail</Text>
        </View>

        <View style={styles.icon}>
          <Text style={{ fontSize: 50 }}>✉️</Text>
        </View>

        <Text style={styles.text}>
          Enviamos um link de confirmação para:
        </Text>

        <Text style={styles.email}>{email}</Text>

        <Text style={styles.textSmall}>
          Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reenviar E-mail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}