import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; 
import Inicio from "../../src/pages/screens/Inicio";
import Login from "../../src/pages/screens/Login";
import Cadastro from "../../src/pages/screens/Cadastro";
import RecuperarSenha from "../../src/pages/screens/RecuperarSenha";
import Home from "../../src/pages/screens/Home";
import NovoPaciente from "../../src/pages/screens/NovoPaciente";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Inicio">
      <Stack.Screen name = "Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name = "Home" component={Home} />
      <Stack.Screen name = "NovoPaciente" component={NovoPaciente} />
    </Stack.Navigator>
  );
}