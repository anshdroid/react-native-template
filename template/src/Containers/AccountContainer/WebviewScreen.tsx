import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DSBaseContainer from '../../Components/DSBaseContainer';
import WebView from 'react-native-webview';

export default function WebviewScreen({navigation, route}: any) {
  const [isLoading, setLoading] = useState(false);

  //  return <WebView source={{uri: route.params.params.url}} originWhitelist={['*']} onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)} />;

  /** Main return */
  return (
    <DSBaseContainer mainContentStyle={{flex: 1}} isLoading={isLoading} title={route.params.params.title}>
      <WebView source={{uri: route.params.params.url}} originWhitelist={['*']} onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)} />
    </DSBaseContainer>
  );
}
