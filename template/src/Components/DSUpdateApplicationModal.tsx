import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, Linking, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { Animated } from 'react-native';
import { Size } from '../Utils/FontSize';
import {shadow} from '../Utils/Shadows'

const appUrl = Platform.select({
  android: 'https://google.com',
  ios: 'https://google.com',
});

type Props = {
  udpateListnerType?: number;
};

const initialToast = {
  visible: false,
};

export const UpdateContext = React.createContext({});

const UpdateProvider = ({ children }: any) => {
  const [updateModal, setUpdateModal] = React.useState(initialToast);

  const show = React.useCallback(args => {
    setUpdateModal({ ...initialToast, visible: true });
  }, []);

  const hide = React.useCallback(() => {
    setUpdateModal({ ...updateModal, visible: false });
  }, [updateModal]);

  return (
    <UpdateContext.Provider
      value={{
        hide,
        show,
        updateModal,
      }}>
      {children}
    </UpdateContext.Provider>
  );
};

const Reminder = () => {
  return (
    <UpdateProvider>
      <UpdateReminder />
    </UpdateProvider>
  );
};

class StaticUpdate {
  static update: any = null;
}

const UpdateReminder: React.FC<Props> = ({}) => {
  const updateAnimation = React.useRef(new Animated.Value(0)).current;
  const { updateModal, hide, show }: any = React.useContext(UpdateContext);

  React.useEffect(() => {
    StaticUpdate.update = show;

    if (updateModal?.visible) {
      togglePopup(1);
    } else {
      togglePopup(0);
    }
  }, [updateModal]);

  const togglePopup = (toValue = 0) => {
    Animated.spring(updateAnimation, { toValue, useNativeDriver: true }).start();
  };

  const { height, width } = Dimensions.get('screen');

  const translateY = updateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        zIndex: 1,
        flex: 1,
        position: 'absolute',
        height,
        width,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SafeAreaView style={[style.container]}>
        <View style={{ flex: 1 }}>
          <FastImage style={{ height: responsiveHeight(20), marginTop: responsiveHeight(10), top: -responsiveHeight(20) }} resizeMode="contain" source={require('../Assets/Images/update.png')} />
        </View>
        <View>
          <Text style={[style.headingText]}>{'New Update Available!'}</Text>
          <Text style={style.subText}>{"We've released a new version of the app! To enjoy uninterrupted use and access the latest features, please upgrade now"}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(appUrl);
          }}
          activeOpacity={0.8}
          style={style.updateButton}>
          <Text style={style.btnText}>Update App</Text>
        </TouchableOpacity>

        <Text
          suppressHighlighting={true}
          onPress={() => hide()}
          style={[
            style.btnText,
            {
              color: '#000',
              fontFamily: Fonts.SemiBold,
              fontSize: Size.XS,
              paddingTop: 15,
              opacity: 0.4,
              paddingBottom: 15,
            },
          ]}>
          Not Now
        </Text>
      </SafeAreaView>
    </Animated.View>
  );
};

export const showUpdateModal = (showModal: boolean) => {
  StaticUpdate?.update({ visible: showModal });
};

export default Reminder;

const style = StyleSheet.create({
  container: {
    flex: 0.45,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 8,
    marginHorizontal: 15,
    ...shadow.s10
  },
  headingText: {
    fontSize: Size.L,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
    marginHorizontal: 15,
    color: Colors.textColor,
  },
  subText: {
    fontSize: Size.M,
    fontFamily: Fonts.Regular,
    opacity: 0.8,
    textAlign: 'center',
    color: Colors.mediumGray,
    paddingHorizontal: '7.6%',
    paddingTop: 10,
    lineHeight: 25
  },

  btnText: {
    fontFamily: Fonts.SemiBold,
    fontSize: Size.S,
    color: Colors.white,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  updateButton: {
    height: responsiveHeight(5),
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
    marginTop: 20,
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
    marginBottom: 0,
  },
});
