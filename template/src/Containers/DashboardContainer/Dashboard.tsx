import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationScreenOptions } from '../../Utils/PropTypes';
import { homeData } from '../../Utils/StaticArray';
import DSBaseContainer from '../../Components/DSBaseContainer';
import { useTranslation } from 'react-i18next';
import DSCardWithHeart from '../../Components/DSCardWithHeart';
import DSRightLeftText from '../../Components/DSRightLeftText';
import DSGradientCard from '../../Components/DSGradientCard';
import { screenWidth } from '../../Configs/Constants';
import { Colors } from '../../Utils/Colors';

export const Dashboard = ({ navigation, route }: NavigationScreenOptions) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [data, setData] = useState<any>([]);
  const [pageNumber, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const data = getDataBasedOnPagination(1);
    setData(data);

    /** ONLY FOR SHOWING LOADING REMOVE WHEN IN PRODUCTION */
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  /** GET STATIC DATA WHEN IN STATIC MODE */
  const getDataBasedOnPagination = (pageNumber = 1) => {
    const data = homeData.slice((pageNumber - 1) * 10, pageNumber * 10);
    return data;
  };

  /** LOAD MORE BASE ON THE PAGE NUMBER */
  const onLoadMoreData = () => {
    const dataPaginated = getDataBasedOnPagination(pageNumber + 1);
    setData([...data, ...dataPaginated]);
    setPage(pageNumber + 1);
  };

  /** PULL TO REFRESH */
  const onPullToRefresh = () => {
    setIsRefreshing(true);
    setData(getDataBasedOnPagination());

    // Time out for showing the refresh no need when in production
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const onEventDetails = () => {
    navigation.navigate('EventDetails');
  };

  //#region MAIN RETURN
  return (
    <DSBaseContainer isLoading={isLoading} isShowMenuButton title={t('screenTitle:dashboard')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* EXPLORE NEARBY */}
        <DSRightLeftText leftText="Explore nearby" rightText="view all" />
        <FlatList showsHorizontalScrollIndicator={false} horizontal data={data} onEndReached={onLoadMoreData} renderItem={({ item, index }) => <DSCardWithHeart onPress={onEventDetails} />} />

        {/* OUR CATEGORY */}
        <DSRightLeftText leftText="Our Categories" rightText="view all" />
        <FlatList showsHorizontalScrollIndicator={false} horizontal data={data} renderItem={({ item, index }) => <DSGradientCard onPress={onEventDetails} />} />

        {/* FEATURED */}
        <View style={{ backgroundColor: Colors.offWhite, paddingBottom: 20 }}>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={data} renderItem={({ item, index }) => <DSGradientCard onPress={onEventDetails} width={screenWidth * 0.8} />} />
        </View>
      </ScrollView>
    </DSBaseContainer>
  );
  //#endregion
};
