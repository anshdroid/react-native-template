import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigation from './LoginStackNavigation';
import AfterLoggedInRouter from './AfterLoggedInRouter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppConstants, Constants, STORAGE} from '../Configs/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/Store';
import WelcomeStackNavigation from './WelcomeStackNavigation';

export default function Navigator() {
  const isAuth = useSelector((state: RootState) => state.userReducer.isUserLoggedIn);

  const hasSeenIntroScreens = useSelector((state: RootState) => state.userReducer.hasSeenIntroScreens);

  return (
    <SafeAreaProvider>
      {/* NAVIGATOR CONTAINER WRAPPER */}
      <NavigationContainer ref={ref => (AppConstants.NavigatorRef = ref)}>
        {/* FOR WELCOME STACK FLOW */}
        {!hasSeenIntroScreens && !isAuth && <WelcomeStackNavigation />}

        {/* FOR LOGIN FLOW */}
        {!isAuth && hasSeenIntroScreens && <LoginStackNavigation />}

        {/* FOR LOGGED IN FLOW */}
        {isAuth && hasSeenIntroScreens && <AfterLoggedInRouter />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
