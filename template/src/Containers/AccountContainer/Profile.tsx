import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, Image, View, Dimensions, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../Utils/Colors';
import {DSTextInputWithTitle} from '../../Components/DSTextInput';
import {Formik, FormikProps, FormikValues} from 'formik';
import {EMAIL_VAL, MOBILE_VAL, PASSWORD_VAL, REQUIRE_VAL} from '../../Utils/Validations';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {Keys} from '../../Utils/Message';
import DSThemeButton from '../../Components/DSThemeButton';
import {checkCameraLibraryPermissions} from '../../Utils/Permissions';
import {shadow} from '../../Utils/Shadows';
import {AppConstants, Constants, screenWidth} from '../../Configs/Constants';
import {hideActionSheet, showActionSheet} from '../../Components/DSActionSheet';
import { Size } from '../../Utils/FontSize';

const {width, height} = Dimensions.get('screen');
const ImageSize = !Constants.isiPad ? screenWidth * 0.3 : screenWidth * 0.25; 
const formikRef = React.createRef<FormikProps<FormikValues>>();

export default function Profile({navigation}: any) {
  const {t} = useTranslation();

  const validationSchema = yup.object().shape({
    name: REQUIRE_VAL(t('error:ValidName')),
    mobile: MOBILE_VAL(t('error:PhoneNumber'), t('error:Mobile')),
    address: REQUIRE_VAL(t('error:Address')),
    email: EMAIL_VAL(t('error:ValidEmail'), t('error:email')),
  });

  useEffect(() => {
    return () => hideActionSheet();
  }, []);

  const [profileImage, setProfileImage] = useState('https://picsum.photos/200/300');

  //CLICK ON LOGIN BUTTON
  const handleSubmit = (values: any) => {
    console.log('::::::::::::values:::::::::: ', values);
  };

  /** FORM CONTENT */
  const renderFormContent = useMemo(() => {
    return (
      <Formik
        initialValues={{name: '', mobile: '', address: '', email: ''}}
        onSubmit={values => {
          handleSubmit(values);
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}>
        {formikProps => (
          <>
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
              editable={false}
              title={t('placeholder:mobile')}
              placeholder={t('placeholder:enterMobile')}
              onChangeText={(text: any) => {
                formikProps.setFieldValue(Keys.mobile, text);
              }}
              value={formikProps.values.mobile}
              error={formikProps.touched[`${Keys.mobile}`] && formikProps.errors[`${Keys.mobile}`]}
            />

            {/* ADDRESS */}
            <DSTextInputWithTitle
              title={t('placeholder:address')}
              placeholder={t('placeholder:enterAddress')}
              onChangeText={(text: any) => {
                formikProps.setFieldValue(Keys.address, text);
              }}
              value={formikProps.values.address}
              error={formikProps.touched[`${Keys.address}`] && formikProps.errors[`${Keys.address}`]}
            />

            {/* EMAIL */}
            <DSTextInputWithTitle
              editable={false}
              title={t('placeholder:email')}
              placeholder={t('placeholder:enterEmail')}
              onChangeText={(text: any) => {
                formikProps.setFieldValue(Keys.email, text);
              }}
              value={formikProps.values.email}
              error={formikProps.touched[`${Keys.email}`] && formikProps.errors[`${Keys.email}`]}
              keyboardType="email-address"
            />

            {/* REGISTER BUTTON */}
            {renderRegisterButton(formikProps.handleSubmit)}
          </>
        )}
      </Formik>
    );
  }, []);

  /** REGISTER BUTTON */
  const renderRegisterButton = onPress => {
    return <DSThemeButton buttonStyle={{marginTop: 30}} title={t('Update:title').toUpperCase()} onPress={() => onPress()} />;
  };

  /** CHECK PERMISSIONS */
  const openImagePickerPermissionCheck = async () => {
    try {
      checkCameraLibraryPermissions(showPickerOptions);
    } catch (error) {}
  };

  /** OPEN showPickerOptions */
  const showPickerOptions = () => {
    showActionSheet(t('general:selectAvator'), [t('general:camera'), t('general:photoLibrary')], data => optionSelectedFromSheet(data));
  };

  const optionSelectedFromSheet = item => {
    if (item == 'Camera') {
      openImagePicker(1);
    } else {
      openImagePicker(2);
    }
  };

  const openImagePicker = (type: number) => {
    const func = type == 1 ? ImagePicker.openCamera : ImagePicker.openPicker;

    func({mediaType: 'any', cropping: true, multiple: false}).then(resp => {
      if (resp) {
        setProfileImage(resp.path);
      }
    });
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

  /** MAIN RETURN */
  return (
    <SafeAreaView>
      {/* BACK BUTTON */}
      {renderBackButton}

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {/* MAIN VIEW */}
        <View style={{flex: 1, paddingTop: 30}}>
          {/* PROFILE CIRCLE IMAGE */}
          <View style={[styles.ImageAbsView]}>
            <View style={styles.circleView}>
              <Image style={styles.circularImageWithBorder} source={{uri: profileImage}} resizeMode={'cover'} />
            </View>

            {/* CAMERA ICON */}
            <View style={styles.editIcon}>
              <FontAwesome suppressHighlighting onPress={() => openImagePickerPermissionCheck()} name="camera" size={20} />
            </View>
          </View>

          {/* FORM VIEW */}
          <View style={{marginHorizontal: 15, flex: 1}}>{renderFormContent}</View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circularImageWithBorder: {
    width: ImageSize - 6,
    height: ImageSize - 6,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: ImageSize / 2,
    marginBottom: 2,
  },
  circleView: {
    width: ImageSize,
    height: ImageSize,
    borderRadius: ImageSize / 2,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageAbsView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 100,
  },
});
