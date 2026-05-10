import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

type Props = {
  title: string;
  showBackButton?: boolean;
};

export default function Header({
  title,
  showBackButton = true,
}: Props) {
  const navigation =
    useNavigation();

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="arrow-undo-outline"             
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      ) : (
        <View
          style={styles.sideSpace}
        />
      )}

      <Text style={styles.title}>
        {title}
      </Text>

      <View
        style={styles.sideSpace}
      />
    </View>
  );
}