import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Svg, {Defs, LinearGradient, Stop, G, Circle, Path, Image, ClipPath, RadialGradient, Ellipse, Pattern, Text, Rect} from 'react-native-svg';
import {shadow} from '../../Utils/Shadows';
import {Constants} from '../../Configs/Constants';
import {Colors} from '../../Utils/Colors';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export {GoogleLogin, FacebookLogin, AppleLogin};

function AppleLogin({onPress, size = Constants.isiPad ? 80 : 50}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        style.container,
        {
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          height: size,
          width: size,
        },
      ]}>
      <FastImage source={require('../Images/apple.png')} style={{flex: 1, height: size / 2, width: size / 2}} resizeMode='contain' />
    </TouchableOpacity>
  );
}

function FacebookLogin({onPress, size = Constants.isiPad ? 80 : 50}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[style.container, {height: size, width: size}]}>
      <FastImage  source={require('../Images/facebook.png')} style={{flex: 1}} />
    </TouchableOpacity>
  );
}

function GoogleLogin({onPress, size = Constants.isiPad ? 80 : 50}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        style.container,
        {
          justifyContent: 'center',
          backgroundColor: '#fff',
          alignItems: 'center',
          width: size,
          height: size,
        },
      ]}>
      <FastImage source={require('../Images/Google.png')} style={{width: size / 2, height: size / 2, borderRadius: 100}} />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 200,
    ...shadow.s3,
  },
});
