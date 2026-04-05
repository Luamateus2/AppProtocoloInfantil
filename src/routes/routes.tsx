import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; 
import SignUpScreen from "../pages/auth/SignUpScreen";
import SignInScreen from "../pages/auth/SignInScreen";
import HomeScreen from "../pages/screens/HomeScreen";
import ConfigsScreen from "../pages/screens/ConfigsScreen";
import Pacients from "../pages/screens/Pacients";
import HistoricoPacientes from "../pages/screens/HistoricoPacient";
import DetalhesPaciente from "../pages/screens/DetalhesPaciente";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Configuracoes" component={ConfigsScreen} />
      <Stack.Screen name="PacientsCad" component={Pacients} />
      <Stack.Screen name="HistoricoPacientes" component={HistoricoPacientes} />
      <Stack.Screen name="DetalhesPaciente" component={DetalhesPaciente} />
    </Stack.Navigator>
  );
}