import React, {useEffect} from 'react';
import Sound from 'react-native-sound';
let sound;
export const setSoundVolume = (item, index, v) => {
  let temp = [...music];
  temp[index].volume = v;
  console.log('The Volume is: ', temp[index].volume.toPrecision());
  setmusic(temp);
  sound?.setVolume(Number(temp[index].volume.toPrecision()));
};
const setSoundState = (index, state) => {
  let temp = [...music];
  temp[index].isPlaying = state;
  setmusic(temp);
};
const playSound = (item, index) => {
  sound = new Sound(item.url, '', (error, _sound) => {
    console.log(error, 'SOUND', _sound);
    sound.play(r => {
      sound.release();
      sound.setVolume(0.5);
    });
    setSoundState(index, true);
  });
};
const stopSound = (item, index) => {
  sound.stop(r => {
    console.log(error, 'SOUND', r);
  });
  setSoundState(index, false);
};
