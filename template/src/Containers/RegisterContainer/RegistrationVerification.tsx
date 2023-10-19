import { Alert, Keyboard, Modal, ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Animated, NativeModules, SafeAreaView } from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import DSThemeButton from '../../Components/DSThemeButton';
import { Colors } from '../../Utils/Colors';
import { Fonts } from '../../Utils/Fonts';
import { Size } from '../../Utils/FontSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { t } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../Configs/Constants';
import { setUserLoggedInFlag } from '../../Store/Reducer';
import { useDispatch } from 'react-redux';
import { showErrorMessage } from '../../Components/DSCommonToast';

const RANGE = 6;
const TIMER_RANGE = 30;

export const RegistrationVerification = ({ navigation, route }) => {
  const input_ref = React.useRef<any>(null);

  const timeRef = React.useRef<any>(null);

  const dispatch = useDispatch();

  const [otp, setOtp] = useState({});
  const [active_index, setActiveIndex] = useState<any>(undefined);
  const [timer, setTimer] = useState<any>(TIMER_RANGE);
  const [btn_enable, setBtnEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const animationsScale = [...new Array(RANGE)].map(() => new Animated.Value(1));

  useEffect(() => {
    setTimer(TIMER_RANGE);
    timeRef.current = setInterval(() => {
      timerFunction();
    }, 1000);

    return () => clearInterval(timeRef.current);
  }, []);

  /** START TIMER WHEN OTP IS SENT */
  const timerFunction = () => {
    setTimer(prevState => {
      if (prevState == 0) {
        clearInterval(timeRef.current);
        return 0;
      } else return prevState - 1;
    });
  };

  /** CLICK ON CODE INPOUT */
  const onClickView = (position: any) => {
    setActiveIndex(position);
    setTimeout(() => {
      input_ref.current.focus();
    }, 100);
  };

  const onKeyPress = ({ nativeEvent }: any) => {
    const { key } = nativeEvent;
    const prev = { ...otp };

    // Call when add value
    if (active_index < RANGE) {
      if (key.length == 1) {
        prev[active_index + 'OTP'] = key;
        setOtp(prev);
        setActiveIndex(active_index + 1);
        if (active_index + 1 == RANGE) Keyboard.dismiss();
      }
    } else {
      Keyboard.dismiss();
    }

    // Call when Remove value
    if (key == 'Backspace') {
      prev[active_index + 'OTP'] = undefined;
      if (active_index == 0) {
        setOtp(prev);
        return;
      }
      setActiveIndex(active_index - 1);
      setOtp(prev);
      return;
    }
  };

  /**
   *
   * @param { Submitted positive values } values
   */
  const handleSubmit = (values: any) => {
    console.log('::::::::::::values:::::::::: ', values);
    AsyncStorage.setItem(STORAGE.USER_DETAILS, JSON.stringify(values));
    dispatch(setUserLoggedInFlag(true));
  };

  /** SUBMIT CODE */
  const onSubmitVerificationCode = () => {
    let code = '';
    new Array(RANGE).fill(1).map((_, key) => {
      if (otp[key + 'OTP']) {
        code += otp[key + 'OTP'];
      }
      return otp[key + 'OTP'];
    });
    if (code.toString().length == RANGE) {
      clearInterval(timeRef.current);
      handleSubmit(route.params.values);
      return code;
    } else {
      showErrorMessage('Verification', 'Please enter valid verification code');
    }
  };

  /** TEXT CHANGES */
  const onTextInput = (event: any) => {
    if (event.nativeEvent.text && event.nativeEvent.text >= 0 && event.nativeEvent.text <= 9) {
      onKeyPress({ nativeEvent: { key: event.nativeEvent.text } });
    } else if (event.nativeEvent.text == '') {
      onKeyPress({ nativeEvent: { key: 'Backspace' } });
    }
  };

  /** RESEND OTP */
  const _resendOtp = () => {
    setTimer(TIMER_RANGE);
    timeRef.current = setInterval(() => {
      timerFunction();
    }, 1000);
  };

  /** BOX VIEW  */
  const OptViewer = ({ value = undefined, isActive, onPress }: any) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.otpBoxView, { borderColor: isActive || value ? Colors.primary : Colors?.inActive }]}>
          <Text allowFontScaling={false} style={[styles.otpText, { color: Colors.mildBlack, opacity: value ? 1 : 0.15 }]}>
            {value ? value : '-'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /** INPUT TEXT FOR CODE */
  const _otpInput = () => {
    return (
      <View style={styles.inputStyle}>
        {/* FIELDS ARR */}
        {new Array(RANGE).fill(1).map((item, key) => (
          <OptViewer animationsScale={animationsScale} key={key.toString()} value={otp[key + 'OTP']} onPress={() => onClickView(key)} isActive={active_index == key} activeIndex={key} />
        ))}
        <TextInput ref={input_ref} onTextInput={e => onTextInput(e)} allowFontScaling={false} keyboardType="numeric" style={{ height: 0, width: 0 }} />
      </View>
    );
  };

  /** CLOSE SCREEN */
  const OnCloseEvent = () => {
    navigation.goBack();
  };

  /** NO ACCOUNT */
  const enterEmailAgainView = () => {
    return (
      <View style={{}}>
        <Text suppressHighlighting onPress={OnCloseEvent} style={styles.dontHave}>
          {t('ForgotPassword:wrongEmail')}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* AWARE SCROLL VIEW */}
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        {/* MAION VIEW */}
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          {/* TITLE  */}
          <Text style={styles.title}>{t('SignUp:Verification')}</Text>

          {/* SUBTITLE */}
          <Text style={styles.subTitle}>{t('ForgotPassword:nextMessage', { email: route?.params?.values?.email ?? '' })}</Text>

          {/* INPUT FIELDS */}
          {_otpInput()}

          {/* RESEND VIEW */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.textStyle}>{t('SignUp:timer', { timer: timer })}</Text>
            <Text suppressHighlighting onPress={() => timer == 0 && _resendOtp()} style={[styles.textStyle, { textDecorationLine: 'underline', color: timer == 0 ? Colors.black : Colors.inActive }]}>
              {t('SignUp:resend').toUpperCase()}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* AGAIN ENTER EMAIL */}
      {enterEmailAgainView()}

      {/* CONTINUE BTN */}
      <DSThemeButton buttonStyle={{ marginBottom: 15 }} title={t('general:submit').toUpperCase()} onPress={onSubmitVerificationCode} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Size.XL * 1.5,
    alignSelf: 'flex-start',
    marginVertical: 20,
  },
  subTitle: {
    color: Colors.mildBlack,
    fontFamily: Fonts.Medium,
    fontSize: Size.M,
    marginVertical: 20,
    textAlign: 'left',
  },
  inputStyle: {
    height: 50,
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-around',
  },
  dontHave: { alignSelf: 'center', marginVertical: 10, fontFamily: Fonts.Regular, fontSize: Size.S, color: Colors.mildBlack },
  otpBoxView: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  otpText: {
    fontWeight: 'bold',
    fontSize: Size.XL * 1.5,
  },
  textStyle: {
    color: Colors.mildBlack,
    fontFamily: Fonts.Medium,
    fontSize: Size.S,
    marginVertical: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
