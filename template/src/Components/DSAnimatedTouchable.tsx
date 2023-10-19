import {Vibration, StyleSheet, Text, View, Animated, Easing, TouchableOpacity, InteractionManager} from 'react-native';
import React, {memo, useEffect} from 'react';

const TouchAnimation = Animated.createAnimatedComponent(TouchableOpacity);

const DSAnimatedTouchable = ({onPress = () => {}, children, style = {}, disable = false, scale = 0.98, forceBounce = false, onLongPress = () => {}}) => {
  const AnimationButton = React.useRef(new Animated.Value(0)).current;

  const animateButton = (toValue: number, cb = () => {}) => {
    Animated.timing(AnimationButton, {
      useNativeDriver: true,
      toValue,
      duration: 80,
      easing: Easing.bounce,
    }).start(cb);
  };

  useEffect(() => {
    if (!!forceBounce) {
      Animated.timing(AnimationButton, {
        useNativeDriver: true,
        toValue: 1,
        duration: 100,
        easing: Easing.bounce,
      }).start(() => {
        Animated.timing(AnimationButton, {
          useNativeDriver: true,
          toValue: 0,
          duration: 100,
          easing: Easing.bounce,
        }).start();
      });
    }
  }, [forceBounce]);

  return (
    <TouchAnimation
      onLongPress={onLongPress}
      delayLongPress={1000}
      activeOpacity={0.8}
      disabled={disable}
      style={[
        {
          transform: [
            {
              scale: AnimationButton.interpolate({
                inputRange: [0, 1],
                outputRange: [1, scale],
              }),
            },
          ],
        },
        style,
      ]}
      onPressIn={() => {
        animateButton(1, () => {});
      }}
      onPressOut={() => {
        animateButton(0, () => {});
      }}
      onPress={() => {
        animateButton(0, () => {
          onPress();
        });
      }}>
      {children}
    </TouchAnimation>
  );
};

export default memo(DSAnimatedTouchable);

const styles = StyleSheet.create({});
