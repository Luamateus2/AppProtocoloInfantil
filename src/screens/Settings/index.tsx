import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
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

type MessageType =
  'success' | 'error' | 'info';

export default function Settings() {

  const navigation =
    useNavigation<NavProps>();

  const [fotoPerfil, setFotoPerfil] =
    useState<string | null>(null);

  const [loadingFoto, setLoadingFoto] =
    useState(false);

  const [messageCard, setMessageCard] =
    useState<{
      type: MessageType;
      title: string;
      text: string;
    } | null>(null);

  const [showLogoutCard, setShowLogoutCard] =
    useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    carregarFoto();
  }, []);

  function mostrarMensagem(
    type: MessageType,
    title: string,
    text: string
  ) {
    setMessageCard({
      type,
      title,
      text,
    });
  }

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

      setMessageCard(null);

      if (!user) {

        mostrarMensagem(
          'error',
          'Erro',
          'Usuário não encontrado.'
        );

        return;
      }

      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {

        mostrarMensagem(
          'info',
          'Permissão necessária',
          'Permita o acesso à galeria para alterar sua foto.'
        );

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,
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

      mostrarMensagem(
        'success',
        'Sucesso',
        'Foto atualizada com sucesso!'
      );

    } catch (error: any) {

      console.log(
        'ERRO FOTO:',
        error.code,
        error.message,
        error.serverResponse
      );

      mostrarMensagem(
        'error',
        'Erro',
        'Não foi possível atualizar a foto.'
      );

    } finally {

      setLoadingFoto(false);
    }
  }

  async function confirmarSair() {

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

      setShowLogoutCard(false);

      mostrarMensagem(
        'error',
        'Erro',
        'Não foi possível sair da conta.'
      );
    }
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

          <Text style={styles.headerTitle}>
            Configurações
          </Text>

          <View style={{ width: 24 }} />

        </View>

        <View style={styles.body}>

          {messageCard && (

            <View
              style={[
                styles.messageCard,
                messageCard.type === 'success' &&
                  styles.messageSuccess,
                messageCard.type === 'error' &&
                  styles.messageError,
                messageCard.type === 'info' &&
                  styles.messageInfo,
              ]}
            >

              <View style={styles.messageLeft}>

                <Ionicons
                  name={
                    messageCard.type === 'success'
                      ? 'checkmark-circle'
                      : messageCard.type === 'error'
                      ? 'close-circle'
                      : 'information-circle'
                  }
                  size={24}
                  color={
                    messageCard.type === 'success'
                      ? '#2E9E5B'
                      : messageCard.type === 'error'
                      ? '#D9534F'
                      : '#214192'
                  }
                />

                <View style={styles.messageTexts}>

                  <Text style={styles.messageTitle}>
                    {messageCard.title}
                  </Text>

                  <Text style={styles.messageText}>
                    {messageCard.text}
                  </Text>

                </View>

              </View>

              <TouchableOpacity
                onPress={() =>
                  setMessageCard(null)
                }
              >

                <Ionicons
                  name="close"
                  size={20}
                  color="#555"
                />

              </TouchableOpacity>

            </View>
          )}

          {showLogoutCard && (

            <View style={styles.confirmCard}>

              <Ionicons
                name="log-out-outline"
                size={34}
                color="#D9534F"
              />

              <Text style={styles.confirmTitle}>
                Deseja realmente sair?
              </Text>

              <Text style={styles.confirmText}>
                Você será desconectado da sua conta.
              </Text>

              <View style={styles.confirmButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    setShowLogoutCard(false)
                  }
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.exitButton}
                  onPress={confirmarSair}
                >

                  <Text style={styles.exitButtonText}>
                    Sair
                  </Text>

                </TouchableOpacity>

              </View>

            </View>
          )}

          <View style={styles.profileContainer}>

            <View style={styles.avatar}>

              {fotoPerfil ? (

                <Image
                  source={{
                    uri: fotoPerfil,
                  }}
                  style={styles.avatarImage}
                />

              ) : (

                <Ionicons
                  name="person"
                  size={45}
                  color="#214192"
                />
              )}

              {loadingFoto && (

                <View style={styles.loadingAvatar}>

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
              style={styles.photoButton}
              onPress={alterarFoto}
              disabled={loadingFoto}
              activeOpacity={0.8}
            >

              <Ionicons
                name="camera-outline"
                size={18}
                color="#fff"
              />

              <Text style={styles.photoButtonText}>
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
              navigation.navigate('NovaSenha')
            }
          >

            <View style={styles.leftContent}>

              <View style={styles.iconContainer}>

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
            onPress={() =>
              setShowLogoutCard(true)
            }
          >

            <View style={styles.leftContent}>

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

              <Text style={styles.logoutText}>
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