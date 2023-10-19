import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, View, SafeAreaView, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';
import { STORAGE, screenWidth } from '../Configs/Constants';
import { setUserLoggedInFlag } from '../Store/Reducer';
import { showAlertWithCompletionAndDestructiveCallback } from '../Utils/Common';
import { useTranslation } from 'react-i18next';
import { Size } from '../Utils/FontSize';

const ImageSize = screenWidth * 0.3;

export default function DSDrawerContent({ navigation }: any) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const SideMenuData = [
    {
      title: t('screenTitle:dashboard'),
      id: 1,
    },
    {
      title: t('sideMenu:myProfile'),
      id: 2,
    },
    {
      title: t('sideMenu:changePassword'),
      id: 6,
    },
    {
      title: t('sideMenu:getInTouch'),
      id: 4,
    },
    {
      title: t('sideMenu:aboutUs'),
      id: 5,
    },

    {
      title: t('sideMenu:faq'),
      id: 7,
    },
    {
      title: t('sideMenu:privacyPolicy'),
      id: 8,
    },
    {
      title: t('sideMenu:termsCondition'),
      id: 9,
    },
    {
      title: t('sideMenu:deleteAccount'),
      id: 10,
    },
    {
      title: t('sideMenu:logout'),
      id: 11,
    },
  ];

  function onMenuPressed(flag: string) {
    switch (flag) {
      case t('screenTitle:dashboard'):
        navigation.navigate('Dashboard');
        break;
      case t('sideMenu:getInTouch'):
        navigation.navigate('GetInTouch');
        break;
      case t('sideMenu:aboutUs'):
        navigation.navigate('WebviewScreen', {
          params: {
            title: 'About Us',
            url: 'https://www.google.com',
          },
        });
        break;
      case t('sideMenu:changePassword'):
        navigation.navigate('ChangePassword');
        break;
      case t('sideMenu:myProfile'):
        navigation.navigate('Profile');
        break;
      case t('sideMenu:faq'):
        navigation.navigate('FAQ');
        break;
      case t('sideMenu:privacyPolicy'):
        navigation.navigate('WebviewScreen', {
          params: {
            title: 'Privacy Policy',
            url: 'https://www.google.com',
          },
        });
        break;
      case t('sideMenu:termsCondition'):
        navigation.navigate('WebviewScreen', {
          params: {
            title: 'Terms & Conditions',
            url: 'https://www.google.com',
          },
        });
        break;
      case t('sideMenu:deleteAccount'):
        showConsentForAccountDelete();
        break;
      case t('sideMenu:logout'):
        onSideMenuLogoutPressed();
        // LOGOUT
        break;
      default:
        break;
    }
    closeDrawer();
  }

  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  /** RENDER HEADER */
  const renderHeader = useMemo(() => {
    return (
      <View style={{ height: screenWidth * 0.3 + 20, backgroundColor: Colors.primary, marginVertical: 50, marginRight: 50, borderTopRightRadius: 200, borderBottomRightRadius: 200 }}>
        <View style={styles.circleView}>
          <Image
            style={styles.circularImageWithBorder}
            source={{
              uri: 'https://picsum.photos/200/300',
            }}
            resizeMode={'cover'}
          />
        </View>
      </View>
    );
  }, []);

  /** ON LOGOUT EVENT */
  const onSideMenuLogoutPressed = () => {
    AsyncStorage.removeItem(STORAGE.USER_DETAILS).then(() => {
      dispatch(setUserLoggedInFlag(false));
    });
  };

  /** DELETE ACCOUNT */
  const showConsentForAccountDelete = () => {
    showAlertWithCompletionAndDestructiveCallback(t('message:deleteAccount'), t('message:deleteAccMsg'), t('general:cancel'), t('general:okay'), 1, cancelCallback, deleteAccount);
  };

  /** CANCEL */
  const cancelCallback = () => {};

  /** DELETE ACCOUNT */
  const deleteAccount = () => {
    console.log('::: DELETE ACCOUNT HERE :::');
  };

  /** RENDER LIST */
  const renderMenuList = ({ item, index }) => (
    <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 20 }} onPress={() => onMenuPressed(item.title)}>
      <Text style={{ fontSize: Size.L, color: Colors.primary, fontFamily: Fonts.Regular }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* LIST */}
      <View style={{ width: screenWidth * 0.7, backgroundColor: Colors.white }}>
        {/* PROFILE HEADER */}
        {renderHeader}

        <FlatList data={SideMenuData} contentContainerStyle={{ alignItems: 'center' }} renderItem={renderMenuList} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  circularImageWithBorder: {
    width: ImageSize - 6,
    height: ImageSize - 6,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: ImageSize,
    marginBottom: 2,
  },
  circleView: {
    width: ImageSize,
    height: ImageSize,
    borderRadius: ImageSize,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
