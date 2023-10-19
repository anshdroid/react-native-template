import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppConstants, Constants, screenHeight, seperator } from '../Configs/Constants';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform, FlatList } from 'react-native';
import { Fonts } from '../Utils/Fonts';
import { Colors } from '../Utils/Colors';
import { Size } from '../Utils/FontSize';
import { shadow } from '../Utils/Shadows';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const initialActionSheet = {
  title: '',
  data: [],
  visible: false,
  onPress: null,
};

const ActionSheetContext = React.createContext({});

class StaticActionSheet {
  static actionSheet: any = null;
}

const ActionSheetProvider = ({ children }: any) => {
  const [actionSheet, setActionSheet] = React.useState(initialActionSheet);

  const show = React.useCallback(args => {
    setActionSheet({ ...initialActionSheet, visible: true, ...args });
  }, []);

  const hide = React.useCallback(() => {
    setActionSheet({ ...actionSheet, visible: false });
  }, [actionSheet]);

  return (
    <ActionSheetContext.Provider
      value={{
        hide,
        show,
        actionSheet,
      }}>
      {children}
    </ActionSheetContext.Provider>
  );
};

const height = 80;

function CustomActionSheet() {
  const insets = useSafeAreaInsets()?.bottom || 20;
  const actionSheetAnimation = React.useRef(new Animated.Value(0)).current;
  const { actionSheet, hide, show }: any = React.useContext(ActionSheetContext);

  React.useEffect(() => {
    StaticActionSheet.actionSheet = show;

    if (actionSheet.visible) {
      togglePopup(1);
    } else {
      togglePopup(0);
    }
  }, [actionSheet]);

  const togglePopup = (toValue = 0) => {
    Animated.spring(actionSheetAnimation, { toValue, useNativeDriver: true }).start();
  };

  const onPress = (item: any) => {
    if (typeof actionSheet.onPress == 'function') {
      actionSheet.onPress(item);
    }
    hide();
  };

  const translateY = actionSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, 0],
  });

  const CancelButton = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => hide()} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: Colors.white, paddingVertical: responsiveWidth(2.5), marginHorizontal: 15, ...shadow.s10 }}>
        <Text style={[style.textStyle, { color: Colors.error, fontFamily: Fonts.SemiBold }]}>{'Cancel'}</Text>
      </TouchableOpacity>
    );
  };

  const renderActionList = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginHorizontal: 15 }}>
        <Text style={style.textStyle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      style={[
        style.container,
        {
          transform: [{ translateY }],
          zIndex: 10000,
          flex: 1,
          paddingBottom: AppConstants.safeAreaInsets.bottom + 10,
          justifyContent: 'flex-end',
        },
      ]}>
      <View>
        <FlatList
          bounces={false}
          ListHeaderComponent={<Text style={style.headingStyle}>{actionSheet.title}</Text>}
          ItemSeparatorComponent={() => <View style={{ marginVertical: responsiveWidth(2), height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />}
          contentContainerStyle={{ borderRadius: 10, overflow: 'hidden', padding: 10, backgroundColor: Colors.white, marginHorizontal: 15, marginBottom: 10, ...shadow.s10, flexGrow: 1 }}
          data={actionSheet.data}
          renderItem={renderActionList}
        />
      </View>

      {CancelButton()}
    </Animated.View>
  );
}

const DSActionSheet = () => {
  return (
    <ActionSheetProvider>
      <CustomActionSheet />
    </ActionSheetProvider>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,

    //     flex: 1
  },
  actionSheetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },

  headingStyle: {
    fontSize: Size.M,
    fontFamily: Fonts.Regular,
    lineHeight: 27,
    alignSelf: 'center',
    marginBottom: responsiveWidth(2.5),
    color: Colors.mediumGray,
  },
  textStyle: {
    fontSize: Size.M,
    fontFamily: Fonts.Regular,
    lineHeight: 23,
    color: Colors.black,
    // color: '#000',
  },
});

export const showActionSheet = (title: string, data: any, onPress: (item) => void) => {
  StaticActionSheet?.actionSheet({
    title,
    data,
    onPress,
  });
};

export const hideActionSheet = () => {
  StaticActionSheet?.actionSheet({
    visible: false,
  });
};

export default DSActionSheet;
