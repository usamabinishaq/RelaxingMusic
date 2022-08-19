import React from 'react';
import {View} from 'react-native';
const PaddingView = ({padding = '15%'}) => {
  return <View style={{paddingTop: padding}} />;
};
export default PaddingView;
