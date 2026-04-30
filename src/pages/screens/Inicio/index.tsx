import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 👈 IMPORTANTE
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;

export default function Inicio() {
  const navigation = useNavigation<NavProps>();

  return (
    <SafeAreaView style={styles.container}> 
      
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text>LOGO</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={['#4A90E2', '#1E3C72']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}