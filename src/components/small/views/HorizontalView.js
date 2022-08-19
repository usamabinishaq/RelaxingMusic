import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {PoppinsSemiBold} from '../../../util/Utils';
import variables from '../../../util/variables';

import BasicText from '../text/BasicText';
import Heading, {headingSize} from '../text/Heading';
const HorizontalView = ({onPress, icon, title, label}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.mainhorizontalView, variables.shadowStyle(4)]}>
      <View
        style={{
          paddingHorizontal: '2.5%',
          flex: icon ? 0.9 : 1,
        }}>
        <Heading
          style={styles.headingText2}
          size={variables.fontSizePMedium}
          color={variables.colorPrimary}
          fontFamily={PoppinsSemiBold}>
          {title}
        </Heading>
        <BasicText
          size={variables.fontSizePSmall}
          style={{color: variables.colorPrimary}}>
          {label}
        </BasicText>
      </View>
      {icon ? (
        <View style={{flex: 0.1}}>
          <Icon name={icon} color={variables.colorPrimary} size={25} />
        </View>
      ) : null}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  mainhorizontalView: {
    flexDirection: 'row',
    backgroundColor: variables.colorWhite,
    elevation: 5,
    paddingVertical: '2.5%',
    paddingBottom: '3.5%',
    borderRadius: 10,
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    marginVertical: '3%',
    width: '95%',
  },
  headingText2: {
    fontWeight: 'bold',
    letterSpacing: 0.25,
    paddingVertical: '1%',

    lineHeight: 20,
    fontFamily: variables.fontRubikMedium,
  },
});
export default HorizontalView;
