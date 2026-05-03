import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/types';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'NovaSenha'>;

export default function NovaSenha() {
  const navigation = useNavigation<NavProps>();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text>LOGO</Text>
        </View>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>Criar Nova senha</Text>

        <Text style={styles.subtitle}>
          Crie uma senha forte para manter sua conta protegida.
          Depois é só confirmar e voltar ao aplicativo.
        </Text>

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirmar senha"
          secureTextEntry
          style={styles.input}
        />

        {/* REGRAS */}
        <View style={styles.requisitos}>
          <Text style={styles.requisito}>• Mínimo de 8 caracteres</Text>
          <Text style={styles.requisito}>• Uma letra maiúscula</Text>
          <Text style={styles.requisito}>• Uma letra minúscula</Text>
          <Text style={styles.requisito}>• Um número</Text>
          <Text style={styles.requisito}>• Um caractere especial (!@#$...)</Text>
        </View>

        {/* BOTÕES */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#4A90E2', '#1E3C72']}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Salvar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}