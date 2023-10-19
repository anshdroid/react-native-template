import React from 'react';
import {Alert, Platform, Dimensions} from 'react-native';
import {PROJECT_TITLE} from '../Configs/Constants';

/**
 *
 * @param { Alert Message } message
 */
export function showAlert(message) {
  Alert.alert(PROJECT_TITLE, message, [{text: 'Ok', onPress: () => {}}], {cancelable: false});
}

/**
 *
 * @param { Alert Message } message
 * @param { Callback for positive action } callback
 * @param { Is the Alert cancelable } isCancelable
 */
export function showAlertWithCallback(message, callback, isCancelable = false) {
  Alert.alert(PROJECT_TITLE, message, [{text: 'Ok', onPress: callback}], {cancelable: isCancelable});
}

/**
 *
 * @param { Alert Title } title
 * @param { Alert Message } message
 * @param { First Action Title } actionTitle1
 * @param { Second Action Title } actionTitle2
 * @param { Which index need be to destructive } destructiveIndex
 * @param { Callback for positive action } completionCallback
 * @param { Callback for negative action } destructiveCallback
 * @param { Is the Alert cancelable } isCancelable
 */
export function showAlertWithCompletionAndDestructiveCallback(title = PROJECT_TITLE, message, actionTitle1, actionTitle2, destructiveIndex, completionCallback, destructiveCallback, isCancelable = false) {
  Alert.alert(
    title,
    message,
    [
      {
        text: actionTitle1,
        style: destructiveIndex == 0 ? 'destructive' : 'default',
        onPress: () => (destructiveIndex == 0 ? destructiveCallback() : completionCallback()),
      },
      {
        text: actionTitle2,
        style: destructiveIndex == 1 ? 'destructive' : 'default',
        onPress: () => (destructiveIndex == 1 ? destructiveCallback() : completionCallback()),
      },
    ],
    {cancelable: isCancelable},
  );
}
