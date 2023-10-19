import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, useWindowDimensions, View, ViewStyle} from 'react-native';
import {AppConstants, layoutAnimationConfig} from '../Configs/Constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../Utils/Colors';
import {DSWalkthroughDots as DSWalkthroughDotsType} from '../Utils/PropTypes';

const DSWalkthroughDots = ({numOfDots, activeIndex}: DSWalkthroughDotsType) => {
  const safeAreaInsets = useSafeAreaInsets();

  const {Value} = Animated;

  const animationsColor = [...new Array(numOfDots)].map(() => new Value(0));

  const animateCell = ({index}) => {
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: 1,
      duration: 250,
    }).start();
  };

  return (
    <View style={[styles.containerStyle, {top: safeAreaInsets.top}]}>
      {numOfDots.map((dots, index) => {

        return (
          <Animated.View
            key={index}
            style={[
              styles.dotView,
              {
                width: AppConstants.SCREEN_WIDTH / numOfDots.length - 12,
                backgroundColor: activeIndex == index ? Colors.primary : 'rgba(52, 52, 52, 0.5)',
              },
            ]}></Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',

    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotView: {
    height: 15,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    marginHorizontal: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default DSWalkthroughDots;
