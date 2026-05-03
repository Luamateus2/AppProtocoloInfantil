import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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

import { RootStackParamList } from '../../routes/types';
import { styles } from './styles';
import { APP_TEXTS } from '../../constants/app';
type NavProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<NavProps>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.headerContent}>
            {APP_TEXTS.Title}
          </Text>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* ACTIONS (FORA DO HEADER VISUALMENTE) */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionGrid}>
          <ActionItem
            icon={<Users color="#FFF" size={22} />}
            label="Pacientes"
            onPress={() => navigation.navigate('Pacientes')}
          />

          <ActionItem
            icon={<PlusCircle color="#FFF" size={22} />}
            label="Novo Cadastro"
            onPress={() => navigation.navigate('NovoPaciente')}
          />

          <ActionItem
            icon={<ClipboardCheck color="#FFF" size={22} />}
            label="Protocolos"
          />

          <ActionItem
            icon={<History color="#FFF" size={22} />}
            label="Histórico"
            onPress={() => navigation.navigate('Historico')}
          />
        </View>
      </View>

      {/* CONTEÚDO */}
      <SafeAreaView style={styles.content} edges={['left', 'right']}>
        <Text style={styles.sectionTitle}>Últimos Registros</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.card}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarCircleText}>JS</Text>
              </View>

              <View>
                <Text style={styles.patientName}>João Silva</Text>
                <Text style={styles.patientStatus}>
                  Intra-operatório • 12/03/2026
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* FOOTER */}
      <View
        style={[
          styles.bottomNav,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity>
          <HomeIcon color="#FFF" size={24} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Search color="#FFF" size={24} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Bell color="#FFF" size={24} />
        </TouchableOpacity>

        <TouchableOpacity>
          <UserCircle color="#FFF" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    {icon}
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);