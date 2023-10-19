import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../Utils/Colors';
import ReactNativeModal from 'react-native-modal';
import {Fonts} from '../Utils/Fonts';
import {Size} from '../Utils/FontSize';
import {RightLeftInterface} from '../Utils/PropTypes';

const DSRightLeftText: React.FC<RightLeftInterface> = ({rightText, leftText, onRight, onLeft}) => (
  <View style={styles.loadingContainer}>
    <Text style={styles.textStyle}>{leftText}</Text>
    <Text style={styles.rightText}>{rightText}</Text>
  </View>
);

export default DSRightLeftText;
const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveWidth(20),
    width: responsiveWidth(20),
  },
  textStyle: {
    marginVertical: 12,
    fontSize: Size.L,
    color: Colors.black,
    fontFamily: Fonts.Medium,
  },
  rightText: {
    marginVertical: 12,
    fontSize: Size.M,
    color: Colors.mediumGray,
    fontFamily: Fonts.Medium,
  },
});
