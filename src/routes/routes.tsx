import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; 
import Inicio from "../screens/Inicio";
import Login from "../screens/Auth/Login";
import Cadastro from "../screens/Auth/Cadastro";
import RecuperarSenha from "../screens/Auth/RecuperarSenha";
import Home from "../screens/Home";
import NovoPaciente from "../screens/Patient/NovoPaciente";
import NovaSenha from "../screens/Auth/NovaSenha";
import Historico from "../screens/Patient/Historico";
import Pacientes from "../screens/Patient/Paciente";

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
      <Stack.Screen name = "NovaSenha" component={NovaSenha} />
      <Stack.Screen name = "Historico" component={Historico} />
      <Stack.Screen name = "Pacientes" component={Pacientes} />
    </Stack.Navigator>
  );
}