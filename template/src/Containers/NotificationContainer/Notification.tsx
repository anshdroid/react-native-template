import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import DSBaseContainer from '../../Components/DSBaseContainer';
import {useTranslation} from 'react-i18next';
import {Fonts} from '../../Utils/Fonts';
import {Size} from '../../Utils/FontSize';
import {Colors} from '../../Utils/Colors';
import {seperator} from '../../Configs/Constants';

export const Notification = () => {
  const {t} = useTranslation();

  const renderNotificationList = () => {
    return (
      <View style={styles.listView}>
        <Text style={styles.listText}>{'Placeholder text'}</Text>
        <Text style={styles.listMessage}>{'This generator uses a dictionary of Latin words to construct passages'}</Text>
      </View>
    );
  };

  return (
    <DSBaseContainer isShowMenuButton title={t('screenTitle:notification')}>
      <FlatList style={{}} data={new Array(10).fill('0')} renderItem={renderNotificationList} ItemSeparatorComponent={seperator} />
    </DSBaseContainer>
  );
};

const styles = StyleSheet.create({
  listText: {fontFamily: Fonts.SemiBold, fontSize: Size.S, color: Colors.black},
  listMessage: {fontFamily: Fonts.SemiBold, fontSize: Size.S, color: Colors.darkGray, marginTop: 5},
  listView: {marginHorizontal: 15},
});
