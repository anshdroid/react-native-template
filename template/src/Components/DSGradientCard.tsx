import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';
import { Size } from '../Utils/FontSize';
import DSLinearGradient from './DSLinearGradient';
import { screenWidth } from '../Configs/Constants';
import { shadow } from '../Utils/Shadows';
import DSAnimatedTouchable from './DSAnimatedTouchable';
import Icon from 'react-native-vector-icons/Ionicons';

const DSGradientCard: React.FC<{
  width?: number;
  onPress?: () => void;
}> = ({ onPress, width = screenWidth * 0.45 }) => {
  const [isWishlisted, setWishlist] = useState(false);

  const onWishlist = () => {
    setWishlist(!isWishlisted);
  };

  return (
    <DSAnimatedTouchable onPress={onPress} style={styles.mainCard}>
      <ImageBackground borderRadius={8} source={{ uri: 'https://picsum.photos/200/300' }} resizeMode="cover" style={{ height: screenWidth * 0.5, width: width, justifyContent: 'flex-end' }}>
        {isWishlisted ? <Icon suppressHighlighting onPress={onWishlist} name="heart" style={{ position: 'absolute', right: 10, top: 10 }} size={Size.L * 1.3} color={Colors.primary} /> : <Icon suppressHighlighting onPress={onWishlist} name="heart-outline" style={{ position: 'absolute', right: 10, top: 10 }} size={Size.L * 1.3} color={Colors.white} />}

        <View style={{ zIndex: 2, margin: 10 }}>
          <Text style={styles.ratingText}>1256</Text>
          <Text numberOfLines={1} style={styles.titleText}>
            Scrambled parts...
          </Text>
          <Text style={styles.priceText}>£250.00</Text>
        </View>
        <View style={{ zIndex: 1 }}>
          <DSLinearGradient height={screenWidth * 0.4} width={width} />
        </View>
      </ImageBackground>
    </DSAnimatedTouchable>
  );
};

export default DSGradientCard;
const styles = StyleSheet.create({
  mainCard: { marginHorizontal: 10, marginVertical: 10, borderRadius: 8, backgroundColor: Colors.white, ...shadow.s3 },
  ratingText: { color: Colors.primary, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2 },
  titleText: { marginVertical: 5, color: Colors.white, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2 },
  priceText: { color: Colors.cardPrice, fontFamily: Fonts.Medium, fontSize: Size.XS * 1.2 },
});
