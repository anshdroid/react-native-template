import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../Utils/Colors';
import ReactNativeModal from 'react-native-modal';
import {Fonts} from '../Utils/Fonts';
import { Size } from '../Utils/FontSize';

const DSActivityIndicator: React.FC<{
  isLoading: boolean;
  title?: string;
}> = ({isLoading = false, title = 'Loading...'}) => (
  <ReactNativeModal backdropOpacity={0.2} isVisible={isLoading}>
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={isLoading} color={Colors.primary} size="large" />
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  </ReactNativeModal>
);

export default DSActivityIndicator;
const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
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
    color: Colors.primary,
    fontFamily: Fonts.Medium,
  },
});
