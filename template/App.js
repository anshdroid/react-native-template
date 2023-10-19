/**
 * Created By: DS Himanshu Rathore
 * Date: June 03, 2022
 */
import React, { Component, useEffect, useState } from 'react';
import Navigator from './src/Navigators/Navigator';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppConstants, STORAGE } from './src/Configs/Constants';
import DSCommonToast from './src/Components/DSCommonToast';
import DSUpdateApplicationModal, { UpdateContext, showUpdateModal } from './src/Components/DSUpdateApplicationModal';
import SplashScreen from 'react-native-splash-screen';
import { store } from './src/Store/Store';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSeenIntroScreens, setUserLoggedInFlag, setCurrentLanguage } from './src/Store/Reducer';
import i18n from './src/Locales/i18n';
import { CurrentNavigatorContext } from './src/Configs/Context';
import DSActionSheet from './src/Components/DSActionSheet';
import VersionCheck from 'react-native-version-check';
import { Platform } from 'react-native';
import deviceInfo from 'react-native-device-info';

/** SETS APP INSETS */
const SetInsets = () => {
  AppConstants.safeAreaInsets = useSafeAreaInsets();
  return null;
};

const App = () => {
  /** COMPONENT DID MOUNT */
  useEffect(() => {
    if (!__DEV__) checkVersionManager();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const checkVersionManager = () => {
    VersionCheck.getLatestVersion({
      provider: Platform.OS == 'ios' ? 'appStore' : 'playStore',
    }).then(latestVersion => {
      let deviceVersion = deviceInfo.getVersion();
      if (deviceVersion !== undefined && latestVersion !== undefined && (deviceVersion < latestVersion || deviceVersion !== latestVersion)) {
        showUpdateModal(true);
      }
    });
  };

  const [currentContextVariable, setCurrentContextVariable] = useState('');

  const contextProvider = {
    currentValue: currentContextVariable,
    setCurrentContext: value => {
      setCurrentContextVariable(value);
    },
  };

  useEffect(() => {
    AsyncStorage.multiGet([STORAGE.SEEN_WELCOME, STORAGE.USER_DETAILS, STORAGE.LANGUAGE]).then(sessions => {
      // USER DETAILS
      if (sessions[1][1] && sessions[1][1]) {
        store.dispatch(setUserLoggedInFlag(true));
      }

      // WELCOME SCREENS
      if (sessions[0][1] && sessions[0][1] == '1') {
        store.dispatch(setSeenIntroScreens(true));
      }

      // LAUNGAAGES
      if (sessions[2][1]) {
        store.dispatch(setCurrentLanguage(sessions[2][1] ?? 'en'));
        i18n.changeLanguage(sessions[2][1]);
      }
    });
  }, []);

  /** RENDER */
  return (
    <CurrentNavigatorContext.Provider value={contextProvider}>
      <Provider store={store}>
        <SafeAreaProvider>
          {/* TOAST MESSAGE */}
          <DSCommonToast />

          {/* ACTION SHEET */}
          <DSActionSheet />

          {/* UPDATE MODAL */}
          <DSUpdateApplicationModal />

          {/* MAIN NAVIGATOR */}
          <Navigator />

          {/* SET SAFE AREA INSETS */}
          <SetInsets />
        </SafeAreaProvider>
      </Provider>
    </CurrentNavigatorContext.Provider>
  );
};

export default App;
