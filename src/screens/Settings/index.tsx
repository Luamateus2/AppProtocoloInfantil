import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../../routes/types';

import AppFooter from '../../components/Footer/Footer';

import styles from './styles';

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export default function Settings() {

  const navigation =
    useNavigation<NavProps>();

  function alterarFoto() {

    Alert.alert(
      'Foto de Perfil',
      'Abrir galeria para selecionar foto.'
    );
  }

  function alterarSenha() {

    navigation.navigate(
      'NovaSenha'
    );
  }

  function sair() {

    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {

            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Login',
                },
              ],
            });
          },
        },
      ]
    );
  }

  return (
    <LinearGradient
      colors={[
        '#214192',
        '#4293D5',
      ]}
      style={{ flex: 1 }}
    >

      <StatusBar
        barStyle="light-content"
      />

      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}
      >

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Configurações
          </Text>

          <View
            style={{ width: 24 }}
          />

        </View>

        {/* BODY */}

        <View style={styles.body}>

          {/* PERFIL */}

          <View
            style={styles.profileContainer}
          >

            <View
              style={styles.avatar}
            >

              <Ionicons
                name="person"
                size={45}
                color="#214192"
              />

            </View>

            <Text style={styles.name}>
              Meu Perfil
            </Text>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={alterarFoto}
            >

              <Ionicons
                name="camera-outline"
                size={18}
                color="#fff"
              />

              <Text
                style={styles.photoButtonText}
              >
                Adicionar foto
              </Text>

            </TouchableOpacity>

          </View>

          {/* OPÇÕES */}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={alterarSenha}
          >

            <View
              style={styles.leftContent}
            >

              <View
                style={styles.iconContainer}
              >

                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#214192"
                />

              </View>

              <Text style={styles.cardText}>
                Alterar senha
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#214192"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.card,
              styles.logoutCard,
            ]}
            activeOpacity={0.8}
            onPress={sair}
          >

            <View
              style={styles.leftContent}
            >

              <View
                style={[
                  styles.iconContainer,
                  styles.logoutIcon,
                ]}
              >

                <Ionicons
                  name="log-out-outline"
                  size={22}
                  color="#D9534F"
                />

              </View>

              <Text
                style={styles.logoutText}
              >
                Sair
              </Text>

            </View>

          </TouchableOpacity>

        </View>

        <AppFooter />

      </SafeAreaView>

    </LinearGradient>
  );
}