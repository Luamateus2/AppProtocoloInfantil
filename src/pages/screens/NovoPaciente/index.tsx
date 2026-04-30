import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';

const NovoPaciente: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [procedimento, setProcedimento] = useState('');
  const [comorbidades, setComorbidades] = useState('');
  const [observacoes, setObservacoes] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Novo Paciente</Text>

        <View style={styles.emptyView} />
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Dados do Paciente</Text>

          <Text style={styles.label}>Nome Completo</Text>
          <View style={styles.input} />

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 2 }]}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <View style={styles.input} />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
              <Text style={styles.label}>Idade</Text>
              <View style={styles.input} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>ASA</Text>
              <View style={styles.selectContainer}>
                <Text style={styles.selectText}>Selecione</Text>
                <Feather name="chevron-down" size={20} color="#999" />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
              <Text style={styles.label}>Peso (kg)</Text>
              <View style={styles.input} />
            </View>
          </View>

          <Text style={styles.label}>Procedimento</Text>
          <View style={styles.input} />

          <Text style={styles.label}>Comorbidades</Text>
          <View style={styles.input} />

          <Text style={styles.label}>Observações</Text>
          <View style={styles.textArea} />

          {/* BOTÕES */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCancel}>
              <Text style={styles.buttonCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSave}>
              <Text style={styles.buttonSaveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Feather name="home" size={24} color="#2D5DAF" />
        <Feather name="search" size={24} color="#FFF" />
        <Feather name="bell" size={24} color="#FFF" />
        <View style={styles.profileIconContainer}>
          <Feather name="user" size={20} color="#FFF" />
        </View>
      </View>
    </View>
  );
};

export default NovoPaciente;