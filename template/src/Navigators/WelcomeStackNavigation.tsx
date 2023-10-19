import React, {Component} from 'react';
import {CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators} from '@react-navigation/stack';
import {Colors} from '../Utils/Colors';
import AppWalkthrough from '../Containers/LoginContainer/AppWalkthrough';
import Login from '../Containers/LoginContainer/Login';
const Stack = createStackNavigator();

//*** LOGIN DASHBOARD SCREENS ***//
export default function WelcomeStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: 'float',
        animationTypeForReplace: 'push',
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
      }}>
      <Stack.Screen name={'AppWalkthrough'} component={AppWalkthrough} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
