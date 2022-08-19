import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import variables from '../../../util/variables';
import RoundedIcon from './RoundedIcon';
import Slider from '@react-native-community/slider';
import {Delete_icon, Pause_icon, Play_icon} from '../../../constants/constants';

const CurrentTrack = ({track, onDelete, onVolumeChange, onPlayChange}) => {
  return (
    // console.log('TRACK ISSS SELECTEDDDDD===>', track),
    <View style={styles.main}>
      <RoundedIcon
        image={true}
        size={55}
        icon={track.icon}
        color={variables.secondary}
      />
      <Slider
        style={{flex: 1}}
        minimumValue={0}
        value={track.volume}
        onValueChange={v => {
          onVolumeChange(v);
        }}
        maximumValue={1}
        minimumTrackTintColor={variables.colorWhite}
        maximumTrackTintColor="#FFFFFF90"
        thumbTintColor={variables.colorWhite}
        step={0.1}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable
          style={{paddingRight: '2.5%'}}
          onPress={() => {
            onPlayChange(!track.isPlaying);
          }}>
          <Image
            source={track.isPlaying ? Pause_icon : Play_icon}
            style={{height: 35, width: 35, resizeMode: 'contain'}}
          />
        </Pressable>
        <Pressable onPress={onDelete}>
          <Image
            source={Delete_icon}
            style={{height: 35, width: 35, resizeMode: 'contain'}}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: '2.5%',
  },
});
export default CurrentTrack;
