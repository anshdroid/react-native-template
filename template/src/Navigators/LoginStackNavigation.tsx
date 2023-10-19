import React, {Component} from 'react';
import {CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators} from '@react-navigation/stack';
import {Colors} from '../Utils/Colors';
import AppWalkthrough from '../Containers/LoginContainer/AppWalkthrough';
import Login from '../Containers/LoginContainer/Login';
import ForgotPassword from '../Containers/LoginContainer/ForgotPassword';
import PasswordVerification from '../Containers/LoginContainer/PasswordVerification';
import Registration from '../Containers/RegisterContainer/Registration';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/Store';
import {RegistrationVerification} from '../Containers/RegisterContainer/RegistrationVerification';

const Stack = createStackNavigator();

//*** LOGIN DASHBOARD SCREENS ***//
export default function LoginStackNavigation() {
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
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen
        name={'PasswordVerification'}
        component={PasswordVerification}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name={'Registration'} component={Registration} />
      <Stack.Screen name={'RegistrationVerification'} component={RegistrationVerification} />
    </Stack.Navigator>
  );
}
