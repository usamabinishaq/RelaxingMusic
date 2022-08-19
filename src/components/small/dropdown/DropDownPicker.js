import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {isArrayCheck} from '../../../util';
import {height_screen, width_screen} from '../../../util/common/dimensions';
import {PoppinsSemiBold} from '../../../util/Utils';
import variables from '../../../util/variables';
import Heading from '../text/Heading';

function DropDownPicker({items, openMenu = false, onPress, selectedItem}) {
  return (
    <View style={{flex: 1}}>
      <Pressable style={[styles.dropDownContainer]} onPress={onPress}>
        <Heading
          size={variables.fontSizeH2Small}
          fontFamily={PoppinsSemiBold}
          color={variables.colorWhite}>
          {selectedItem}
        </Heading>
        <Icon
          name={openMenu ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={variables.colorWhite}
          style={{paddingLeft: '1%'}}
        />
      </Pressable>
    </View>
  );
}

export default DropDownPicker;

export const DropDownMenu = ({items, onItemPress}) => {
  return (
    <View
      style={{
        backgroundColor: variables.ColorLightGray,
        borderRadius: variables.getSize(5),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: -25,
        right: '30%',
        maxHeight: height_screen * 0.25,
        zIndex: 1,
        position: 'absolute',
      }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        {items.map((i, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                onItemPress(i);
              }}
              style={{
                width: '100%',
                borderBottomWidth: 0.25,
                borderColor: variables.colorBorder,
                marginHorizontal: '7%',
                paddingVertical: '10%',
                paddingBottom: 10,
              }}>
              <Heading
                color={variables.colorBlack}
                size={variables.fontSizePSmall}
                style={{
                  textAlign: 'center',
                }}>
                {i.name}
              </Heading>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',

    marginLeft: '5%',

    justifyContent: 'center',
  },
});
