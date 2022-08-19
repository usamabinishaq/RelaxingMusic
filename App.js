import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {LogBox, YellowBox} from 'react-native';
import AppNavigator from './src/navigation';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  const [isSpalsh, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      <AppNavigator splash={isSpalsh} />
    </NavigationContainer>
  );
};

export default App;
