import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import {width_screen} from '../../../util/common/dimensions';
import {PoppinsSemiBold} from '../../../util/Utils';

import variables from '../../../util/variables';
import BasicText from '../text/BasicText';
import Heading, {headingSize} from '../text/Heading';

export default CategoryItem = ({
  name,
  icon,
  onPress,
  selected,
  size = width_screen / 3,
}) => {
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        style={[
          styles.mainContainer,
          {marginVertical: size * 0.07, width: size, height: size},
        ]}
        source={icon}
        imageStyle={[styles.imageStyle, {}]}>
        <Heading
          size={variables.getSize(12)}
          fontFamily={PoppinsSemiBold}
          style={styles.titleText}>
          {name}
        </Heading>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 5,
    alignItems: 'baseline',
    justifyContent: 'flex-end',

    paddingVertical: 5,
  },
  imageContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageStyle: {borderRadius: 10},
  titleText: {
    color: variables.colorWhite,
    paddingHorizontal: 7.5,
    textAlign: 'left',
  },
});
