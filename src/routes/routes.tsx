import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; 
import Inicio from "../screens/Inicio";
import Login from "../screens/Auth/Login";
import Cadastro from "../screens/Auth/Cadastro";
import RecuperarSenha from "../screens/Auth/RecuperarSenha";
import ConfirmarEmail from "../screens/Auth/ConfirmarEmail";
import Home from "../screens/Home";
import NovoPaciente from "../screens/Patient/NovoPaciente";
import NovaSenha from "../screens/Auth/NovaSenha";
import Historico from "../screens/Patient/Historico";
import Pacientes from "../screens/Patient/Paciente";
import IntraOperatorioG from "../screens/Surgery/IntraOperatorioG";
import PreOperatorio from "../screens/Surgery/PreOperatorio";
import PosOperatorio from "../screens/Surgery/PosOperatorio";
import EditarPaciente from "../screens/Patient/EditarPaciente";
import EditarPreOperatorio from "../screens/Surgery/EditarPreOperatorio";
import EditarPosOperatorio from "../screens/Surgery/EditarPosOperatorio";
import EditarIntraOperatorio from "../screens/Surgery/EditarIntraOperatorio";
import Settings from "../screens/Settings";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Inicio">
      <Stack.Screen name = "Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name ="ConfirmarEmail" component={ConfirmarEmail}/>
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name = "Home" component={Home} />
      <Stack.Screen name = "NovoPaciente" component={NovoPaciente} />
      <Stack.Screen name = "NovaSenha" component={NovaSenha} />
      <Stack.Screen name = "Historico" component={Historico} />
      <Stack.Screen name = "Pacientes" component={Pacientes} />
      <Stack.Screen name= "PreOperatorio" component={PreOperatorio}/>
      <Stack.Screen name = "PosOperatorio" component={PosOperatorio}/>
      <Stack.Screen name = "IntraOperatorioG" component={IntraOperatorioG}/>
      <Stack.Screen name = "EditarPaciente" component={EditarPaciente}/>
      <Stack.Screen name = "EditarPosOperatorio" component={EditarPosOperatorio}/>
      <Stack.Screen name= "EditarPreOperatorio" component={EditarPreOperatorio}/>
      <Stack.Screen name= "EditarIntraOperatorio" component={EditarIntraOperatorio}/>

      <Stack.Screen name= "Settings" component={Settings}/>

    </Stack.Navigator>
  );
}