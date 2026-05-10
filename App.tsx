import React, {
  useEffect,
} from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import * as NavigationBar from 'expo-navigation-bar';

import Routes from './src/routes/routes';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {

    async function setupNavigationBar() {

      await NavigationBar.setVisibilityAsync(
        'hidden'
      );

      await NavigationBar.setBehaviorAsync(
        'overlay-swipe'
      );

      await NavigationBar.setBackgroundColorAsync(
        '#214192'
      );

      await NavigationBar.setButtonStyleAsync(
        'light'
      );
    }

    setupNavigationBar();

  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (

    <NavigationContainer>

      <Routes />

    </NavigationContainer>
  );
}