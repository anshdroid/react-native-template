import SharedManager from '../Utils/SharedManager';
import {showErrorMessage} from '../Components/DSCommonToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CallGetAPI, callPostAPI, postMultiPartRequest} from './ServiceMethods';
import {Constants, STORAGE} from '../Configs/Constants';
import {API_END_POINTS} from '.';

export const getResponse = (jsonResponse: any) => {
  if (jsonResponse) {
    if (Array.isArray(jsonResponse)) {
      const response = jsonResponse[0];
      return response;
    } else if (typeof jsonResponse == 'object') {
      return jsonResponse;
    }
  }
};

/**
 *
 * @param { Body of the request } data
 * @returns { network call }
 */
export const loginUser = async (body: any) => {
  const response = await callPostAPI({body, url: API_END_POINTS.loginUser});
  const result = getResponse(response);

  if (result?.status && result.data) {
    if (body.rememberMe) {
      SharedManager.getInstance().setRememberMe(true);
    } else {
      SharedManager.getInstance().setRememberMe(false);
    }
    SharedManager.getInstance().setEmail(result.data.email);
    SharedManager.getInstance().setPassword(body.password);
    SharedManager.getInstance().setUserId(result.data.id);
    SharedManager.getInstance().setAuthToken(result.data.token);
    AsyncStorage.setItem(STORAGE.USER_DETAILS, JSON.stringify(result.data));
    return result;
  } else {
    showErrorMessage('Login Error', result?.message);
    return false;
  }
};
