import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';

import {
  Users,
  PlusCircle,
  ClipboardCheck,
  History,
  Home as HomeIcon,
  Search,
  Bell,
  UserCircle
} from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../routes/types';
import { styles } from './styles';

type NavProps = NativeStackNavigationProp<RootStackParamList>;

interface Registro {
  id: string;
  nome: string;
  status: string;
  data: string;
  iniciais: string;
}

const DATA: Registro[] = [
  { id: '1', nome: 'João Silva', status: 'Intra-operatório', data: '12/03/2026', iniciais: 'JS' },
  { id: '2', nome: 'Maria Souza', status: 'Pós-operatório', data: '10/03/2026', iniciais: 'MS' },
  { id: '3', nome: 'Pedro Carlos', status: 'Pré-operatório', data: '14/03/2026', iniciais: 'PC' },
  { id: '4', nome: 'Lucas Santos', status: 'Pré-operatório', data: '17/03/2026', iniciais: 'LS' },
];

export default function Home() {
  const navigation = useNavigation<NavProps>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>

          <Text style={styles.headerTitle}>
            Input Text, Input Text, Input Text
          </Text>

          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.actionGrid}>
          <ActionItem icon={<Users color="#FFF" size={24} />} label="Pacientes" />

          {/* 👉 AQUI ESTÁ O CLIQUE PARA NOVO PACIENTE */}
          <ActionItem
            icon={<PlusCircle color="#FFF" size={24} />}
            label="Novo Cadastro"
            onPress={() => navigation.navigate('NovoPaciente')}
          />

          <ActionItem icon={<ClipboardCheck color="#FFF" size={24} />} label="Protocolos" />
          <ActionItem icon={<History color="#FFF" size={24} />} label="Histórico" />
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Últimos Registros</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Ver Todos {'>'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {DATA.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarCircleText}>
                  {item.iniciais}
                </Text>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.patientName}>{item.nome}</Text>
                <Text style={styles.patientStatus}>
                  {item.status} • {item.data}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <HomeIcon color="#1e40af" size={26} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Search color="#FFF" size={26} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Bell color="#FFF" size={26} />
        </TouchableOpacity>

        <TouchableOpacity>
          <UserCircle color="#FFF" size={26} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* COMPONENTE DOS BOTÕES */
const ActionItem = ({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);