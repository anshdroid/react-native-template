import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../Utils/Colors';
import { Constants, screenWidth } from '../Configs/Constants';
import { Dashboard } from '../Containers/DashboardContainer/Dashboard';
import { Notification } from '../Containers/NotificationContainer/Notification';
import { Account } from '../Containers/AccountContainer/Account';
import Icon from 'react-native-vector-icons/Feather';
import { Fonts } from '../Utils/Fonts';
import Profile from '../Containers/AccountContainer/Profile';
import ChangePassword from '../Containers/AccountContainer/ChangePassword';
import DSDrawerContent from '../Components/DSDrawerContent';
import { useTranslation } from 'react-i18next';
import GetInTouch from '../Containers/AccountContainer/GetInTouch';
import FAQ from '../Containers/AccountContainer/FAQ';
import WebviewScreen from '../Containers/AccountContainer/WebviewScreen';
import { Size } from '../Utils/FontSize';
import { Wishlist } from '../Containers/WishlistContainer/Wishlist';
import { EventDetails } from '../Containers/DashboardContainer/EventDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//**** WHEN IN APP SHOW ONLY TABBAR ****//
function TabNavigator() {
  const { t } = useTranslation();
  const iconsForBar = (name: string, isFocused: boolean) => {
    return <Icon name={name} size={Size.L} color={isFocused ? Colors.primary : Colors.inActive} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let image;
          if (route.name === t('screenTitle:dashboard')) {
            image = iconsForBar('home', focused === true);
          } else if (route.name === t('screenTitle:notification')) {
            image = iconsForBar('bell', focused === true);
          } else if (route.name === t('screenTitle:wishlist')) {
            image = iconsForBar('heart', focused === true);
          } else image = iconsForBar('user', focused === true);

          return image;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inActive,
        activeColor: Colors.primary,
        inactiveColor: Colors.inActive,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontSize: Size.XS * 1.1, fontFamily: Fonts.Regular, flex: 1 },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: Platform.OS == 'ios' ? responsiveHeight(10) : responsiveHeight(8),
        },
        tabBarIconStyle: {
          width: Size.L,
        },
      })}>
      <Tab.Screen options={{ headerShown: false }} name={t('screenTitle:dashboard')} component={Dashboard} />
      <Tab.Screen options={{ headerShown: false }} name={t('screenTitle:notification')} component={Notification} />
      <Tab.Screen options={{ headerShown: false }} name={t('screenTitle:wishlist')} component={Wishlist} />
      <Tab.Screen options={{ headerShown: false }} name={t('screenTitle:account')} component={AccountNavigator} />
    </Tab.Navigator>
  );
}

/** DRAWER NAVIGATOR */
// Add screens in this navigator if you want bottom bar to be visible in those screens
function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

/** DRAWER NAVIGATOR */
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DSDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: screenWidth * 0.7,
      //     backgroundColor: 'transparent',
      //     backfaceVisibility: 'visible',
        },
      }}
      useLegacyImplementation={true}>
      <Drawer.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
/** MAIN NAVIGATOR */
// Add screens in this navigator if you dont want bottom bar to be visible in those screens
function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ animation: Platform.OS == 'android' ? 'slide_from_right' : 'simple_push' }}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="GetInTouch" component={GetInTouch} options={{ headerShown: false }} />
      <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <RootNavigation />;
}

const styles = StyleSheet.create({
  active_icon: {
    fontSize: 30,
    color: Colors.primary,
  },
  inactive_icon: {
    color: Colors.gray,
    fontSize: 30,
  },
});
