import {Linking, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, openSettings, check, request, requestMultiple, checkMultiple} from 'react-native-permissions';
import {showAlertWithCompletionAndDestructiveCallback} from './Common';

export const checkCameraLibraryPermissions = async (cb: () => any) => {
  if (Platform.OS == 'ios') {
    checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(checkStatus => {
      if (checkStatus[PERMISSIONS.IOS.CAMERA] == 'granted' && checkStatus[PERMISSIONS.IOS.PHOTO_LIBRARY] == 'granted') {
        cb && cb();
        // RETURN TRUE
      } else {
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(status => {
          if (status[PERMISSIONS.IOS.CAMERA] == 'granted' && status[PERMISSIONS.IOS.PHOTO_LIBRARY] == 'granted') cb && cb();
        });
      }
    });
  } else {
    if (Number(Platform.Version) >= 33) {
      requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, PERMISSIONS.ANDROID.READ_MEDIA_VIDEO]).then(Status => {
        if (Status[PERMISSIONS.ANDROID.CAMERA] !== 'granted' || Status[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] !== 'granted' || Status[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] !== 'granted') {
          cb && cb();
          openSettingForCameraAccess();
        } else {
          console.log('::ELSE:', Status);
          cb && cb();
        }
      });
    } else {
      requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(Status => {
        if (Status[PERMISSIONS.ANDROID.CAMERA] !== 'granted' || Status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !== 'granted') {
          cb && cb();
          openSettingForCameraAccess();
        } else {
          console.log('::ELSE:', Status);
          cb && cb();
        }
      });
    }
  }
};

export const openSettingForCameraAccess = () => {
  showAlertWithCompletionAndDestructiveCallback('Open Settings', 'Please allow camera and photo library access from your setting', 'Okay', 'Cancel', 1, positiveCallback, negativeCallback);
};

const positiveCallback = () => {
  Linking.openSettings();
};

const nagativeCallback = () => {};
