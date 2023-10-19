import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, DevSettings, Platform } from 'react-native';
import { Formik, FormikProps, FormikValues } from 'formik';
import { DSTextInputWithTitle } from '../../Components/DSTextInput';
import { EMAIL_VAL, PASSWORD_VAL } from '../../Utils/Validations';
import * as yup from 'yup';
import { Keys } from '../../Utils/Message';
import DSThemeButton from '../../Components/DSThemeButton';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Fonts } from '../../Utils/Fonts';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../Utils/Colors';
import { Size } from '../../Utils/FontSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { AppleLogin, FacebookLogin, GoogleLogin } from '../../Assets/Images';
import { useDispatch } from 'react-redux';
import { setUserLoggedInFlag } from '../../Store/Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE, layoutAnimationConfig } from '../../Configs/Constants';
import { NavigationScreenOptions, SocialLoginTypes } from '../../Utils/PropTypes';
import { CurrentNavigatorContext } from '../../Configs/Context';

export const STATIC_LOGO = 'https://i.pinimg.com/736x/21/ed/6a/21ed6af9fbf3f8a33d8048e2d8e60fea.jpg';
const formikRef = React.createRef<FormikProps<FormikValues>>();

/** MAIN FUNCTION */
const Login = ({ navigation }: NavigationScreenOptions) => {
  /** RESET FORM */
  useEffect(() => {
    layoutAnimationConfig();
    return () => {
      formikRef.current?.resetForm();
    };
  }, []);

  const { t } = useTranslation();

  const { setCurrentContext, currentValue } = useContext(CurrentNavigatorContext);
  console.log('currentValue: ', currentValue);

  const validationSchema = yup.object().shape({
    email: EMAIL_VAL(t('error:ValidEmail'), t('error:email')),
    password: PASSWORD_VAL(t('error:PasswordLength'), t('error:password')),
  });

  const [rememberMe, setRemember] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  /**
   *
   * @param { Submitted positive values } values
   */
  const handleSubmit = (values: any) => {
    console.log('::::::::::::values:::::::::: ', values);
    AsyncStorage.setItem(STORAGE.USER_DETAILS, JSON.stringify(values));
    dispatch(setUserLoggedInFlag(true));
  };

  /** FORM CONTENT */
  const renderFormContent = useMemo(() => {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          handleSubmit(values);
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}>
        {formikProps => (
          <View style={{ marginTop: 20 }}>
            {/* EMAIL */}
            <DSTextInputWithTitle title={t('placeholder:email')} placeholder={t('placeholder:enterEmail')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.email, text)} value={formikProps.values.email} error={formikProps.touched[`${Keys.email}`] && formikProps.errors[`${Keys.email}`]} keyboardType="email-address" />

            {/* PASSWORD */}
            <DSTextInputWithTitle isPassword title={t('placeholder:password')} placeholder={t('placeholder:enterPassword')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.password, text)} value={formikProps.values.password} error={formikProps.touched[`${Keys.password}`] && formikProps.errors[`${Keys.password}`]} />
          </View>
        )}
      </Formik>
    );
  }, []);

  /** REMEMBER ME EVENT */
  const onRememberMeEvent = () => {
    setRemember(!rememberMe);
  };

  /** TO FORGOT PASSWORD */
  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  /** BOTTOM VIEW */
  const renderBottomView = useMemo(() => {
    return (
      <View style={styles.bottomView}>
        {/* REMEMBER ME */}
        <TouchableOpacity onPress={onRememberMeEvent} activeOpacity={0.8} style={styles.rememberMe}>
          <MaterialCommunityIcons color={rememberMe ? Colors.primary : Colors.mildBlack} size={Size.L * 1.3} name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'} />
          <Text style={{ fontSize: Size.S, color: Colors.mildBlack }}>{t('LogIn:rememberMe')}</Text>
        </TouchableOpacity>

        {/* FORGOT PASSWORD */}
        <Text onPress={navigateToForgotPassword} suppressHighlighting={true} style={{ fontSize: Size.S, color: Colors.primary }}>
          {t('LogIn:forgotPassword')}
        </Text>
      </View>
    );
  }, [rememberMe]);

  /**
   *
   * @param { Type of social media login } type
   */
  const onSocialLogin = ({ type }: SocialLoginTypes) => {
    setCurrentContext(type);
  };

  /** SOCIAL VIEW */
  const renderSocialView = useMemo(() => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 30, marginVertical: responsiveHeight(5) }}>
        {/* FACEBOOK */}
        <FacebookLogin onPress={() => onSocialLogin({ type: 'facebook' })} />

        {/* GOOGLE */}
        <GoogleLogin onPress={() => onSocialLogin({ type: 'google' })} />

        {/* APPLE */}
        <AppleLogin onPress={() => onSocialLogin({ type: 'apple' })} />
      </View>
    );
  }, []);

  /** REGISTRATION SCREEN NAVIGATION */
  const navigateToRegistration = () => {
    navigation.navigate('Registration');
  };

  /** NO ACCOUNT */
  const noAccountView = useMemo(() => {
    return (
      <View style={{}}>
        <Text suppressHighlighting onPress={navigateToRegistration} style={styles.dontHave}>
          {t('LogIn:dontHaveAccount')}
          <Text suppressHighlighting onPress={navigateToRegistration} style={styles.createAccount}>
            {t('LogIn:createAccount')}
          </Text>
        </Text>
      </View>
    );
  }, []);

  /** MAIN RETURN */
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', flex: 1 }} style={styles.keyboardView}>
        <View style={styles.titleView}>
          {/* SIGN IN TITLE */}
          <Text style={styles.titleText}>{t('LogIn:welcomeBack')}</Text>
        </View>

        {/* SIGN IN MESSAGE */}
        <Text style={styles.messageText}>{t('LogIn:message')}</Text>

        {/* FORM */}
        {renderFormContent}

        {/* BOOTOM VIEW */}
        {renderBottomView}

        {/* SUBMIT THEME BUTTON */}
        <DSThemeButton
          buttonStyle={{ marginTop: 30 }}
          title={t('LogIn:title').toUpperCase()}
          onPress={() => {
            formikRef.current && formikRef.current?.handleSubmit();
          }}
        />

        {/* SOCIAL VIEW */}
        {renderSocialView}
      </KeyboardAwareScrollView>

      {/* NO ACCOUNT VIEW */}
      {noAccountView}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  titleText: { fontFamily: Fonts.Bold, fontSize: Size.XL, color: Colors.black },
  messageText: { fontFamily: Fonts.SemiBold, fontSize: Size.M, color: Colors.mildBlack },
  bottomView: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  rememberMe: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  dontHave: { alignSelf: 'center', marginVertical: 10, fontFamily: Fonts.Regular, fontSize: Size.S, color: Colors.mildBlack },
  createAccount: { alignSelf: 'center', marginVertical: 10, fontFamily: Fonts.Regular, fontSize: Size.S, color: Colors.primary, textDecorationLine: 'underline' },
  titleView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  safeAreaStyle: { flex: 1, backgroundColor: Colors.white },
  keyboardView: { flex: 1, paddingHorizontal: 15, backgroundColor: Colors.white },
});
