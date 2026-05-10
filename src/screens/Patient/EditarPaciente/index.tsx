import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from '../../../services/firebaseConfig';

import {
  RootStackParamList,
} from '../../../routes/types';

import AppFooter from '../../../components/Footer/Footer';
import Header from '../../../components/HeaderSecundario';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<
    RootStackParamList,
    'EditarPaciente'
  >;

type RouteProps =
  RouteProp<RootStackParamList, 'EditarPaciente'>;

export default function EditarPaciente() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { pacienteId } = route.params;

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idade, setIdade] = useState('');
  const [asa, setAsa] = useState('');
  const [peso, setPeso] = useState('');
  const [procedimento, setProcedimento] = useState('');
  const [comorbidade, setComorbidade] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [loadingData, setLoadingData] = useState(true);

  async function carregarPaciente() {
    try {
      const ref = doc(db, 'pacientes', pacienteId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        Alert.alert('Erro', 'Paciente não encontrado');
        navigation.goBack();
        return;
      }

      const data = snap.data();

      setNomeCompleto(data.nomeCompleto || '');
      setDataNascimento(data.dataNascimento || '');
      setIdade(data.idade || '');
      setAsa(data.asa || '');
      setPeso(data.peso || '');
      setProcedimento(data.procedimento || '');
      setComorbidade(data.comorbidade || '');
      setObservacoes(data.observacoes || '');

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Falha ao carregar paciente');
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    carregarPaciente();
  }, []);

  // ✅ AGORA NÃO SALVA, SÓ AVANÇA
  function continuar() {
    navigation.navigate('EditarPreOperatorio', {
      pacienteId,
      pacienteEditado: {
        nomeCompleto,
        dataNascimento,
        idade,
        asa,
        peso,
        procedimento,
        comorbidade,
        observacoes,
      },
    });
  }

  if (loadingData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#214192" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#214192', '#4293D5']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        <Header title="Editar Paciente" />

        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

            <Text style={styles.sectionTitle}>
              Editar Dados do Paciente
            </Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.input} value={nomeCompleto} onChangeText={setNomeCompleto} />

            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} />

            <Text style={styles.label}>Idade</Text>
            <TextInput style={styles.input} value={idade} onChangeText={setIdade} />

            <Text style={styles.label}>ASA</Text>
            <TextInput style={styles.input} value={asa} onChangeText={setAsa} />

            <Text style={styles.label}>Peso</Text>
            <TextInput style={styles.input} value={peso} onChangeText={setPeso} />

            <Text style={styles.label}>Procedimento</Text>
            <TextInput style={styles.input} value={procedimento} onChangeText={setProcedimento} />

            <Text style={styles.label}>Comorbidade</Text>
            <TextInput style={styles.input} value={comorbidade} onChangeText={setComorbidade} />

            <Text style={styles.label}>Observações</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
            />

            {/* BOTÃO AGORA É "CONTINUAR" */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={continuar}
            >
              <Text style={styles.saveText}>
                Continuar
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>

        <AppFooter />

      </SafeAreaView>
    </LinearGradient>
  );
}