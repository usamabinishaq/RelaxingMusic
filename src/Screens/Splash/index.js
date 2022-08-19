import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import style from './style';
import * as constants from '../../constants/constants';
import variables from '../../util/variables';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../components/small/text/Heading';
import {PoppinsBold, PoppinsSemiBold} from '../../util/Utils';
import {useDispatch} from 'react-redux';
import {
  fetchAllCategories,
  fetchAllFavourites,
} from '../../redux/actions/sounds';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllFavourites());
  }, []);
  return (
    <LinearGradient style={style.container} colors={variables.colorGradient}>
      <StatusBar
        backgroundColor={variables.colorGradient[0]}
        barStyle={'light-content'}
      />
      <View style={style.topContainer}>
        <Heading
          size={variables.getSize(20)}
          color={variables.colorWhite}
          fontFamily={PoppinsSemiBold}>
          {constants.APP_NAME}
        </Heading>
      </View>
      <View style={style.bottomContainer}>
        <Image style={style.logo} source={constants.Splash_bg} />
      </View>
    </LinearGradient>
  );
};

export default Splash;
