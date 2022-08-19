import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {width_screen} from '../../../util/common/dimensions';

import variables from '../../../util/variables';
import BasicText from '../text/BasicText';
import Heading from '../text/Heading';

const size = width_screen / 4 - 20;
function SoundItem({name, icon, onPress, selected}) {
  let Icon = icon;
  return (
    <View style={[styles.mainContainer, variables.shadowStyle(4)]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.imageContainer,
          {
            backgroundColor: selected
              ? variables.colorSelectedCard
              : variables.cardColor,
          },
        ]}>
        <Image source={icon} style={styles.imageStyle} />
      </TouchableOpacity>
      <BasicText size={variables.fontSizeSubtext} style={styles.titleText}>
        {name}
      </BasicText>
    </View>
  );
}
export default SoundItem;

const styles = StyleSheet.create({
  mainContainer: {
    margin: '5%',
    marginHorizontal: '2%',
    alignSelf: 'center',
    alignItems: 'center',
    height: size + 25,
    opacity: 0.6,
  },
  imageContainer: {
    height: size,
    width: size,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {width: size * 0.5, height: size * 0.5, resizeMode: 'contain'},
  titleText: {
    color: variables.colorWhite,
    paddingTop: '2.5%',
    maxWidth: size,
    textAlign: 'center',
  },
});
