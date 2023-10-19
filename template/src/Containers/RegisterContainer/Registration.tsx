import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { Formik, FormikProps, FormikValues } from 'formik';
import { DSTextInputWithTitle } from '../../Components/DSTextInput';
import { EMAIL_VAL, MOBILE_VAL, PASSWORD_VAL, REQUIRE_VAL } from '../../Utils/Validations';
import * as yup from 'yup';
import { Keys } from '../../Utils/Message';
import DSThemeButton from '../../Components/DSThemeButton';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';
import { Fonts } from '../../Utils/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Utils/Colors';
import { Size } from '../../Utils/FontSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSSR, useTranslation } from 'react-i18next';
import { shadow } from '../../Utils/Shadows';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppConstants, Constants, PRIVACY_POLICY, TERMS_CONDITIONS } from '../../Configs/Constants';
import { NavigationScreenOptions } from '../../Utils/PropTypes';
import { showErrorMessage } from '../../Components/DSCommonToast';

const formikRef = React.createRef<FormikProps<FormikValues>>();

/** MAIN FUNCTION */
const Registration = ({ navigation }: NavigationScreenOptions) => {
  const [isPolicyCheck, setCheckPolicy] = useState(false);

  /** RESET FORM */
  useEffect(() => {
    return () => {
      formikRef.current?.resetForm();
    };
  }, []);

  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    name: REQUIRE_VAL(t('error:ValidName')),
    mobile: MOBILE_VAL(t('error:PhoneNumber'), t('error:Mobile')),
    email: EMAIL_VAL(t('error:ValidEmail'), t('error:email')),
    password: PASSWORD_VAL(t('error:PasswordLength'), t('error:password')),
  });

  //CLICK ON LOGIN BUTTON
  const handleSubmit = (values: any) => {
    if (!isPolicyCheck) {
      showErrorMessage('Registration', 'Please agree to privacy policy and terms & conditions');
      return;
    }
    console.log('::::::::::::values:::::::::: ', values);
    navigation.navigate('RegistrationVerification', { values });
  };

  /** FORM CONTENT */
  const renderFormContent = useMemo(() => {
    return (
      <Formik
        initialValues={{ name: '', mobile: '', email: '', password: '' }}
        onSubmit={values => {
          handleSubmit(values);
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}>
        {formikProps => (
          <View style={{ marginTop: AppConstants.safeAreaInsets.top * 0.5 }}>
            {/* NAME */}
            <DSTextInputWithTitle
              title={t('placeholder:name')}
              placeholder={t('placeholder:enterName')}
              onChangeText={(text: any) => {
                formikProps.setFieldValue(Keys.name, text);
              }}
              value={formikProps.values.name}
              error={formikProps.touched[`${Keys.name}`] && formikProps.errors[`${Keys.name}`]}
            />

            {/* MOBILE NUMBER */}
            <DSTextInputWithTitle
              title={t('placeholder:mobile')}
              placeholder={t('placeholder:enterMobile')}
              onChangeText={(text: any) => {
                formikProps.setFieldValue(Keys.mobile, text);
              }}
              value={formikProps.values.mobile}
              error={formikProps.touched[`${Keys.mobile}`] && formikProps.errors[`${Keys.mobile}`]}
            />

            {/* EMAIL */}
            <DSTextInputWithTitle
              title={t('placeholder:email')}
              placeholder={t('placeholder:enterEmail')}
              onChangeText={(text: any) => {
                formikProps.setFieldValue(Keys.email, text);
              }}
              value={formikProps.values.email}
              error={formikProps.touched[`${Keys.email}`] && formikProps.errors[`${Keys.email}`]}
              keyboardType="email-address"
            />

            {/* PASSWORD */}
            <DSTextInputWithTitle
              isPassword
              title={t('placeholder:password')}
              placeholder={t('placeholder:enterPassword')}
              onChangeText={(text: any) => {
                formikProps.setFieldValue(Keys.password, text);
              }}
              value={formikProps.values.password}
              error={formikProps.touched[`${Keys.password}`] && formikProps.errors[`${Keys.password}`]}
            />

            {/* REGISTER BUTTON */}
            {renderRegisterButton(formikProps.handleSubmit)}
          </View>
        )}
      </Formik>
    );
  }, [isPolicyCheck]);

  /** REGISTER BUTTON */
  const renderRegisterButton = onPress => {
    return <DSThemeButton buttonStyle={{ marginTop: 30 }} title={t('SignUp:title').toUpperCase()} onPress={() => onPress()} />;
  };

  /** REGISTRATION SCREEN NAVIGATION */
  const navigateToLogin = () => {
    navigation.goBack();
  };

  /** NO ACCOUNT */
  const noAccountView = useMemo(() => {
    return (
      <View style={{}}>
        <Text suppressHighlighting onPress={navigateToLogin} style={styles.dontHave}>
          {t('SignUp:alreadyAccount')}
          <Text suppressHighlighting style={styles.signIn}>
            {t('LogIn:title')}
          </Text>
        </Text>
      </View>
    );
  }, []);

  /** CLOSE SCREEN */
  const OnCloseEvent = () => {
    navigation.goBack();
  };

  /** BACK EVENT */
  const renderBackButton = useMemo(() => {
    return (
      <TouchableOpacity onPress={OnCloseEvent} activeOpacity={0.8} style={[styles.backView, { zIndex: 1 }]}>
        <Icon name={'close'} size={Size.L} />
      </TouchableOpacity>
    );
  }, []);

  /** REMEMBER ME EVENT */
  const onPolicyCheckEvent = () => {
    setCheckPolicy(!isPolicyCheck);
  };

  /** PRIVACY POLICY */
  const onPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY);
  };

  /** TERMS AND CONDITIONS */
  const onTerms = () => {
    Linking.openURL(TERMS_CONDITIONS);
  };

  /** BOTTOM VIEW */
  const renderBottomView = useMemo(() => {
    return (
      <View style={styles.bottomView}>
        {/* REMEMBER ME */}
        <TouchableOpacity onPress={onPolicyCheckEvent} activeOpacity={0.8} style={styles.rememberMe}>
          <MaterialCommunityIcons color={isPolicyCheck ? Colors.primary : Colors.mildBlack} size={Size.L * 1.4} name={isPolicyCheck ? 'checkbox-marked' : 'checkbox-blank-outline'} />
          <Text style={styles.bottonText}>
            {t('SignUp:iHave')}

            <Text onPress={onPrivacyPolicy} style={styles.bottonTextHighlight}>
              {t('sideMenu:privacyPolicy')}
            </Text>
            <Text style={styles.bottonText}>{t('SignUp:and')}</Text>
            <Text onPress={onTerms} style={styles.bottonTextHighlight}>
              {t('sideMenu:termsCondition')}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [isPolicyCheck]);

  /** MAIN RETURN */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* BACK BUTTON */}
      {renderBackButton}

      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
        {/* SIGN IN TITLE */}
        <Text style={styles.titleText}>{t('SignUp:getStarted')}</Text>

        {/* SIGN IN MESSAGE */}
        <Text style={styles.messageText}>{t('SignUp:message')}</Text>

        {/* FORM */}
        {renderFormContent}

        {/* POLICY VIEW */}
        {renderBottomView}
      </KeyboardAwareScrollView>

      {/* NO ACCOUNT VIEW */}
      {noAccountView}
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: Fonts.Bold,
    fontSize: Size.XL,
    marginBottom: 10,
    color: Colors.black,
  },
  messageText: {
    fontFamily: Fonts.SemiBold,
    fontSize: Size.M,
    color: Colors.mildBlack,
  },

  bottomView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  rememberMe: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dontHave: {
    alignSelf: 'center',
    marginVertical: 10,
    fontFamily: Fonts.Regular,
    fontSize: Size.S,
    color: Colors.mildBlack,
  },
  backView: {
    backgroundColor: Colors.white,
    ...shadow.s3,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  bottonText: { fontSize: Size.S, color: Colors.mildBlack },
  bottonTextHighlight: {
    fontSize: Size.S,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  signIn: {
    alignSelf: 'center',
    marginVertical: 10,
    fontFamily: Fonts.Regular,
    fontSize: Size.S,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
