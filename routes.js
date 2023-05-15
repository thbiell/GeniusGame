import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameScreen from "./src/pages/Game";
import HomeScreen from "./src/pages/Home";
import HistoricScreen from "./src/pages/Historic";
import LoginScreen from "./src/pages/Login";
import RegisterScreen from "./src/pages/Register";
const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen name={"Home"} component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name={"Game"} component={GameScreen} />
      <Stack.Screen name={"Historic"} component={HistoricScreen} />
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Register"} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
