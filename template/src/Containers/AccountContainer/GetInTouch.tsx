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
import {AppConstants} from '../../Configs/Constants';
import {Formik, FormikProps, FormikValues} from 'formik';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {DSTextInputWithTitle} from '../../Components/DSTextInput';
import {Keys} from '../../Utils/Message';
import {CONFIRM_PASSWORD_VAL, EMAIL_VAL, PASSWORD_VAL, REQUIRE_VAL} from '../../Utils/Validations';
import DSBaseContainer from '../../Components/DSBaseContainer';
import { Size } from '../../Utils/FontSize';

const formikRef = React.createRef<FormikProps<FormikValues>>();

export default function GetInTouch({navigation}: any) {
  const [isLoading, setLoading] = useState(false);

  const {t} = useTranslation();

  const validationSchema = yup.object().shape({
    name: REQUIRE_VAL(t('error:ValidName')),
    email: EMAIL_VAL(t('error:ValidEmail'), t('error:email')),
    message: REQUIRE_VAL(t('error:messageReq')),
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
          initialValues={{name: '', email: '', message: ''}}
          onSubmit={values => {
            handleSubmit(values);
          }}
          innerRef={formikRef}
          validationSchema={validationSchema}>
          {formikProps => (
            <>
              {/* Name */}
              <DSTextInputWithTitle title={t('placeholder:name')} placeholder={t('placeholder:enterName')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.name, text)} value={formikProps.values.name} error={formikProps.touched[`${Keys.name}`] && formikProps.errors[`${Keys.name}`]} />

              {/* Email */}
              <DSTextInputWithTitle title={t('placeholder:email')} placeholder={t('placeholder:enterEmail')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.email, text)} value={formikProps.values.email} error={formikProps.touched[`${Keys.email}`] && formikProps.errors[`${Keys.email}`]} />

              {/* MESSAGE */}
              <DSTextInputWithTitle multiline title={t('placeholder:message')} placeholder={t('placeholder:enterMessage')} onChangeText={(text: any) => formikProps.setFieldValue(Keys.message, text)} value={formikProps.values.message} error={formikProps.touched[`${Keys.message}`] && formikProps.errors[`${Keys.message}`]} />

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
      <TouchableOpacity onPress={OnCloseEvent} activeOpacity={0.8} style={[styles.backView, { top: AppConstants.safeAreaInsets.top, zIndex: 1 }]}>
        <Icon name={'close'} size={Size.L} />
      </TouchableOpacity>
    );
  }, []);

  /** Main return */
  return (
    <DSBaseContainer title="Get In Touch">
      {/* Keyboard scroll view */}
      <KeyboardAwareScrollView bounces={false} keyboardShouldPersistTaps="handled" enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor: Colors.white, flexGrow: 1}}>
        {/* DESC TEXT */}
        <Text style={styles.verifyText}>{'Please submit you query and we will get back to you within no time!!'}</Text>
        {/* FORMS */}
        {renderContent()}
      </KeyboardAwareScrollView>
      {/* LOADING VIEW */}
    </DSBaseContainer>
  );
}

// styles
const styles = StyleSheet.create({

  verifyText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: Fonts.Regular,
    fontSize: Size.L,
    marginHorizontal: 10,
    color: Colors.textColor,
    marginTop: 20,
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
    position: 'absolute',
  },
});
