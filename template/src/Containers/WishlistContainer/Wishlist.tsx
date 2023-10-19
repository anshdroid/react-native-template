import React from 'react';

import {FlatList, Image, ImageBackground, Text, View} from 'react-native';
import DSBaseContainer from '../../Components/DSBaseContainer';
import {useTranslation} from 'react-i18next';
import {screenHeight, screenWidth, seperator} from '../../Configs/Constants';
import DSLinearGradient from '../../Components/DSLinearGradient';
import {Colors} from '../../Utils/Colors';
import {Fonts} from '../../Utils/Fonts';
import {Size} from '../../Utils/FontSize';
import DSGradientCard from '../../Components/DSGradientCard';

export const Wishlist = () => {
  const {t} = useTranslation();

  const renderWishlist = ({item, index}) => {
    return <DSGradientCard />;
  };

  return (
    <DSBaseContainer isShowMenuButton title={t('screenTitle:wishlist')}>
      <FlatList numColumns={2} data={new Array(12).fill('')} renderItem={renderWishlist} />
    </DSBaseContainer>
  );
};
