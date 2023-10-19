import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../Utils/Colors';
import {Fonts} from '../../Utils/Fonts';
import {shadow} from '../../Utils/Shadows';
import {AppConstants, capitalizeFirstLetter, layoutAnimation, layoutAnimationConfig} from '../../Configs/Constants';
import DSBaseContainer from '../../Components/DSBaseContainer';
import { Size } from '../../Utils/FontSize';

const faqDaqta = [
  {
    question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    answer:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.',
  },
  {
    question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    answer:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.',
  },
];

export default function FAQ({navigation}: any) {
  const [isLoading, setLoading] = useState(false);

  const [openIndex, setIndex] = useState(-1);
  const [data, setData] = useState(faqDaqta);

  useEffect(() => {
    layoutAnimationConfig();
  }, []);

  /** SCREEN NAVIGATION */
  const OnCloseEvent = () => {
    navigation.goBack();
  };
  /** BACK EVENT */
  const renderBackButton = useMemo(() => {
    return (
      <TouchableOpacity onPress={OnCloseEvent} activeOpacity={0.8} style={[styles.backView, { top: AppConstants.safeAreaInsets.top, zIndex: 1 }]}>
        <Icon name={'close'} size={Size.L} />
      </TouchableOpacity>
    );
  }, []);

  function onChangeIndex(index: number) {
    layoutAnimation();
    setIndex(index == openIndex ? -1 : index);
  }

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={[styles.shadowContainer, { backgroundColor: openIndex == index ? Colors.offWhite : Colors.white }]}>
        <TouchableOpacity activeOpacity={1} style={[styles.rowContainer]} onPress={() => onChangeIndex(index)}>
          <Text style={styles.headingText}>{capitalizeFirstLetter(item?.question)}</Text>
          <Icon name={openIndex == index ? 'chevron-up' : 'chevron-down'} size={Size.L} color={Colors.mildBlack} />
        </TouchableOpacity>
        {openIndex == index && <Text style={styles.description}>{capitalizeFirstLetter(item.answer)}</Text>}
      </View>
    );
  };

  /** Main return */
  return (
    <DSBaseContainer title="FAQ">
      {/* SAFE AREA */}
      <FlatList
        data={data}
        renderItem={_renderItem}
        contentContainerStyle={
          {
            //  marginHorizontal: 10,
          }
        }
        ItemSeparatorComponent={() => <View style={{height: StyleSheet.hairlineWidth, backgroundColor: Colors.mildBlack}} />}
        refreshControl={<RefreshControl refreshing={false} colors={[Colors.primary]} />}
      />
    </DSBaseContainer>
  );
}

// styles
const styles = StyleSheet.create({
  verifyEmail: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: Fonts.SemiBold,
    // fontWeight: '900',
    fontSize: responsiveFontSize(2.4),
    marginHorizontal: 10,
    color: Colors.primary,
  },
  verifyText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(2.1),
    marginHorizontal: 10,
    color: Colors.textColor,
    marginTop: 20,
  },

  backView: {
    backgroundColor: Colors.white,
    ...shadow.s3,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    position: 'absolute',
  },
  headingText: {
    fontFamily: Fonts.SemiBold,
    fontSize: Size.M,
    flex: 0.98,
  },
  shadowContainer: {
    backgroundColor: '#FFF',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  description: {
    fontFamily: Fonts.Regular,
    fontSize: Size.M,
    color: Colors.mildBlack,
    marginBottom: 15,
  },
});
