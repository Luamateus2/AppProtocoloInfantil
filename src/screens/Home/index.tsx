import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/types';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();

  const registros = [
    { id: '1', nome: 'João Silva', tipo: 'Intra-operatório', data: '12/03/2026', iniciais: 'JS' },
    { id: '2', nome: 'Maria Souza', tipo: 'Pós-operatório', data: '10/03/2026', iniciais: 'MS' },
  ];

  return (
    <LinearGradient colors={['#4A90E2', '#1E3C72']} style={{ flex: 1 }}>

      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoBox}>
              <Text>LOGO</Text>
            </View>

            <Text style={styles.headerText}>
              Input Text, Input Text
            </Text>

            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <ScrollView>

            {/* MENU */}
            <View style={styles.menuContainer}>
              {[
                { icon: 'people-outline', label: 'Pacientes' },
                { icon: 'add-circle-outline', label: 'Novo Cadastro' },
                { icon: 'document-text-outline', label: 'Protocolos' },
                { icon: 'time-outline', label: 'Histórico' },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuCard}
                  onPress={() => {
                    if (item.label === 'Novo Cadastro') {
                      navigation.navigate('NovoPaciente');
                    }
                  }}
                >
                  <Ionicons name={item.icon as any} size={26} color="#fff" />
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* LISTA */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Últimos Registros</Text>
              <Text style={styles.seeAll}>Ver Todos &gt;</Text>
            </View>

            <View style={styles.list}>
              {registros.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.initialCircle}>
                    <Text style={styles.initialText}>{item.iniciais}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.nome}</Text>
                    <Text style={styles.subtitle}>
                      {item.tipo} • {item.data}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

          </ScrollView>
        </View>

        {/* NAVBAR */}
        <SafeAreaView edges={['bottom']} style={styles.bottomWrapper}>
          <View style={styles.bottomTab}>
            {['home-outline', 'search-outline', 'person-outline'].map((icon, i) => (
              <Ionicons key={i} name={icon as any} size={22} color="#fff" />
            ))}
          </View>
        </SafeAreaView>

      </SafeAreaView>
    </LinearGradient>
  );
}