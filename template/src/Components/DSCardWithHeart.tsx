import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';
import { Size } from '../Utils/FontSize';
import { shadow } from '../Utils/Shadows';
import { screenWidth } from '../Configs/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import DSAnimatedTouchable from './DSAnimatedTouchable';

const DSCardWithHeart: React.FC<{
  onPress?: () => void;
  data?: any;
}> = ({ onPress, data }) => {
  const [isWishlisted, setWishlist] = useState(false);

  const onWishlist = () => {
    setWishlist(!isWishlisted);
  };

  return (
    <DSAnimatedTouchable onPress={onPress} style={styles.mainCard}>
      <Image borderTopLeftRadius={8} borderTopRightRadius={8} source={{ uri: 'https://picsum.photos/200/300' }} resizeMode="cover" style={{ height: screenWidth * 0.3, width: screenWidth * 0.45, justifyContent: 'flex-end' }} />
      {isWishlisted ? <Icon suppressHighlighting onPress={onWishlist} name="heart" style={{ position: 'absolute', right: 10, top: 10 }} size={Size.L * 1.3} color={Colors.primary} /> : <Icon suppressHighlighting onPress={onWishlist} name="heart-outline" style={{ position: 'absolute', right: 10, top: 10 }} size={Size.L * 1.3} color={Colors.white} />}
      <View style={{ zIndex: 2, margin: 10 }}>
        <Text style={styles.ratingText}>1256</Text>
        <Text numberOfLines={1} style={styles.titleText}>
          Scrambled parts...
        </Text>
        <Text style={styles.priceText}>£250.00</Text>
      </View>
    </DSAnimatedTouchable>
  );
};

export default DSCardWithHeart;
const styles = StyleSheet.create({
  mainCard: { marginHorizontal: 10, marginVertical: 10, borderRadius: 8, ...shadow.s2, backgroundColor: Colors.white },
  ratingText: { color: Colors.primary, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2 },
  titleText: { marginVertical: 5, color: Colors.black, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2 },
  priceText: { color: Colors.cardPrice, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2 },
});
