import React, {startTransition, useEffect, useRef, useState} from 'react';
import {Text, Animated, Pressable, Dimensions, ViewStyle, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from '../Utils/Colors';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Fonts} from '../Utils/Fonts';
import {Size} from '../Utils/FontSize';
import {Constants} from '../Configs/Constants';
import DSAnimatedTouchable from './DSAnimatedTouchable';

const {height, width} = Dimensions.get('screen');

type props = {
  title?: any;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  isOutlineButton?: boolean;
};

export default function DSThemeButton({title, onPress, buttonStyle, isOutlineButton}: props) {
  /** USE EFFECT */
  useEffect(() => {}, []);

  return (
    <DSAnimatedTouchable onPress={onPress} style={[isOutlineButton ? style.touchViewOutline : style.touchView, buttonStyle]}>
      <Text style={{color: isOutlineButton ? Colors.black : Colors.white, fontSize: Size.M, fontFamily: Fonts.Medium}}>{title}</Text>
    </DSAnimatedTouchable>
  );
}

const style = StyleSheet.create({
  touchView: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    // padding: Constants.isiPad ? 30 : 20,
    width: responsiveWidth(93),
    height: responsiveHeight(6),
  },
  touchViewOutline: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    // padding: Constants.isiPad ? 30 : 20,
    width: responsiveWidth(93),
    height: responsiveHeight(6),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});
