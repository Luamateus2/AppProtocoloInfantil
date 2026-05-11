import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  doc,
  setDoc,
} from 'firebase/firestore';

import {
  db,
  auth,
} from '../../../services/firebaseConfig';

import { RootStackParamList } from '../../../routes/types';

import HeaderSecundario from '../../../components/HeaderSecundario';
import AppFooter from '../../../components/Footer/Footer';

import styles from './styles';

type NavProps =
  NativeStackNavigationProp<RootStackParamList>;

type RouteProps =
  RouteProp<RootStackParamList, 'IntraOperatorioG'>;

export default function IntraOperatorioG() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const pacienteId = route.params?.pacienteId;

  const [horarioInicio, setHorarioInicio] =
    useState('09:15');

  const [anestesia, setAnestesia] =
    useState('Geral Inalatória');

  const [viaAerea, setViaAerea] =
    useState('Máscara Laríngea');

  const [intercorrencias, setIntercorrencias] =
    useState('Nenhuma');

  const [observacoes, setObservacoes] =
    useState(
      'Procedimento sem intercorrências,\nvias aéreas mantidas pérvias.'
    );

  const [dropdownAberto, setDropdownAberto] =
    useState<string | null>(null);

  const anestesias = [
    'Geral Inalatória',
    'Geral Venosa',
    'Raquidiana',
    'Peridural',
    'Local',
  ];

  const viasAereas = [
    'Máscara Laríngea',
    'Tubo Orotraqueal',
    'Cânula Nasal',
    'Traqueostomia',
  ];

  const intercorrenciasOpcoes = [
    'Nenhuma',
    'Sangramento',
    'Hipotensão',
    'Hipertensão',
    'Broncoespasmo',
  ];

  async function salvarRegistro() {
    if (!pacienteId) {
      Alert.alert(
        'Erro',
        'ID do paciente não encontrado.'
      );
      return;
    }

    if (!auth.currentUser) {
      Alert.alert(
        'Erro',
        'Usuário não está logado.'
      );
      return;
    }

    try {
      const ref = doc(
        db,
        'intraOperatorio',
        pacienteId
      );

      await setDoc(
        ref,
        {
          usuarioId: auth.currentUser.uid,
          pacienteId,
          data: '12/03/2026',
          horarioInicio,
          anestesia,
          viaAerea,
          intercorrencias,
          observacoes,
        },
        {
          merge: true,
        }
      );

      navigation.navigate(
        'PosOperatorio',
        {
          pacienteId,
        }
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar o intra-operatório.'
      );
    }
  }

  function renderDropdown(
    tipo: string,
    valor: string,
    opcoes: string[],
    setValor: (value: string) => void
  ) {
    const aberto = dropdownAberto === tipo;

    return (
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.input}
          onPress={() =>
            setDropdownAberto(
              aberto ? null : tipo
            )
          }
        >
          <Text
            style={styles.inputText}
            numberOfLines={1}
          >
            {valor}
          </Text>

          <Ionicons
            name={
              aberto
                ? 'chevron-up'
                : 'chevron-down'
            }
            size={18}
            color="#214192"
          />
        </TouchableOpacity>

        {aberto && (
          <View style={styles.dropdown}>
            {opcoes.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => {
                  setValor(item);
                  setDropdownAberto(null);
                }}
              >
                <Text style={styles.optionText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#214192', '#4293D5']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView
        style={styles.safeArea}
        edges={['top']}
      >
        <HeaderSecundario
          title="Intra-Operatório"
          showBackButton
        />

        <View style={styles.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.scrollContent
            }
          >
            <View style={styles.date}>
              <Text style={styles.dateText}>
                12/03/2026
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Horário de Início
              </Text>

              <View style={styles.dropdownWrapper}>
                <View style={styles.input}>
                  <TextInput
                    value={horarioInicio}
                    onChangeText={
                      setHorarioInicio
                    }
                    style={styles.timeInput}
                    placeholder="00:00"
                    placeholderTextColor="#214192"
                  />

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color="#214192"
                  />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Anestesia
              </Text>

              {renderDropdown(
                'anestesia',
                anestesia,
                anestesias,
                setAnestesia
              )}
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Via Aérea
              </Text>

              {renderDropdown(
                'viaAerea',
                viaAerea,
                viasAereas,
                setViaAerea
              )}
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Intercorrências
              </Text>

              {renderDropdown(
                'intercorrencias',
                intercorrencias,
                intercorrenciasOpcoes,
                setIntercorrencias
              )}
            </View>

            <Text style={styles.observacoesLabel}>
              Observações
            </Text>

            <TextInput
              style={styles.textArea}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Procedimento sem intercorrências, vias aéreas mantidas pérvias."
              placeholderTextColor="#5E6D95"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={salvarRegistro}
            >
              <LinearGradient
                colors={['#3A7BD5', '#2A5298']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  Salvar Registro
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <AppFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}