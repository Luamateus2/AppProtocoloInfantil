import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';

import {
  auth,
  db,
  storage,
} from '../../services/firebaseConfig';

import {
  RootStackParamList,
} from '../../routes/types';

import AppFooter from '../../components/Footer/Footer';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<
    RootStackParamList,
    'Settings'
  >;

export default function Settings() {

  const navigation =
    useNavigation<NavProps>();

  const [fotoPerfil, setFotoPerfil] =
    useState<string | null>(null);

  const [loadingFoto, setLoadingFoto] =
    useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    carregarFoto();
  }, []);

  async function carregarFoto() {

    try {

      if (!user) return;

      const userRef = doc(
        db,
        'usuarios',
        user.uid
      );

      const userSnap =
        await getDoc(userRef);

      if (userSnap.exists()) {

        const data =
          userSnap.data();

        if (data.fotoPerfil) {

          setFotoPerfil(
            data.fotoPerfil
          );

          return;
        }
      }

      if (user.photoURL) {

        setFotoPerfil(
          user.photoURL
        );
      }

    } catch (error) {

      console.log(
        'Erro ao carregar foto:',
        error
      );
    }
  }

  async function alterarFoto() {

    try {

      if (!user) {

        Alert.alert(
          'Erro',
          'Usuário não encontrado.'
        );

        return;
      }

      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {

        Alert.alert(
          'Permissão necessária',
          'Permita o acesso à galeria.'
        );

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (
        resultado.canceled ||
        !resultado.assets?.[0]?.uri
      ) {
        return;
      }

      setLoadingFoto(true);

      const uri =
        resultado.assets[0].uri;

      const response =
        await fetch(uri);

      const blob =
        await response.blob();

      const storageRef = ref(
        storage,
        `usuarios/${user.uid}/fotoPerfil.jpg`
      );

      await uploadBytes(
        storageRef,
        blob
      );

      const downloadURL =
        await getDownloadURL(storageRef);

      await updateProfile(user, {
        photoURL: downloadURL,
      });

      await setDoc(
        doc(
          db,
          'usuarios',
          user.uid
        ),
        {
          fotoPerfil: downloadURL,
          email: user.email,
          atualizadoEm:
            serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      setFotoPerfil(
        downloadURL
      );

      Alert.alert(
        'Sucesso',
        'Foto atualizada!'
      );

    } catch (error: any) {

      console.log(
        'ERRO FOTO:',
        error.code,
        error.message,
        error.serverResponse
      );

      Alert.alert(
        'Erro',
        'Não foi possível atualizar a foto.'
      );

    } finally {

      setLoadingFoto(false);
    }
  }

  async function sair() {

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

          onPress: async () => {

            try {

              await signOut(auth);

              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Login',
                  },
                ],
              });

            } catch (error) {

              console.log(error);

              Alert.alert(
                'Erro',
                'Não foi possível sair da conta'
              );
            }
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

          <Text
            style={
              styles.headerTitle
            }
          >
            Configurações
          </Text>

          <View
            style={{
              width: 24,
            }}
          />

        </View>

        <View style={styles.body}>

          <View
            style={
              styles.profileContainer
            }
          >

            <View
              style={
                styles.avatar
              }
            >

              {fotoPerfil ? (

                <Image
                  source={{
                    uri: fotoPerfil,
                  }}
                  style={
                    styles.avatarImage
                  }
                />

              ) : (

                <Ionicons
                  name="person"
                  size={45}
                  color="#214192"
                />
              )}

              {loadingFoto && (

                <View
                  style={
                    styles.loadingAvatar
                  }
                >

                  <ActivityIndicator
                    size="small"
                    color="#fff"
                  />

                </View>
              )}

            </View>

            <Text style={styles.name}>
              Meu Perfil
            </Text>

            <TouchableOpacity
              style={
                styles.photoButton
              }
              onPress={alterarFoto}
              disabled={loadingFoto}
              activeOpacity={0.8}
            >

              <Ionicons
                name="camera-outline"
                size={18}
                color="#fff"
              />

              <Text
                style={
                  styles.photoButtonText
                }
              >
                {fotoPerfil
                  ? 'Alterar foto'
                  : 'Adicionar foto'}
              </Text>

            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(
                'NovaSenha'
              )
            }
          >

            <View
              style={
                styles.leftContent
              }
            >

              <View
                style={
                  styles.iconContainer
                }
              >

                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#214192"
                />

              </View>

              <Text
                style={
                  styles.cardText
                }
              >
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
              style={
                styles.leftContent
              }
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
                style={
                  styles.logoutText
                }
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