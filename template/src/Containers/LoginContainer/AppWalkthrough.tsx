import '../../Locales/i18n';
import React, {useEffect, useMemo} from 'react';
import {View, Animated, StyleSheet, Dimensions, Text, ImageBackground} from 'react-native';
import DSLinearGradient from '../../Components/DSLinearGradient';
import DSThemeButton from '../../Components/DSThemeButton';
import {Placeholders} from '../../Utils/Placeholder';
import DSWalkthroughDots from '../../Components/DSWalkthroughDots';
import {useState} from 'react';
import {Fonts} from '../../Utils/Fonts';
import {Colors} from '../../Utils/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Constants, STORAGE, layoutAnimation, layoutAnimationConfig, screenHeight, screenWidth} from '../../Configs/Constants';
import {Size} from '../../Utils/FontSize';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setSeenIntroScreens} from '../../Store/Reducer';

const numOfScreens = [
  {
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    title: 'Lorem Ipsum is simply dummy text',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  },
  {
    image: 'https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    title: 'Lorem Ipsum is simply dummy text',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  },
  {
    image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?cs=srgb&dl=pexels-jacob-colvin-1761279.jpg&fm=jpg',
    title: 'Lorem Ipsum is simply dummy text',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  },
  {
    image: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?cs=srgb&dl=pexels-simon-berger-1266810.jpg&fm=jpg',
    title: 'Lorem Ipsum is simply dummy text',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  },
];

/** DUMMY SCREEN COMPONENT */
const Screen = props => {
  return (
    <View key={props.index} style={styles.scrollPage}>
      <Animated.View style={[styles.screen]}>
        {/* BACKGROUND IMAGE */}
        <ImageBackground source={{uri: props.screen.image}} resizeMode="cover" style={{height: screenHeight, width: screenWidth}}>
          <View style={styles.textView}>
            <View style={styles.shadowView}>
              {/* TITLE */}
              <Text style={styles.titleText}>{props.screen.title}</Text>

              {/* SUBTITLE */}
              <Text style={styles.subtitleText}>{props.screen.subtitle}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* BOTTOM GRADIENT */}
        <DSLinearGradient height={screenWidth * 0.5} />
      </Animated.View>
    </View>
  );
};

/** MAIN FUNCTION */
const AppWalkthrough = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  /** SAFE INSETS */
  const safeInsets = useSafeAreaInsets();

  const dispatch = useDispatch();

  /** USE EFFECT FOR ANIMATION DOTS */
  useEffect(() => {
    layoutAnimationConfig();
  }, []);

  /** HANDLER SCROLL ON SCREEN */
  const handleOnScroll = event => {
    const n = Number(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);

    if (n === +n && Math.round(n) === (Math.round(n) | 0)) {
      setActiveIndex(Math.round(n));
      layoutAnimation();
    }
  };

  /** GET STARTED EVENT */
  const onGetStartedEventHandler = () => {
    AsyncStorage.setItem(STORAGE.SEEN_WELCOME, '1');
    dispatch(setSeenIntroScreens(true));
  };

  /** TRANSLATIONS   */
  const {t, i18n} = useTranslation();

  /** BOTTOM BUTTON */
  const RenderButtonToGetStarted = useMemo(() => {
    return <DSThemeButton onPress={onGetStartedEventHandler} title={t('Welcome:getStarted')} buttonStyle={{position: 'absolute', bottom: safeInsets.bottom * (Constants.isiPad ? 3.5 : 1.5) + 10}} />;
  }, []);

  /** MAIN RETURN */
  return (
    <View style={{flex: 1}}>
      <Animated.ScrollView bounces={false} ref={ref => (scrollRef = ref)} scrollEventThrottle={16} showsHorizontalScrollIndicator={false} horizontal onScroll={e => handleOnScroll(e)} pagingEnabled>
        {numOfScreens.map((screen, index) => {
          return <Screen key={index} screen={screen} index={index} />;
        })}
      </Animated.ScrollView>
      {/* TOP SLIDERS */}
      <DSWalkthroughDots activeIndex={activeIndex} numOfDots={numOfScreens} />

      {/* SKIP BUTTON */}
      <Text suppressHighlighting onPress={onGetStartedEventHandler} style={[styles.skipText, {top: safeInsets.top + 30}]}>
        {t('Welcome:skip') + ' >>'}
      </Text>

      {/* BUTTON */}
      {RenderButtonToGetStarted}
    </View>
  );
};

export default AppWalkthrough;

/** STYLESHEET */
const styles = StyleSheet.create({
  scrollPage: {
    width: screenWidth,
    height: screenHeight,
  },
  screen: {
    height: screenHeight,
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  textView: {
    flex: 0.85,
    justifyContent: 'flex-end',
    marginHorizontal: 15,
  },
  titleText: {
    fontFamily: Fonts.Bold,
    fontSize: Size.XL,
  },
  subtitleText: {
    fontFamily: Fonts.Bold,
    fontSize: Size.M,
    marginTop: 20,
  },
  shadowView: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: {height: 5, width: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  skipText: {position: 'absolute', right: 20, fontSize: Size.S, fontFamily: Fonts.Regular, textDecorationLine: 'underline', color: Colors.primary},
});
