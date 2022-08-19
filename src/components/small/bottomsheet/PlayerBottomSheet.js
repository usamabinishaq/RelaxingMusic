import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {Countdown} from 'react-native-element-timer';
import {height_screen, width_screen} from '../../../util/common/dimensions';
import variables from '../../../util/variables';
import RoundedIcon from '../views/RoundedIcon';
import CurrentTrack from '../views/CurrentTrack';
import {hoursToSeconds, minutesToSeconds} from '../../../data/timer';
import LinearGradient from 'react-native-linear-gradient';

const PlayerBottomSheet = ({
  tracks,
  onTimer,
  play,
  open,
  onDelete,
  onPlay,
  onVolumeChange,
  onCurrentTrackStateChange,
  time,
  timeType,
  setAllPlay,
  onCountDownEnd,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [isPlay, setPlay] = useState(play);
  const [countdown, setCountDown] = useState(time);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (String(time).includes('.')) {
      let tempHours, tempMinutes;
      tempHours = hoursToSeconds(String(time).split('.')[0]);
      tempMinutes = minutesToSeconds(String(time).split('.')[1]);
      setCountDown(tempHours + tempMinutes);
    } else {
      setCountDown(
        timeType === 'm'
          ? minutesToSeconds(time)
          : timeType === 'h'
          ? hoursToSeconds(time)
          : null,
      );
    }
    setPlay(play);
    setOpen(open);
  }, [play, open, time, timeType]);

  useEffect(() => {
    countdownRef.current !== null
      ? play
        ? countdownRef.current.resume()
        : countdownRef.current.pause()
      : null;
  });
  const _handleOnplay = () => {
    if (tracks.length > 0) {
      onPlay(!isPlay);
      setPlay(!isPlay);
      setAllPlay(!play);
      _handleCountDown();
    }
  };
  const _handleCountDown = () => {
    countdownRef.current !== null
      ? isPlay
        ? countdownRef.current.pause()
        : countdownRef.current.resume()
      : null;
  };
  const _handleCurrentTrack = (item, state) => {
    onCurrentTrackStateChange(item, state);
  };
  // renders
  return (
    // console.log('TRACKSSS OPENED IN SHHEEETEEET===>', tracks),
    <LinearGradient
      colors={variables.secondary}
      style={[
        styles.container,
        {minHeight: !isOpen ? height_screen * 0.1 : null},
      ]}>
      <View
        style={[
          styles.innerControlsContainer,
          {paddingBottom: !isOpen ? '7.5%' : 0},
        ]}>
        <RoundedIcon
          icon={'stop'}
          onPress={() => {
            _handleOnplay();
          }}
        />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {countdown !== 0 && countdown !== null && isPlay ? (
            <Countdown
              ref={countdownRef}
              initialSeconds={countdown}
              formatTime={'hh:mm:ss'}
              onEnd={onCountDownEnd}
              textStyle={{color: variables.colorWhite}}
            />
          ) : null}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {tracks.length > 0 ? (
            <RoundedIcon icon={'timer'} onPress={onTimer} />
          ) : null}
          <RoundedIcon
            icon={isOpen ? 'chevron-down' : 'chevron-up'}
            onPress={() => {
              setOpen(!isOpen);
            }}
          />
        </View>
      </View>
      {isOpen && Array.isArray(tracks) ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}>
          {tracks.map((item, index) => {
            return (
              <CurrentTrack
                key={index}
                onPlayChange={e => _handleCurrentTrack(item, e)}
                track={item}
                onDelete={() => onDelete(item)}
                onVolumeChange={e => onVolumeChange(item, e)}
              />
            );
          })}
          <View style={{marginBottom: '10%'}} />
        </ScrollView>
      ) : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width_screen,
    alignSelf: 'center',
    maxHeight: height_screen * 0.5,
    backgroundColor: variables.secondary,
    borderTopRightRadius: variables.getSize(20),
    borderTopLeftRadius: variables.getSize(20),
    justifyContent: 'center',
    paddingTop: '5%',
    padding: '2.5%',
    paddingBottom: '15%',
    opacity: 0.6,
  },
  innerControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    paddingTop: '5%',
  },
});

export default PlayerBottomSheet;
