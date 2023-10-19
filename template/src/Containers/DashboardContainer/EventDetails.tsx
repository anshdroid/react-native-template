import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, FlatList, RefreshControl, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {NavigationScreenOptions} from '../../Utils/PropTypes';
import {useTranslation} from 'react-i18next';
import {AppConstants, Constants, screenHeight} from '../../Configs/Constants';
import {Colors} from '../../Utils/Colors';
import {shadow} from '../../Utils/Shadows';
import {Size} from '../../Utils/FontSize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fonts} from '../../Utils/Fonts';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const text =
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some  form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

export const EventDetails = ({navigation, route}: NavigationScreenOptions) => {
  const {t} = useTranslation();

  /** BACK EVENT */
  const renderBackButton = () => {
    return (
      <TouchableOpacity onPress={OnCloseEvent} activeOpacity={0.8} style={[styles.backView, {top: AppConstants.safeAreaInsets.top, zIndex: 1}]}>
        <Icon name={'close'} size={Size.L} />
      </TouchableOpacity>
    );
  };

  const OnCloseEvent = () => {
    console.log('::');
    navigation.goBack();
  };

  //#region MAIN RETURN
  return (
    <View style={{flex: 1}}>
      {renderBackButton()}
      <Image style={{height: responsiveHeight(40)}} source={{uri: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg'}} />

      <View style={{marginHorizontal: 20, ...shadow.s4, backgroundColor: Colors.white, padding: 10, borderRadius: 8, marginTop: -60}}>
        <Text style={styles.title}>{'ZSL London Zoo'}</Text>
        <Text style={styles.ratingText}>1256</Text>
        <Text numberOfLines={1} style={styles.titleText}>
          Scrambled parts...
        </Text>
        <Text style={styles.priceText}>£250.00</Text>
      </View>

      <ScrollView style={{padding: 15}} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        {/* TITLE TEXT */}
        <Text style={styles.title}>{'ZSL London Zoo Tickets Highlights'}</Text>
        {/* DESC TEXT */}
        <Text style={styles.subTitle}>{text}</Text>
      </ScrollView>
    </View>
  );
  //#endregion
};

const styles = StyleSheet.create({
  backView: {
    backgroundColor: Colors.white,
    ...shadow.s3,
    width: Constants.isiPad ? 70 : 40,
    height: Constants.isiPad ? 70 : 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    position: 'absolute',
  },
  title: {
    textAlign: 'left',
    fontFamily: Fonts.Bold,
    fontSize: Size.L,
    color: Colors.black,
  },
  subTitle: {
    textAlign: 'left',
    marginVertical: 10,
    fontFamily: Fonts.Regular,
    fontSize: Size.M,
    color: Colors.primaryShade,
    marginTop: 20,
    lineHeight: 25,
  },
  ratingText: {color: Colors.primary, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2, marginTop: 10},
  titleText: {color: Colors.black, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2, marginTop: 4},
  priceText: {color: Colors.cardPrice, fontFamily: Fonts.SemiBold, fontSize: Size.XS * 1.2, marginTop: 4},
});
