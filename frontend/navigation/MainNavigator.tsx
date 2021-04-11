import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import GardenScreen from '../screens/GardenScreen';
import EditGardenScreen from '../screens/EditGardenScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import AddProduceScreen from '../screens/AddProduceScreen';

export type MainParamList = {
  Home: undefined,
  SignIn: undefined,
  SignUp: undefined,
  Garden: {
    gardenProp: any
  },
  EditGarden: undefined,
  AddProduce: {
    gardenId: string
  }
}
const Main = createStackNavigator<MainParamList>();

export default function BottomTabNavigator() {
  return (
    <Main.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
    >
      <Main.Screen
        name="Home"
        component={HomeScreen}
      />
      <Main.Screen
        name="SignIn"
        component={SignInScreen}
      />
      <Main.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      <Main.Screen
        name="Garden"
        component={GardenScreen}
      />
      <Main.Screen
        name="EditGarden"
        component={EditGardenScreen}
      />
      <Main.Screen
        name="AddProduce"
        component={AddProduceScreen}
      />
    </Main.Navigator>
  );
}

