import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ViewStyle} from 'react-native';

/** NAVIGATION PROP TYPE */
export interface NavigationOptions {
  openDrawer: () => any;
  closeDrawer: () => any;
  goBack: () => any;
  navigate: (routeName: string, routeParams?: any) => any;
}

/** ROUTE PROP TYPE */
interface RouteOptions {
  key: string;
  params: any;
  name: string;
}

/** NAVIGATION PROPS */
export interface NavigationScreenOptions {
  navigation: NavigationOptions;
  route: RouteOptions;
}

export interface RightLeftInterface {
  leftText: string;
  rightText: string;
  onLeft?: () => void;
  onRight?: () => void;
}

/** TEXTINPUT SEARCH BAR */
export interface SearchBarProps {
  textStyle?: any;
  containrStyle?: ViewStyle;
  mainViewStyle?: ViewStyle;
  onSubmit?: any;
  onChangeText?: any;
  textRef?: any;
  isParsable?: any;
  onPress?: any;
  textProps?: any;
  isForCVV?: boolean;
  isPassword?: boolean;
}

/** TEXTINPUT BAR */
export interface TextInputProps {
  textStyle?: any;
  containrStyle?: ViewStyle;
  mainViewStyle?: ViewStyle;
  onSubmit?: any;
  onChangeText?: any;
  onPress?: any;
  isPassword?: boolean;
  placeholder?: any | string;
  rightIcon?: JSX.Element;
  onRightIconPress?: () => void;
  autoCapitalize?: any;
  multiline?: boolean;
  isParsable?: boolean;
  value?: string;
  error?: any;
  keyboardType?: string;
  selection?: any;
  onFocus?: any;
  title?: any | string;
  textRef?: any;
  editable?: boolean;
  onBlur?: () => void;
  titleStyle?: ViewStyle;
  maxLength?: number;
  autoFocus?: boolean;
  defaultValue?: string;
}

/** TOAST PROPS */
export interface showToastInterface {
  heading: string;
  message: string;
  type?: 'Success' | 'Error' | 'Notification';
  onPress?: any;
}

/** WELCOME DOTS */
export interface DSWalkthroughDots {
  numOfDots?: any;
  activeIndex?: number;
}

/** SOCIAL MEDIA LOGIN PROPS */
export interface SocialLoginTypes {
  type: 'facebook' | 'google' | 'apple';
}

/** VALIDATION FIELD PROPS */
export interface ValidationProps {
  validMsg?: string;
  reqMsg?: string;
}
