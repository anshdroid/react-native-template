import React, { useEffect, useMemo } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AccountContact, AccountDelete, AccountFaq, AccountHome, AccountLogout, AccountPassword, AccountPolicy, AccountRefer, AccountReward } from '../../Assets/filesSVG';
import { Colors } from '../../Utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserLoggedInFlag } from '../../Store/Reducer';
import { Constants, STORAGE, screenWidth, seperator } from '../../Configs/Constants';
import { showAlertWithCompletionAndDestructiveCallback } from '../../Utils/Common';
import { useTranslation } from 'react-i18next';
import { Size } from '../../Utils/FontSize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Images } from '../../Assets';
import DSThemeButton from '../../Components/DSThemeButton';
import { shadow } from '../../Utils/Shadows';
import { hideActionSheet, showActionSheet } from '../../Components/DSActionSheet';
import i18n from '../../Locales/i18n';

const profile = 'https://media.istockphoto.com/id/1366180804/photo/profile-of-male-with-hairdo-and-red-beard-looks-aside-with-serious-expression.jpg?s=612x612&w=0&k=20&c=aVmQjSHbHa_vrKRLDOtSyQDlFXC1sj6yWeQV8OrJ_1E=';
const ImageSize = !Constants.isiPad ? screenWidth * 0.3 : screenWidth * 0.25;

export const Account = ({ navigation }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    return () => hideActionSheet();
  }, []);

  /** STATIC ARRAY OF LISTING */
  const ProfileMenuData = [
    {
      id: '2',
      title: t('sideMenu:changePassword'),
      screenName: 'ChangePassword',
      icon: <AccountPassword />,
    },
    {
      id: '9',
      title: t('sideMenu:changeLang'),
      screenName: 'changeLang',
      icon: <AccountPassword />,
    },
    {
      id: '3',
      title: t('sideMenu:getInTouch'),
      screenName: 'GetInTouch',
      icon: <AccountContact />,
    },
    {
      id: '7',
      title: t('sideMenu:faq'),
      screenName: 'FAQ',
      icon: <AccountFaq />,
    },
    {
      id: '4',
      title: t('sideMenu:privacyPolicy'),
      icon: <AccountPolicy />,
      screenName: 'WebviewScreen',
      params: { title: 'Privacy Policy', url: 'https://www.google.com' },
    },
    {
      id: '8',
      title: t('sideMenu:aboutUs'),
      icon: <AccountContact />,
      screenName: 'WebviewScreen',
      params: { title: 'About Us', url: 'https://www.google.com' },
    },
    {
      id: '5',
      title: t('sideMenu:deleteAccount'),
      icon: <AccountDelete />,
      screenName: 'deleteAccount',
    },
    {
      id: '6',
      title: t('sideMenu:logout'),
      screenName: '',
      icon: <AccountLogout />,
    },
  ];

  /** MENU */
  const ProfileMenu = (item: any, index: number) => {
    return (
      <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => navigateToDesiredScreen(item.screenName, item)} style={styles.profileMenuView}>
        <View style={styles.itemView}>
          <View style={styles.itemSubView}>
            {/* ICON */}
            {item.icon}

            <Text style={styles.itemText}>{item.title}</Text>
          </View>

          <MaterialIcons name="keyboard-arrow-right" size={Size.L} color={Colors.textColor} />
        </View>
      </TouchableOpacity>
    );
  };

  /** LOGS OUT USER */
  const onLogout = () => {
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

  /** NAVIGATION */
  const navigateToDesiredScreen = (screenName: any, item: any) => {
    hideActionSheet();
    if (screenName == '') {
      onLogout();
    } else if (screenName == 'deleteAccount') {
      showConsentForAccountDelete();
    } else if (screenName == 'changeLang') {
      showActionSheetForLanChange();
    } else navigation.navigate(screenName, { params: item?.params });
  };

  /** LANGUAGE CHANGE ACTION SHEET */
  const showActionSheetForLanChange = () => {
    showActionSheet(t('general:selectLang'), [t('general:english'), t('general:french')], selected => onChangeLanguage(selected));
  };

  /** CHANGE LANGUAGE */
  const onChangeLanguage = (lang: string) => {
    const slug = lang == t('general:english') ? 'en' : 'fr';
    i18n
      .changeLanguage(slug)
      .then(() => {
        AsyncStorage.setItem(STORAGE.LANGUAGE, i18n.language);
      })
      .catch(err => console.log(err));
  };

  const navigateToProfile = () => {
    hideActionSheet();
    navigation.navigate('Profile');
  };

  const renderProfileDetails = useMemo(() => {
    return (
      <View style={{ marginTop: 40, backgroundColor: Colors.white, zIndex: 2 }}>
        <Text style={{ fontFamily: Fonts.Bold, fontSize: Size.L, alignSelf: 'center' }}>{'Anna Lindrum'}</Text>
        <Text style={{ fontFamily: Fonts.Regular, fontSize: Size.M, alignSelf: 'center', color: Colors.mediumGray, marginTop: 5 }}>{'AnnaLindrum@armyspy.com'}</Text>
        <DSThemeButton onPress={navigateToProfile} buttonStyle={{ width: ImageSize * 1.3, borderRadius: 5, height: responsiveHeight(5), marginTop: 10 }} title={t('sideMenu:editProfile')} />
      </View>
    );
  }, []);

  /** IMAGE CIRCULAR VIEW */
  const renderImageHeader = useMemo(() => {
    return (
      <View style={{ zIndex: 2 }}>
        <View style={{}}>
          <Image source={{ uri: profile }} style={{ height: responsiveHeight(25) }} />
          <Image source={Images.overlayImage} style={{ height: responsiveHeight(25), position: 'absolute', width: responsiveWidth(100) }} />
          <View style={[styles.circleView, { left: responsiveWidth(50) - ImageSize / 2 }]}>
            <Image style={styles.circularImageWithBorder} source={{ uri: profile }} resizeMode={'cover'} />
          </View>
        </View>
        {renderProfileDetails}
      </View>
    );
  }, []);

  /** MAIN RETURN */
  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      {renderImageHeader}
      <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
        {ProfileMenuData.map((item, index) => ProfileMenu(item, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileMenuView: {
    ...shadow.s2,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    padding: responsiveWidth(3),
    alignContent: 'center',
    justifyContent: 'center',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemSubView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    marginStart: 20,
    fontSize: Size.M,
    textAlign: 'justify',
    color: Colors.textColor,
    fontFamily: Fonts.Regular,
  },
  circularImageWithBorder: {
    width: ImageSize - 6,
    height: ImageSize - 6,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: ImageSize / 2,
    marginBottom: 2,
  },
  circleView: {
    width: ImageSize,
    height: ImageSize,
    borderRadius: ImageSize / 2,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -30,
  },
});
