import React, {useMemo} from 'react';
import {useState, useEffect} from 'react';
import {View, Animated, StyleSheet, Text, Keyboard, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../Utils/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../../Utils/Fonts';
import {Keys} from '../../Utils/Message';
import {Placeholders} from '../../Utils/Placeholder';
import {Formik, FormikProps, FormikValues} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import {EMAIL_VAL} from '../../Utils/Validations';
import {DSTextInputWithTitle} from '../../Components/DSTextInput';
import DSThemeButton from '../../Components/DSThemeButton';
import {shadow} from '../../Utils/Shadows';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {t} from 'i18next';
import {Size} from '../../Utils/FontSize';

const formikRef = React.createRef<FormikProps<FormikValues>>();

/** MAIN FUNCTION */
export default function ForgotPassword({navigation}: any) {
  const [isLoading, setLoading] = useState(false);

  /** USE EFFECT */
  useEffect(() => {}, []);

  /** SUBMIT LOGIN FORM */
  const onSubmitForgotFormEvent = (values: any) => {
    navigation.navigate('PasswordVerification', {values});
  };

  const validationSchema = yup.object().shape({
    email: EMAIL_VAL(t('error:ValidEmail'), t('error:email')),
  });

  /** FORM CONTENT */
  const renderFormContent = useMemo(() => {
    return (
      <Formik
        initialValues={{email: ''}}
        onSubmit={values => {
          onSubmitForgotFormEvent(values);
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}>
        {formikProps => <DSTextInputWithTitle title={t('placeholder:email')} placeholder={t('placeholder:enterEmail')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.email, text)} value={formikProps.values.email} error={formikProps.touched[`${Keys.email}`] && formikProps.errors[`${Keys.email}`]} />}
      </Formik>
    );
  }, []);

  /** CLOSE SCREEN */
  const OnCloseEvent = () => {
    navigation.goBack();
  };

  /** BACK EVENT */
  const renderBackButton = useMemo(() => {
    return (
      <TouchableOpacity onPress={OnCloseEvent} activeOpacity={0.8} style={styles.backView}>
        <Icon name={'close'} size={Size.L} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      {/* BACK BUTTON */}
      {renderBackButton}

      {/* SCROLL VIEW */}
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{backgroundColor: Colors.white, paddingHorizontal: 12, paddingVertical: 20}} showsVerticalScrollIndicator={false}>
        {/* FORGOT TITLE */}
        <Text style={styles.titleText}>{t('ForgotPassword:title')}</Text>

        {/* FORGOT MESSAGE */}
        <Text style={styles.messageText}>{t('ForgotPassword:message')}</Text>

        {/* SHADOW VIEW */}
        <View style={{marginVertical: 30}}>
          {/* FORM CONTENT */}
          {renderFormContent}
        </View>
      </KeyboardAwareScrollView>
      {/* FORGOT BUTTON */}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <DSThemeButton buttonStyle={{marginVertical: 15}} title={t('general:continue')} onPress={() => formikRef.current && formikRef.current?.handleSubmit()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login: {
    fontSize: Size.M,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    color: Colors.textColor,
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
  titleText: {
    fontFamily: Fonts.Bold,
    fontSize: Size.XL,
    marginBottom: 10,
    color: Colors.black,
  },
  messageText: {fontFamily: Fonts.SemiBold, fontSize: Size.M, color: Colors.mildBlack},
});
