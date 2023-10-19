import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {Constants} from '../Configs/Constants';

export const Size = {
  XS: Constants.isiPad ? responsiveFontSize(1) : responsiveFontSize(1.5),
  S: Constants.isiPad ? responsiveFontSize(1.2) : responsiveFontSize(1.9),
  M: Constants.isiPad ? responsiveFontSize(1.3) : responsiveFontSize(2),
  L: Constants.isiPad ? responsiveFontSize(1.7) : responsiveFontSize(2.3),
  XL: Constants.isiPad ? responsiveFontSize(2.3) : responsiveFontSize(3.4),
};
