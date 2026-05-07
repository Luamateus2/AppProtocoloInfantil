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

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();

  const registros = [
    {
      id: '1',
      nome: 'João Silva',
      tipo: 'Intra-operatório',
      data: '12/03/2026',
      iniciais: 'JS',
    },
    {
      id: '2',
      nome: 'Maria Souza',
      tipo: 'Pós-operatório',
      data: '10/03/2026',
      iniciais: 'MS',
    },
    {
      id: '3',
      nome: 'Pedro Carlos',
      tipo: 'Pré-operatório',
      data: '14/03/2026',
      iniciais: 'PC',
    },
    {
      id: '4',
      nome: 'Lucas Santos',
      tipo: 'Pré-operatório',
      data: '17/03/2026',
      iniciais: 'LS',
    },
  ];

  const menu = [
    {
      icon: 'people-outline',
      label: 'Pacientes',
    },
    {
      icon: 'add-outline',
      label: 'Novo\nCadastro',
    },
    {
      icon: 'clipboard-outline',
      label: 'Protocolos',
    },
    {
      icon: 'time-outline',
      label: 'Histórico',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* HEADER */}
      <LinearGradient
        colors={['#4D9FFF', '#2346A0']}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={['top']}>

          <View style={styles.header}>

            <View style={styles.logoBox}>
              <Text style={styles.logoText}>LOGO</Text>
            </View>

            <Text style={styles.headerText}>
              Input Text, Input Text, Input Text,
            </Text>

            <Image
              source={{
                uri: 'https://i.pravatar.cc/150?img=12',
              }}
              style={styles.avatar}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* BODY */}
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >

          {/* MENU */}
          <View style={styles.menuContainer}>
            {menu.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={styles.menuCard}
                onPress={() => {
                  if (item.label.includes('Novo')) {
                    navigation.navigate('NovoPaciente');
                  }
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color="#FFFFFF"
                />

                <Text style={styles.menuText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* TITULO */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Últimos Registros
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>
                Ver Todos &gt;
              </Text>
            </TouchableOpacity>
          </View>

          {/* LISTA */}
          <View style={styles.list}>
            {registros.map((item) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.id}
                style={styles.card}
              >

                <View style={styles.initialCircle}>
                  <Text style={styles.initialText}>
                    {item.iniciais}
                  </Text>
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.name}>
                    {item.nome}
                  </Text>

                  <Text style={styles.subtitle}>
                    {item.tipo} • {item.data}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </View>

      {/* BOTTOM TAB */}
      <SafeAreaView
        edges={['bottom']}
        style={styles.footerSafe}
      >
        <LinearGradient
          colors={['#3563C7', '#2346A0']}
          style={styles.bottomTab}
        >

          <TouchableOpacity style={styles.tabButtonActive}>
            <Ionicons
              name="home-outline"
              size={24}
              color="#2346A0"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton}>
            <Ionicons
              name="search-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton}>
            <Ionicons
              name="people-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}