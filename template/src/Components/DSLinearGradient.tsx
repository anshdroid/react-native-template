import React from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../Utils/Colors';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const DSLinearGradient = ({height, width = SCREEN_WIDTH}) => {
  return (
    <LinearGradient
      colors={['#00000000', '#000000']}
      //      colors={[Colors.black, 'rgba(255, 255,255, 0)']}
//      start={{x: 0, y: 1.1}}
//      end={{x: 0, y: 0}}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height,
        width: width,
        borderRadius: 8,
      }}></LinearGradient>
  );
};

export default DSLinearGradient;
