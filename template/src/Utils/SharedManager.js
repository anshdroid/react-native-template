export default class SharedManager {
  static myInstance = null;
  authToken = '';
  userId = '';
  rememberMe = false;
  email = '';
  password = '';
  deviceId = '';

  /**
   * @returns {SharedManager}
   */
  static getInstance() {
    if (this.myInstance == null) {
      this.myInstance = new SharedManager();
    }

    return this.myInstance;
  }

  getDeviceId() {
    return this.deviceId;
  }

  setDeviceId(id) {
    this.deviceId = id;
  }

  getAuthToken() {
    return this.authToken;
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId) {
    this.userId = userId;
  }
  getRememberMe() {
    return this.rememberMe;
  }

  setRememberMe(value) {
    this.rememberMe = value;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}
