import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/types';

import styles from './styles';
import {LogoPrincipal } from '../../constants/images';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;

export default function Inicio() {
  const navigation = useNavigation<NavProps>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      <View style={styles.container}>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={LogoPrincipal.logo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* BOTÃO */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
           <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
}