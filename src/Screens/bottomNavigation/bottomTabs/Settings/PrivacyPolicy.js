import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import ProgressBarWebView from 'react-native-progress-webview';

const PrivacyPolicy = () => {
  return (
    <ProgressBarWebView
      source={{uri: 'https://centumsols.com/privacy-policy'}}
      height={2}
    />
  );
};
export default PrivacyPolicy;
