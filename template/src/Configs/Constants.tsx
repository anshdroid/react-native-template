import DeviceInfo from 'react-native-device-info';
import {Dimensions, InteractionManager, LayoutAnimation, NativeModules, Platform, StyleSheet, UIManager, View} from 'react-native';
import React from 'react';
import { Colors } from '../Utils/Colors';

export class AppConstants {
  static safeAreaInsets = {bottom: 0, top: 0, right: 0, left: 0};
  static NavigatorRef = null;
  static SCREEN_WIDTH = Dimensions.get('screen').width;
}

export const PROJECT_TITLE = 'DS Template';

export const PRIVACY_POLICY = 'https://www.google.com';
export const TERMS_CONDITIONS = 'https://www.google.com';

const {PlatformConstants} = NativeModules;
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export class Constants {
  static isDeviceHasNotch = DeviceInfo.hasNotch();
  static deviceType = PlatformConstants.interfaceIdiom;
  static isLargeScreen = screenWidth >= 768;
  static isSmallScreen = screenWidth <= 400;
  static isiPad = screenWidth >= 768;
  static isIos = Platform.OS === 'ios';
  static isAndroid = Platform.OS === 'android';
}

export const STORAGE = {
  USER_DETAILS: 'USER_DETAILS',
  SEEN_WELCOME: 'SEEN_WELCOME',
  LANGUAGE: 'LANGUAGE',
};

export const LANGUAGES = [
  {
    slug: 'en',
    lang: 'English',
  },
  {
    slug: 'fr',
    lang: 'French',
  },
];

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const seperator = () => {
  return <View style={{marginVertical: 15, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray}} />;
};

export const layoutAnimationConfig = () => {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};

export const useInteractionManager = (callback: any, dependency?: any[]) => {
  React.useEffect(() => {
    InteractionManager.runAfterInteractions().then(() => {
      callback && callback();
    });
  }, dependency);
};

export const layoutAnimation = () => {
  LayoutAnimation.configureNext({
    duration: 300,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.linear,
    },
  });
};
