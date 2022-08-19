import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import variables from '../../../util/variables';

const RoundedIcon = ({
  icon,
  image = false,
  color = variables.colorIcon,
  size = 40,
  onPress,
}) => {
  return image ? (
    <LinearGradient
      colors={variables.bg_gradient}
      style={[
        variables.shadowStyle(5),
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Image
        style={{
          height: size - 25,
          width: size - 25,
          tintColor: variables.secondary,
          resizeMode: 'contain',
        }}
        source={icon}
      />
    </LinearGradient>
  ) : (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height: size,
          width: size,
          borderRadius: size * 0.5,
        },
      ]}
      activeOpacity={0.75}
      onPress={onPress}>
      <Icon name={icon} color={color} size={size - 15} />
    </TouchableOpacity>
  );
};
export default RoundedIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: variables.colorIcon,
  },
});
