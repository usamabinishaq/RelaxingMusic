/**
 * @format
 */

import {AppRegistry, AppState, BackHandler} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import React, {useEffect, useRef, useState} from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';

ReactNativeForegroundService.register();
ReactNativeForegroundService.add_task(() => {}, {
  delay: 100,
  onLoop: false,
  taskId: 'taskid',

  onError: e => console.log(`Error logging:`, e),
});

const Index = () => {
  const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(true);
  let visible = true;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        visible = true;
      } else {
        visible = false;
      }

      appState.current = nextAppState;
    });

    return () => {
      console.log('POLAND');
      subscription.remove();
      visible = false;
    };
  }, []);

  ReactNativeForegroundService.start({
    id: 144,
    title: 'Relaxing Music',
    message: '',
    button: true,
    buttonText: 'STOP',
    buttonOnPress: 'buttonOnPress',
  });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Index);
