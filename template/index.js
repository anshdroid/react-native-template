// import 'react-native-gesture-handler'
import * as React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

const RNAppRoot = () => <App />;

if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

/** WRAPPED APP IN GESTURE HANDLER TO DETECT GESTURS */
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RNAppRoot));
