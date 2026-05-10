import React from 'react';

import {
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import styles from './styles';

export default function AppFooter() {

  const navigation = useNavigation<any>();

  const route = useRoute();

  const tabs = [
    {
      icon: 'home-outline',
      route: 'Home',
    },
    {
      icon: 'search-outline',
      route: 'Pacientes',
    },
    {
      icon: 'notifications-outline',
      route: 'Historico',
    },
    {
      icon: 'people-outline',
      route: 'NovoPaciente',
    },
  ];

  return (

    <SafeAreaView
      edges={['bottom']}
      style={styles.safeArea}
    >

      <View style={styles.container}>

        {tabs.map((tab) => {

          const active =
            route.name === tab.route;

          return (

            <TouchableOpacity
              key={tab.route}
              activeOpacity={0.85}
              style={styles.tabButton}
              onPress={() =>
                navigation.navigate(tab.route)
              }
            >

              <View
                style={[
                  styles.iconWrapper,

                  active &&
                    styles.activeWrapper,
                ]}
              >

                <Ionicons
                  name={tab.icon as any}
                  size={24}
                  color={
                    active
                      ? '#214192'
                      : '#FFFFFF'
                  }
                />

              </View>

            </TouchableOpacity>

          );
        })}

      </View>

    </SafeAreaView>

  );
}