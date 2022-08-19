import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StatusBar, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {tracksCategory} from '../../data/tracks';
import {width_screen} from '../../util/common/dimensions';
import {PoppinsSemiBold} from '../../util/Utils';
import variables from '../../util/variables';
import DropDownPicker, {DropDownMenu} from '../small/dropdown/DropDownPicker';
import Heading from '../small/text/Heading';

function Appbar({
  title,
  transparent = false,
  type = '',
  dropdownVisible = false,
  onDropDownVisibilityChange,
  rightIcon = false,
  onRightIconPress,
  selectedItem,
  isFavourite,
  leftIcon = false,
}) {
  const navigate = useNavigation();
  return (
    <View
      style={[
        styles.main,
        {backgroundColor: transparent ? 'transparent' : variables.colorBlack},
      ]}>
      <StatusBar backgroundColor={variables.colorBlack} />
      {leftIcon ? (
        <Icon
          name="arrow-back"
          color={variables.colorWhite}
          size={25}
          onPress={() => {
            navigate.goBack();
          }}
        />
      ) : null}
      {type === 'dropdown' ? (
        <DropDownPicker
          selectedItem={selectedItem}
          openMenu={dropdownVisible}
          onPress={() => {
            onDropDownVisibilityChange(!dropdownVisible);
          }}
        />
      ) : (
        <Heading
          size={variables.fontSizeH2Small}
          fontFamily={PoppinsSemiBold}
          color={variables.colorWhite}
          style={{flex: 1, textAlign: 'center'}}>
          {title}
        </Heading>
      )}
      {rightIcon ? (
        <Pressable onPress={() => onRightIconPress(!isFavourite)}>
          <Icon
            name={isFavourite ? 'heart' : 'heart-outline'}
            color={variables.colorWhite}
            size={25}
            style={variables.shadowStyle(4)}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

export default Appbar;
const styles = StyleSheet.create({
  main: {
    flex: 0.1,
    flexDirection: 'row',
    width: width_screen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  dropDownContainer: {flexDirection: 'row', alignItems: 'center'},
});
