import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; 
import SignUpScreen from "../pages/auth/SignUpScreen";
import SignInScreen from "../pages/auth/SignInScreen";
import HomeScreen from "../pages/screens/HomeScreen";
import PatientsScreen from "../pages/screens/PatientsScreen";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Patients" component={PatientsScreen} />
    </Stack.Navigator>
  );
}