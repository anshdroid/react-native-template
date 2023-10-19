import React from 'react';
import {useState, useEffect} from 'react';
import {View, Animated, StyleSheet, Text, Keyboard, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../Utils/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../../Utils/Fonts';
import {Keys} from '../../Utils/Message';
import {Formik, FormikProps, FormikValues} from 'formik';
import * as yup from 'yup';
import {CONFIRM_PASSWORD_VAL, EMAIL_VAL, PASSWORD_VAL, REQUIRE_VAL} from '../../Utils/Validations';
import {DSTextInputWithTitle} from '../../Components/DSTextInput';
import DSThemeButton from '../../Components/DSThemeButton';
import {shadow} from '../../Utils/Shadows';
import {t} from 'i18next';
import {Size} from '../../Utils/FontSize';

const formikRef = React.createRef<FormikProps<FormikValues>>();

const validationSchema = yup.object().shape({
  code: REQUIRE_VAL(t('error:OTP')),
  newPassword: PASSWORD_VAL(t('error:PasswordLength'), t('error:password')),
  confirmPassword: CONFIRM_PASSWORD_VAL(t('error:PasswordNotMatch'), t('error:CPassword')),
});

/** MAIN FUNCTION */
export default function PasswordVerification({navigation, route}: any) {
  console.log('route: ', route);
  const [isLoading, setLoading] = useState(false);

  /** USE EFFECT */
  useEffect(() => {}, []);

  /** SUBMIT LOGIN FORM */
  const onSubmitForgotFormEvent = (values: any) => {};

  /** FORM CONTENT */
  const renderFormContent = () => {
    return (
      <Formik
        initialValues={{code: '', newPassword: '', confirmPassword: ''}}
        onSubmit={values => {
          onSubmitForgotFormEvent(values);
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}>
        {formikProps => (
          <View>
            {/* OTP */}
            <DSTextInputWithTitle
              maxLength={6}
              title={t('placeholder:verificationCode')}
              placeholder={t('placeholder:enterVerificationCode')}
              onChangeText={(text: any) => formikProps.setFieldValue(Keys.code, text)}
              value={formikProps.values.code}
              error={formikProps.touched[`${Keys.code}`] && formikProps.errors[`${Keys.code}`]}
              keyboardType="phone-pad"
            />

            {/* NEW PASSWORD */}
            <DSTextInputWithTitle isPassword title={t('placeholder:newPassword')} placeholder={t('placeholder:enterNewPassword')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.newPassword, text)} value={formikProps.values.newPassword} error={formikProps.touched[`${Keys.newPassword}`] && formikProps.errors[`${Keys.newPassword}`]} />

            {/* CONFIRM PASSWORD */}
            <DSTextInputWithTitle
              isPassword
              title={t('placeholder:confirmPassword')}
              placeholder={t('placeholder:enterConfirmPassword')}
              onChangeText={(text: any) => formikProps.setFieldValue(Keys.confirmPassword, text)}
              value={formikProps.values.confirmPassword}
              error={formikProps.touched[`${Keys.confirmPassword}`] && formikProps.errors[`${Keys.confirmPassword}`]}
            />
          </View>
        )}
      </Formik>
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
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      {/* SCROLL VIEW */}
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{backgroundColor: Colors.white, paddingHorizontal: 12}} showsVerticalScrollIndicator={false}>
        {/* FORGOT TITLE */}
        <Text style={styles.titleText}>{t('ForgotPassword:resetPassword')}</Text>

        {/* LOGN TEXT */}
        <Text style={styles.login}>{t('ForgotPassword:nextMessage', {email: route?.params?.values?.email ?? ''})}</Text>

        {/* SHADOW VIEW */}
        <View style={{marginVertical: 30}}>
          {/* FORM CONTENT */}
          {renderFormContent()}
        </View>
      </KeyboardAwareScrollView>

      {/* FORGOT BUTTON */}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <DSThemeButton buttonStyle={{marginVertical: 15}} title={t('ForgotPassword:updatePassword')} onPress={() => formikRef.current && formikRef.current?.handleSubmit()} />
      </View>

      {/* AGAIN ENTER EMAIL */}
      {enterEmailAgainView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login: {
    fontSize: Size.M,
    marginTop: 15,
    textAlign: 'left',
    fontFamily: Fonts.Medium,
    color: Colors.textColor,
  },

  titleText: {
    fontFamily: Fonts.Bold,
    fontSize: Size.XL,
    marginBottom: 10,
    color: Colors.black,
  },

  shadowView: {
    shadowColor: Colors.shadow,
    backgroundColor: Colors.white,
    shadowOffset: {height: 2, width: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 25,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  backView: {
    backgroundColor: Colors.white,
    ...shadow.s3,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  dontHave: {alignSelf: 'center', marginVertical: 10, fontFamily: Fonts.Regular, fontSize: Size.S, color: Colors.mildBlack},
});
