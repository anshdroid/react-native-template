import React, { useEffect, useRef, useState } from 'react';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { StyleProp, StyleSheet, Text, View, ViewStyle, Animated, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';
import { useNavigation } from '@react-navigation/native';
import { AppConstants, layoutAnimation, layoutAnimationConfig, screenWidth } from '../Configs/Constants';
import { NavigationOptions } from '../Utils/PropTypes';
import { Size } from '../Utils/FontSize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

type Props = {
  title: string;
  children?: any;
  isShowBackButton?: boolean;
  isShowAddButton?: boolean;
  onAddPressEvent?: () => any;
  onBack?: () => any;
  mainContentStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  titleStyle?: ViewStyle;
  isShowMenuButton?: boolean;
  isShowIcons?: boolean;
};

const DSBaseContainer: React.FC<Props> = ({ title, children, isShowMenuButton, mainContentStyle, titleStyle, isLoading, isShowIcons }) => {
  const navigation: NavigationOptions = useNavigation();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isLoading) layoutAnimationConfig();
  }, []);

  /** BACK EVENT */
  const onBackPressEvent = () => {
    navigation.goBack();
  };

  /** MENU EVENT */
  const onMenuPressEvent = () => {
    navigation.openDrawer();
  };

  /** NOTIFICATION EVENT */
  const onNotificationIconEvent = () => {
    navigation.navigate('Notification');
  };

  if (isLoading) {
    layoutAnimation();
  }

  return (
    <View pointerEvents={isLoading ? 'none' : 'auto'} style={[styles.parentView, { paddingTop: Platform.OS == 'ios' ? insets.top : 0 }]}>
      <View style={styles.spaceView}>
        <View style={styles.mainView}>
          {/* BACK OR MENU ICON */}
          {isShowMenuButton ? <Icon suppressHighlighting={true} onPress={onMenuPressEvent} style={{ marginLeft: 10 }} name={'menu'} size={Size.XL} color={Colors.black} /> : <Icon suppressHighlighting={true} onPress={onBackPressEvent} style={{ marginLeft: 10 }} name={'keyboard-backspace'} size={Size.XL} color={Colors.black} />}

          {/*TITLE*/}
          <Text
            style={{
              fontFamily: Fonts.Medium,
              fontSize: Size.L,
              marginHorizontal: 15,
              color: Colors.black,
              alignSelf: 'center',
              flex: 1,
              ...titleStyle,
            }}>
            {title}
          </Text>

          {/* ICONS VIEW */}
        </View>
        {isShowIcons && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
            <Feather suppressHighlighting={true} onPress={onNotificationIconEvent} name={'bell'} size={Size.XL} />
          </View>
        )}
      </View>
      {isLoading && <Progress.Bar borderRadius={0} borderWidth={0} width={null} height={4} color={Colors.primary} indeterminate indeterminateAnimationDuration={1000} />}

      {/* CHILDREN */}
      <View style={{ backgroundColor: Colors.white, flex: 1, ...mainContentStyle }}>{children}</View>
    </View>
  );
};

export default DSBaseContainer;

const styles = StyleSheet.create({
  shadowView: {
    shadowOffset: {
      height: 5,
      width: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 3,
    borderRadius: 50,
    shadowColor: Colors.mildBlack,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 3,
    height: responsiveWidth(15),
    alignContent: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    flex: 1,
  },
  spaceView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.white },
  parentView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
