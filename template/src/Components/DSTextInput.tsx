import {Constants, layoutAnimation, layoutAnimationConfig} from '../Configs/Constants';
import {Colors} from '../Utils/Colors';
import {Fonts} from '../Utils/Fonts';
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';
import {EyeCloseIcon, EyeOpenIcon, Search} from '../Assets/filesSVG/index';
import {useEffect} from 'react';
import {Size} from '../Utils/FontSize';
import {SearchBarProps, TextInputProps} from '../Utils/PropTypes';

export const DSTextInputWithTitle = ({
  placeholder,
  rightIcon,
  onRightIconPress,
  autoCapitalize,
  multiline,
  onChangeText,
  isParsable,
  onPress,
  value,
  error,
  keyboardType,
  selection,
  onFocus,
  containrStyle,
  textStyle,
  title,
  textRef,
  editable,
  onBlur,
  titleStyle,
  maxLength,
  autoFocus,
  isPassword,
  defaultValue,
  mainViewStyle,
}: TextInputProps) => {
  const [isFocus, setFocus] = useState(false);
  const [password, setPassword] = useState(isPassword);

  const onFocus2 = () => {
    setFocus(true);
    onFocus && onFocus();
  };

  const onBlur2 = () => {
    onBlur && onBlur();
    setFocus(false);
  };

  useEffect(() => {
    layoutAnimationConfig();
  }, []);

  if (error) {
    layoutAnimation();
  }

  return (
    <View style={{...mainViewStyle, marginBottom: Constants.isiPad ? 20 : 0}}>
      <Text
        style={{
          marginVertical: 10,
          fontSize: Size.M,
          fontFamily: Fonts.Regular,
          color: Colors.mildBlack,
          ...titleStyle,
        }}>
        {title}
      </Text>
      <View
        style={{
          borderBottomColor: isFocus ? Colors.primary : Colors.inActive,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
          height: 48,
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
          ...containrStyle,
        }}>
        <TextInput
          style={{
            color: Colors.textColor,
            fontSize: Size.S,
            flex: 1,
            fontFamily: Fonts.Medium,
            ...textStyle,
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          allowFontScaling={false}
          maxLength={maxLength}
          ref={ref => textRef && textRef(ref)}
          selection={selection}
          secureTextEntry={password}
          keyboardType={keyboardType}
          editable={editable ?? true}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          autoCapitalize={keyboardType == 'email-address' ? 'none' : autoCapitalize}
          autoCorrect={false}
          multiline={multiline}
          onFocus={onFocus2}
          onBlur={onBlur2}
          placeholderTextColor={'rgba(0,0,0,0.2)'}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{paddingRight: '2%'}}>
            {rightIcon}
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity
            onPress={() => setPassword(!password)}
            style={{
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {password ? <EyeCloseIcon /> : <EyeOpenIcon />}
          </TouchableOpacity>
        )}

        {isParsable && (
          <TouchableOpacity
            onPress={onPress}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}
      </View>

      {error && <Text style={{color: Colors.error, fontSize: Size.XS, marginTop: 2}}> {error}</Text>}
    </View>
  );
};

export const DSSearchBar = ({textStyle, containrStyle, onSubmit, onChangeText, textRef, isParsable, onPress, textProps}: SearchBarProps) => {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        ...containrStyle,
      }}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#828282"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        ref={ref => textRef && textRef(ref)}
        style={{
          color: '#000',
          fontSize: Size.M,
          flex: 1,
          fontFamily: Fonts.Medium,
          ...textStyle,
        }}
        {...textProps}
      />
      <TouchableOpacity
        onPress={onSubmit}
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#266546',
          alignSelf: 'center',
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Search size={18} color="#fff" />
      </TouchableOpacity>

      {isParsable && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  Container: {
    height: 48,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 40,
    marginHorizontal: '5%',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  ContainerTitleInput: {
    borderRadius: 0,
    borderBottomWidth: 0.6,
    // fontFamily: Fonts.Regular,
    borderColor: '#355579',
  },
  InputContainer: {
    flex: 1,
    color: '#355579',
    // fontFamily: Fonts.Regular
  },
});
