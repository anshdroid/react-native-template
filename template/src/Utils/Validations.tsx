import * as yup from 'yup';
import {Messages} from './Message';
import {Dimensions, Platform} from 'react-native';

//yup validation//
export const EMAIL_VAL = (validMsg: string, reqMsg: string) => yup.string().label('Email').email(validMsg).required(reqMsg);

export const REQUIRE_VAL = (reqMsg: string) => yup.string().required(reqMsg);

export const OLD_PASSWORD_VAL = (validMsg: string, reqMsg: string) => yup.string().label('Old Password').required(reqMsg).min(2, validMsg);

export const PASSWORD_VAL = (validMsg: string, reqMsg: string) => yup.string().label('Password').required(reqMsg).min(6, validMsg);

export const FIRST_NAME_VAL = (validMsg: string, reqMsg: string) =>
  yup
    .string()
    .trim()
    .label('Name')
    .matches(/^[aA-zZ\s]+$/, validMsg)
    .required(reqMsg);

export const LAST_NAME_VAL = (reqMsg: string) => yup.string().trim().label('Last Name').required(reqMsg);

export const MOBILE_VAL = (validMsg: string, reqMsg: string) => yup.string().label('Phone number').required(reqMsg).min(10, validMsg)

export const CONFIRM_PASSWORD_VAL = (validMsg: string, reqMsg: string) =>
  yup
    .string()
    .label('confirm Password')
    .required(reqMsg)
    .test('passwords-match', validMsg, function (value) {
      return this.parent.newPassword === value;
    });

export const TERMS_VAL = (reqMsg: string) => yup.boolean().oneOf([true], reqMsg);

export const VERIFY_NUMBER = (reqMsg: string) => yup.boolean().oneOf([true], reqMsg);

export const GENDER = yup.string().label('Gender').nullable().required(Messages.Gender);

export const removeWhiteSpace = (string: any) => string.replace(/\s/g, '');

export const getAlphaOnly = text => text.replace(new RegExp(/[^a-zA-Z ]/g, 'g'), '');

export const getAlphaNumeric = text => text.replace(new RegExp(/[^a-zA-Z0-9 ]/g, 'g'), '');

export const getOnlyNumber = text => text.replace(new RegExp(/\D/g, 'g'), '');

export function passwordValidate(password: any) {
  let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return regularExpression.test(password);
}

export const isInvalidEmailAddress = (mail: any) => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail == '' || mail == undefined || mail == null) return true;
  if (mail.match(mailformat)) return false;
  else return true;
};

export const isValidArray = (arr: any) => Array.isArray(arr);

export const removeDuplicateObjects = (arr: any, key: any) => {
  if (isValidArray(arr)) return arr.filter((item: any, index: any, self: any) => index === self.findIndex((item_2: any) => item_2[key] == item[key]));
  return [];
};

export function isStringValid(value) {
  return value !== null && value !== undefined && value !== '';
}

export function isStringEmpty(str) {
  return str == undefined || str == null || str.trim() === '';
}

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}
