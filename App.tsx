import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/routes";

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}