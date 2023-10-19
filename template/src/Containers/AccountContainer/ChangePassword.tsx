import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DSThemeButton from '../../Components/DSThemeButton';
import {Colors} from '../../Utils/Colors';
import {Fonts} from '../../Utils/Fonts';
import {shadow} from '../../Utils/Shadows';
import {AppConstants, Constants} from '../../Configs/Constants';
import {Formik, FormikProps, FormikValues} from 'formik';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {DSTextInputWithTitle} from '../../Components/DSTextInput';
import {Keys} from '../../Utils/Message';
import {CONFIRM_PASSWORD_VAL, PASSWORD_VAL} from '../../Utils/Validations';
import {Size} from '../../Utils/FontSize';
import DSBaseContainer from '../../Components/DSBaseContainer';

const formikRef = React.createRef<FormikProps<FormikValues>>();

export default function ChangePassword({navigation}: any) {
  const [isLoading, setLoading] = useState(false);

  const {t} = useTranslation();

  const validationSchema = yup.object().shape({
    password: PASSWORD_VAL(t('error:PasswordLength'), t('error:password')),
    newPassword: PASSWORD_VAL(t('error:PasswordLength'), t('error:password')),
    confirmPassword: CONFIRM_PASSWORD_VAL(t('error:PasswordNotMatch'), t('error:CPassword')),
  });

  /**
   *
   * @param { values returned by formik props } values
   */
  const handleSubmit = values => {
    console.log('values: ', values);
  };

  /**
   *
   * @param { submit button event handler } onPress
   * @returns { button for submit }
   */
  const renderSubmitButton = onPress => {
    return <DSThemeButton title={'SUBMIT'} buttonStyle={{marginVertical: 50}} onPress={() => onPress()} />;
  };

  /**
   *
   * @returns { Main content for fields }
   */
  const renderContent = () => {
    return (
      <View style={{paddingHorizontal: 20, marginVertical: 50}}>
        <Formik
          initialValues={{password: '', newPassword: '', confirmPassword: ''}}
          onSubmit={values => {
            handleSubmit(values);
          }}
          innerRef={formikRef}
          validationSchema={validationSchema}>
          {formikProps => (
            <>
              {/* PASSWORD */}
              <DSTextInputWithTitle isPassword title={t('placeholder:password')} placeholder={t('placeholder:enterPassword')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.password, text)} value={formikProps.values.password} error={formikProps.touched[`${Keys.password}`] && formikProps.errors[`${Keys.password}`]} />

              {/* NEW PASSWORD PASSWORD */}
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

              {/* REGISTER BUTTON */}
              {renderSubmitButton(formikProps.handleSubmit)}
            </>
          )}
        </Formik>
      </View>
    );
  };

  /** REGISTRATION SCREEN NAVIGATION */
  const OnCloseEvent = () => {
    navigation.goBack();
  };
  /** BACK EVENT */
  const renderBackButton = useMemo(() => {
    return (
      <TouchableOpacity onPress={OnCloseEvent} activeOpacity={0.8} style={[styles.backView, {top: AppConstants.safeAreaInsets.top, zIndex: 1}]}>
        <Icon name={'close'} size={Size.L} />
      </TouchableOpacity>
    );
  }, []);

  /** Main return */
  return (
    <DSBaseContainer isLoading={isLoading} title={t('sideMenu:changePassword')}>
      {/* Keyboard scroll view */}
      <KeyboardAwareScrollView bounces={false} keyboardShouldPersistTaps="handled" enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor: Colors.white, flexGrow: 1}}>
        {/* DESC TEXT */}
        <Text style={styles.verifyText}>{'Your new password must be different from previous used passwords.'}</Text>
        {/* FORMS */}
        {renderContent()}
      </KeyboardAwareScrollView>
    </DSBaseContainer>
  );
}

// styles
const styles = StyleSheet.create({
  verifyEmail: {
    textAlign: 'left',
    fontFamily: Fonts.SemiBold,
    fontSize: Size.XL,
    marginHorizontal: 20,
    color: Colors.primary,
  },
  verifyText: {
    textAlign: 'left',
    marginVertical: 10,
    fontFamily: Fonts.Regular,
    fontSize: Size.M,
    marginHorizontal: 20,
    color: Colors.textColor,
    marginTop: 20,
  },

  backView: {
    backgroundColor: Colors.white,
    ...shadow.s3,
    width: Constants.isiPad ? 70 : 40,
    height: Constants.isiPad ? 70 : 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    //    position: 'absolute',
  },
});
