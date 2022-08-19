import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Heading from '../../../components/small/text/Heading';
import {
  Categories_icon,
  Categories_outline,
  Favourite_icon,
  Favourite_outline_icon,
  Settings_icon,
  Settings_outline,
  Sounds_icon,
  Sounds_outline,
} from '../../../constants/constants';
import {height_screen, width_screen} from '../../../util/common/dimensions';
import {PoppinsMedium} from '../../../util/Utils';
import variables from '../../../util/variables';

function CustomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <LinearGradient colors={variables.colorGradient2} style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let icon =
          label === 'Home'
            ? isFocused
              ? Categories_icon
              : Categories_outline
            : label === 'Favourite'
            ? isFocused
              ? Favourite_icon
              : Favourite_outline_icon
            : label === 'Sounds'
            ? isFocused
              ? Sounds_icon
              : Sounds_outline
            : isFocused
            ? Settings_icon
            : Settings_outline;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={{
              top: 1.5,
              minHeight: 50,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              source={icon}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                tintColor: isFocused ? variables.colorWhite : null,
              }}
            />
            <Heading
              size={variables.fontSizeSmall}
              fontFamily={PoppinsMedium}
              color={
                isFocused ? variables.colorWhite : variables.placeHolderColor
              }
              style={{paddingTop: '1.75%'}}>
              {label}
            </Heading>
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}

export default CustomTabBar;
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',

    width: width_screen * 0.95,
    alignSelf: 'center',
    borderRadius: variables.getSize(width_screen / 2),
    bottom: '2%',
    height: height_screen * 0.075,
    opacity: 0.9,
    borderWidth: 1.5,
    borderColor: variables.colorBorder,
  },
});
