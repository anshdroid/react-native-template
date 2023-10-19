import SharedManager from '../Utils/SharedManager';
import {showErrorMessage} from '../Components/DSCommonToast';
import {Platform} from 'react-native';
import {isStringValid} from '../Utils/Validations';

const getHeaders = () => {
  const headers = {Accept: 'application/json', 'Content-Type': 'application/json', 'Version-Code': '1', 'Device-Type': Platform.OS, Authorization: ''};
  if (isStringValid(SharedManager.getInstance().getAuthToken())) {
    headers.Authorization = 'Bearer ' + SharedManager.getInstance().getAuthToken();
  }
  return headers;
};

const getImageHeader = () => {
  const headers = {Accept: 'application/json', 'Content-Type': 'multipart/form-data', 'Version-Code': '1', 'Device-Type': Platform.OS, Authorization: ''};
  if (isStringValid(SharedManager.getInstance().getAuthToken())) {
    headers.Authorization = 'Bearer ' + SharedManager.getInstance().getAuthToken();
  }
  return headers;
};

const showLog = (url: any, Status: any, method: any, header: any, body: any, res: any) => {
  console.log('\n--------- NETWORK CALL STARTED ---------\n\n');
  console.log('[Fetch] Url-->', url);
  console.log('[Fetch] Status-->', Status);
  console.log('[Fetch] Header-->', header);
  console.log('[Fetch] Method-->', method);
  console.log('[Fetch] Body-->', body);
  console.log('[Fetch] Response-->', res);
  console.log('\n--------- NETWORK CALL ENDED ---------\n\n');
};

const authError = () => {
  showErrorMessage('Session Expired', 'your session has been expired please login again');
  return {status: false, message: 'Your session has been expired please login again'};
};

export const CallGetAPI = async ({header = getHeaders(), url}) => {
  try {
    const response = await fetch(url, {headers: header});
    const result = await response.json();
    showLog(url, response.status, header, 'GET', {}, result);
    if (response.status == 401) return authError();
    return result;
  } catch (e) {
    if (e.message == 'Aborted') return abortError();
  }
};

export const callPostAPI = async ({header = getHeaders(), body, url, method = 'post'}) => {
  try {
    const response = await fetch(url, {method, headers: header, body: JSON.stringify(body)});
    const result = await response.json();
    showLog(url, response.status, method, header, body, result);
    if (response.status == 401) return authError();
    return result;
  } catch (e) {
    if (e.message == 'Aborted') return abortError();
  }
};

export const postMultiPartRequest = async ({header = getImageHeader(), body, url}) => {
  try {
    const response = await fetch(url, {method: 'post', headers: header, body});
    console.log(response);
    const result = await response.json();
    showLog(url, response.status, header, 'POST', body, result);
    if (response.status == 401) return authError();
    return result;
  } catch (e) {
    if (e.message == 'Aborted') return false;
  }
};

const abortError = () => {
  const error = 'Unable to connect with server! Request is taking longer than 30 seconds to fulfill';
  return {status: false, message: error};
};
