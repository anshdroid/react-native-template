import {Alert, Keyboard, Modal, ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Animated, NativeModules, SafeAreaView} from 'react-native';
import React, {memo, useState} from 'react';
import {Colors} from '../Utils/Colors';
import {Size} from '../Utils/FontSize';

const RANGE = 6;

const OTPInputVerification = () => {
  var input_ref = React.useRef<any>(null);

  const [otp, setOtp] = useState({});
  const [active_index, setActiveIndex] = useState<any>(undefined);

  const animationsScale = [...new Array(RANGE)].map(() => new Animated.Value(1));

  /** CLICK ON CODE INPOUT */
  const onClickView = (position: any) => {
    setActiveIndex(position);
    setTimeout(() => {
      input_ref.current.focus();
    }, 100);
  };

  const onKeyPress = ({nativeEvent}: any) => {
    const {key} = nativeEvent;
    const prev = {...otp};

    // Call when Remove value
    if (key == 'Backspace') {
      prev[active_index + 'OTP'] = undefined;
      if (active_index == 0) {
        setOtp(prev);
        return;
      }
      setActiveIndex(active_index - 1);
      setOtp(prev);
      return;
    }
    // Call when add value
    if (active_index < RANGE) {
      if (key.length == 1) {
        prev[active_index + 'OTP'] = key;
        setOtp(prev);
        setActiveIndex(active_index + 1);
        if (active_index + 1 == RANGE) Keyboard.dismiss();
      }
    } else {
      Keyboard.dismiss();
    }
  };

  /** TEXT CHANGES */
  const onTextInput = (event: any) => {
    if (event.nativeEvent.text && event.nativeEvent.text >= 0 && event.nativeEvent.text <= 9) {
      onKeyPress({nativeEvent: {key: event.nativeEvent.text}});
    } else if (event.nativeEvent.text == '') {
      onKeyPress({nativeEvent: {key: 'Backspace'}});
    }
  };

  /** BOX VIEW  */
  const OptViewer = ({value = undefined, isActive, onPress}: any) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.otpBoxView, {borderColor: isActive || value ? Colors.mildBlack : Colors?.inActive}]}>
          <Text allowFontScaling={false} style={[styles.otpText, {color: Colors.mildBlack, opacity: value ? 1 : 0.15}]}>
            {value ? value : '-'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /** INPUT TEXT FOR CODE */
  const _otpInput = () => {
    return (
      <View style={styles.inputStyle}>
        {/* FIELDS ARR */}
        {new Array(RANGE).fill(1).map((item, key) => (
          <OptViewer animationsScale={animationsScale} key={key.toString()} value={otp[key + 'OTP']} onPress={() => onClickView(key)} isActive={active_index == key} activeIndex={key} />
        ))}
        <TextInput ref={input_ref} onTextInput={onTextInput} allowFontScaling={false} keyboardType="numeric" style={{height: 0, width: 0}} />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* INPUT FIELDS */}
      {_otpInput()}
    </View>
  );
};

export default memo(OTPInputVerification);

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-around',
  },
  otpBoxView: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  otpText: {
    fontWeight: 'bold',
    fontSize: Size.XL * 1.5,
  },
});
