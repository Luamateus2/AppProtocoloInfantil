import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';
import { Image } from 'react-native';

import { voltarIcon } from '../../constants/images';

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
          <Image
            source={voltarIcon.logo}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
            }}
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