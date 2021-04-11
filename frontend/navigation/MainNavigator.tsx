import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

export type MainParamList = {
  Home: undefined,
  SignIn: undefined,
  SignUp: undefined,
  Garden: undefined,
  EditGarden: undefined,
  AddProduce: undefined
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
        component={NotFoundScreen}
      />
      <Main.Screen
        name="SignUp"
        component={NotFoundScreen}
      />
      <Main.Screen
        name="Garden"
        component={NotFoundScreen}
      />
      <Main.Screen
        name="EditGarden"
        component={NotFoundScreen}
      />
      <Main.Screen
        name="AddProduce"
        component={NotFoundScreen}
      />
    </Main.Navigator>
  );
}

