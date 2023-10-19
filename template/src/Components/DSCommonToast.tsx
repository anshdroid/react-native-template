import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts } from '../Utils/Fonts';
import { Colors as color } from '../Utils/Colors';

const initialToast = {
  heading: '',
  message: '',
  type: null,
  visible: false,
  onPress: null,
};

const ToastContext = React.createContext({});

class StaticToast {
  static toast: any = null;
}

const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = React.useState(initialToast);
  const timeout: any = React.useRef();

  React.useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hide, 5000);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [toast]);

  const show = React.useCallback(args => {
    setToast({ ...initialToast, visible: true, ...args });
  }, []);

  const hide = React.useCallback(() => {
    setToast({ ...toast, visible: false });
  }, [toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast,
      }}>
      {children}
    </ToastContext.Provider>
  );
};

const Colors: any = {
  Success: '#c5f7dd',
  Error: '#ffd0cb',
  Notification: '#cce3ff',
  Warning: '#ffe8c3',
};

const ColorsDark: any = {
  Success: '#3bc279',
  Error: '#e9594d',
  Notification: '#3e84e5',
  Warning: '#e8a027',
};

const Icons: any = {
  Success: 'check-circle-outline',
  Error: 'close-circle-outline',
  Notification: 'information-outline',
  Warning: 'alert-outline',
};

const height = 80;

function CustomToast() {
  const insets = useSafeAreaInsets()?.top || 20;
  const toastAnimation = React.useRef(new Animated.Value(0)).current;
  const { toast, hide, show }: any = React.useContext(ToastContext);

  React.useEffect(() => {
    StaticToast.toast = show;

    if (toast.visible) {
      togglePopup(1);
    } else {
      togglePopup(0);
    }
  }, [toast]);

  const togglePopup = (toValue = 0) => {
    Animated.spring(toastAnimation, { toValue, useNativeDriver: true }).start();
  };

  const onPress = () => {
    if (typeof toast.onPress == 'function') {
      toast.onPress();
    }
    hide();
  };

  const translateY = toastAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-(height + insets + 80), 0],
  });
  const backgroundColor = Colors[toast.type];
  const backgroundColorDark = ColorsDark[toast.type];
  const iconName = Icons[toast.type];

  return (
    <Animated.View
      style={[
        style.container,
        {
          transform: [{ translateY }],
          top: Platform.OS == 'ios' ? insets : 0,
          zIndex: 10000,
        },
      ]}>
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={[style.toastContainer, { backgroundColor }]}>
        <View
          style={{
            backgroundColor,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            borderLeftWidth: 8,
            borderLeftColor: backgroundColorDark,
          }}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={[style.headingStyle, { color: '#000' }]}>
              {toast.heading}
            </Text>
            <Text style={[style.textStyle, { color: '#000' }]} numberOfLines={2}>
              {toast.message}
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginLeft: 10 }}>
            <MaterialIcons name={iconName} size={35} style={{ marginRight: 5 }} color={backgroundColorDark} />
          </View>
          {/* </View> */}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const Toast = () => {
  return (
    <ToastProvider>
      <CustomToast />
    </ToastProvider>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
  },

  toastContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },

  headingStyle: {
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    lineHeight: 27,
    // color: '#000',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    lineHeight: 23,
    color: color.inActive,
    // color: '#000',
  },
});

export const showErrorMessage = (title: string, message: string) => {
  StaticToast?.toast({
    heading: title,
    message: message,
    type: 'Error',
    onPress: () => {},
  });
};
export const showSuccessMessage = (title: string, message: string) => {
  StaticToast?.toast({
    heading: title,
    message: message,
    type: 'Success',
    onPress: () => {},
  });
};

export const showInfoMessage = (title: string, message: string) => {
  StaticToast?.toast({
    heading: title,
    message: message,
    type: 'Notification',
    onPress: () => {},
  });
};

export const showWarningMessage = (title: string, message: string) => {
  StaticToast?.toast({
    heading: title,
    message: message,
    type: 'Warning',
    onPress: () => {},
  });
};

export default Toast;
