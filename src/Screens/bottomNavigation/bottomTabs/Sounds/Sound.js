import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
var Sound = require('react-native-sound');

import style from './style';
import PlayerBottomSheet from '../../../../components/small/bottomsheet/PlayerBottomSheet';
import TimerComponent from '../../../../components/small/views/TimerComponent';
import {hoursToMiliSeconds, minutesToMiliSeconds} from '../../../../data/timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SoundItem from '../../../../components/small/views/SoundItem';
import Appbar from '../../../../components/Appbar/Appbar';
import {DropDownMenu} from '../../../../components/small/dropdown/DropDownPicker';
import {
  isArrayCheck,
  PoppinsRegular,
  PoppinsSemiBold,
} from '../../../../util/Utils';
import Heading from '../../../../components/small/text/Heading';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  _checkCurrentCategoryPlaying,
  _FavouriteCategoryCheck,
} from '../../../../services';
import variables from '../../../../util/variables';
import {
  fetchAllFavourites,
  updateAllPlayingTracksStatus,
  UpdateCurrentCategory,
  UpdateCurrentCategorySounds,
  updateCUrrentPlayingCategory,
  UpdateFavourites,
} from '../../../../redux/actions/sounds';

// To Store Sound Objects in Global  Varibale
let sound;
export default function Sounds({route}) {
  // Global Variables
  let countdown = null;

  //Redux & Navigation States
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {
    categories,
    current_category,
    playing_category,
    favourite_categories,
    all_playing,
  } = useSelector(state => state._sounds);

  //components Visibility States
  const [favourite, setFavourite] = useState(false);
  const [showDropdown, setdropDown] = useState(false);
  const [loading, setLoading] = useState(false);

  //Sound States
  //Music State Is Only For Showing Current or Playing Tracks List Only
  const [music, setmusic] = useState([]);
  const [timerModal, setTimerModal] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timerType, setTimerType] = useState('');
  const timeout = useRef(null);

  //WHen timer and all_play Status Changes need to recall useeffect
  useEffect(() => {
    // console.log('1st UseEffect ');
    setmusic(_checkCurrentCategoryPlaying(current_category, playing_category));
    setdropDown(false);

    //To Check Whether The Current Category is in Favourites or not
    _checkFavourite();
    //To get Previous value of Timer
    _getAsynTimer();

    //To store Sound Object in defined global Varibale
    if (!sound?.length > 0) {
      // console.log('\nAssign Tracks To Sound Player\n');
      _assignTracks();
      // console.log('\nTracks Assigned To Tracks\n');
    }
    // Check if Timer is Added then start the timer and stop music when timer goes to 0
    if (all_playing && timer && Array.isArray(sound)) {
      {
        /*check if the timer is custom or fixed if custom then timer value will be in form of e.g: 1.20 which means 1 Hour and 20 Minutes*/
      }
      if (String(timer).includes('.')) {
        {
          /*To Convert Hours and minutes to miliSeconds Because it will be sets in setInterval Method which takes time in Miliseconds*/
        }
        let tempHours, tempMinutes;
        tempHours = hoursToMiliSeconds(String(timer).split('.')[0]);
        tempMinutes = minutesToMiliSeconds(String(timer).split('.')[1]);
        countdown = tempHours + tempMinutes;
      } else {
        countdown =
          timerType == 'm'
            ? minutesToMiliSeconds(timer)
            : hoursToMiliSeconds(timer);
      }
      console.log('After Converting Time ', countdown, ' Miliseconds');
      clearTimeout(timeout.current);
      // if Tracks Are added to music player then start the Timer
      timeout.current = setTimeout(() => {
        console.log('Inside Timeout Method');
        current_category?.tracks.map((item, index) => {
          if (item.isPlaying === true) {
            stopSound(item, index);
          }
        });
        dispatch(updateAllPlayingTracksStatus(false));
      }, countdown);
    }
  }, [timer, all_playing, music, playing_category]);

  //WHen current Category is changed need to recall useeffect so that we can get latest sounds tracks
  useEffect(() => {
    setdropDown(false);
    setmusic(current_category.tracks);
    _checkFavourite();
  }, [current_category, isFocused]);

  const _assignTracks = async () => {
    console.log('\nAssign Tracks To Sound Player\n');
    let music = current_category.tracks;
    console.log('\nTracks To be Assigned===>\n', current_category.tracks);

    sound = [];
    Sound.setCategory('Playback', true); // true = mixWithOthers
    await music.forEach((track, index) => {
      let t = new Sound(track.url, Sound.MAIN_BUNDLE, (error, _sound) => {});
      sound.push(t);
    });
  };

  const _checkFavourite = () => {
    setFavourite(
      _FavouriteCategoryCheck(current_category.id, favourite_categories),
    );
  };
  const _checkPreviousCategory = () => {
    return (
      playing_category !== null && playing_category.id !== current_category.id
    );
  };

  // To get Previous Timer if Any
  const _getAsynTimer = async () => {
    await AsyncStorage.getItem('@countdown').then(e => {
      if (e !== null) {
        let tym = JSON.parse(e);
        setTimer(tym.time);
        setTimerType(tym.type);
      }
    });
  };

  // Set the Sound State after playing or stop any track
  const setSoundState = async (track, state) => {
    // console.log('BEFORE UPDATING STATE IS: ', track, '   State: ', state);
    console.log('BEFORE UPDATING STATE===><><><>', playing_category?.name);
    if (_checkPreviousCategory()) {
      console.log('SET SOUND STATE METHOD+++> Previous Category');
      await playing_category.tracks.map((item, index) => {
        // console.log('MATCHED? ', item.id === track.id);
        item.id === track.id ? (item.isPlaying = state) : null;
      });
      dispatch(
        updateCUrrentPlayingCategory({
          ...playing_category,
          tracks: playing_category.tracks,
        }),
      );
    } else {
      console.log('IN THE ELSE BODY SET SOUND');
      track.isPlaying = state;
      setmusic(...music, track);
      dispatch(
        updateCUrrentPlayingCategory({...current_category, tracks: music}),
      );
    }
  };

  //To play The Track
  const playSound = async (item, index) => {
    console.log('Play Sound Method==> ', sound[index]);

    if (!sound[index]._playing) {
      await sound[index].setNumberOfLoops(-1);
      await sound[index].play(r => {
        console.log('After Playing Sound==> ', `${r}`, sound[index]);
      });
      console.log('WOOOOOOOOOOOOOOO');

      setSoundState(item, true);
    } else {
      console.log('Already Playing');
    }
  };

  //To Stop the Track
  const stopSound = async (item, index) => {
    // console.log('Stop Sound Function==> ', sound[index]);

    await sound[index].stop(r => {
      console.log('STOP', r);
      setSoundState(item, false);
      // console.log('After Stop Sound==>', sound[index]);
    });
  };

  //IF User Selects/Unselect the Track from Flatlist
  const _handleSelectedTracks = async (item, index) => {
    if (_checkPreviousCategory()) {
      setLoading(true);
      // console.log('Change Existing Tracks States', state);
      // clearTimeout(timeout.current);
      await _stopAllSounds(playing_category.tracks);
      await _assignTracks();

      console.log('STOP COMPLETED');
      setTimeout(() => {
        console.log('STOP COMPLETED NOW PLEAE PLAY ITTTTT');
        _forcePlayTrack(item, true, current_category);
        setLoading(false);
      }, 1000);
    }
    //
    console.log('AFTER IF CONSOLE');
    let temp = music;
    if (temp[index].selected) {
      stopSound(item, index);
      temp[index].selected = false;
    } else {
      console.log("Are OU COMING IN ELSE+++ YES I'M");
      temp[index].selected = true;
      console.log('Then SHow me The Data Of Temp===>', temp[index]);

      playSound(item, index);
    }
    dispatch(UpdateCurrentCategory({...current_category, tracks: temp}));
    dispatch(updateCUrrentPlayingCategory({...current_category, tracks: temp}));

    music.filter(e => e.selected != false).length > 0
      ? dispatch(updateAllPlayingTracksStatus(true))
      : dispatch(updateAllPlayingTracksStatus(false));
  };

  // Main Pause Button Handler  ***FIXED***
  const _onPlayHandler = async state => {
    if (_checkPreviousCategory()) {
      setLoading(true);
      console.log('Change Existing Tracks States', state);
      clearTimeout(timeout.current);
      await _stopAllSounds(playing_category.tracks);
      setTimeout(async () => {
        dispatch(UpdateCurrentCategory(current_category));
        dispatch(updateCUrrentPlayingCategory(current_category));
        await _assignTracks();
        setLoading(false);
      }, 1500);
    } else {
      console.log('Change Current Tracks States', state);
      clearTimeout(timeout.current);
      let temp = [...music];
      music.map((item, index) => {
        if (item.selected != false) {
          temp[index].selected = false;
          stopSound(item, index);
        }
      });
      dispatch(UpdateCurrentCategory({...current_category, tracks: temp}));
      dispatch(
        updateCUrrentPlayingCategory({...current_category, tracks: temp}),
      );
    }
  };
  const _forcePlayTrack = async (track, state, category) => {
    console.log(
      'BUtton Pressed ===>?',
      track,
      '   statte====>',
      state,
      '  PLAYING CATEGORY===> ',
      category,
    );
    for (let index = 0; index < category.tracks.length; index++) {
      if (category.tracks[index].id === track.id) {
        if (!sound[index]._playing) {
          await sound[index].setNumberOfLoops(-1);
          await sound[index].play(r => {
            console.log('After Playing Sound==> ', `${r}`, sound[index]);
          });
          console.log('WOOOOOOOOOOOOOOO');

          console.log('IN THE ELSE BODY SET SOUND');
          track.isPlaying = state;
          setmusic(...music, track);
          dispatch(
            updateCUrrentPlayingCategory({...current_category, tracks: music}),
          );
        } else {
          console.log('Already Playing');
        }
      }
    }
  };
  //Single Track Play/Pause Handler
  const _onCurrentTrackPlay = async (track, state) => {
    console.log(
      'BUtton Pressed ===>?',
      track,
      '   statte====>',
      state,
      '  PLAYING CATEGORY===> ',
      playing_category,
    );
    let tracks = [];
    _checkPreviousCategory()
      ? (tracks = playing_category.tracks)
      : (tracks = music);
    await tracks.map((item, index) => {
      item.id === track.id
        ? state
          ? playSound(item, index)
          : stopSound(item, index)
        : null;
    });
  };

  //Delete Specific Track
  const _onDeleteHandler = track => {
    if (_checkPreviousCategory()) {
      let temp = playing_category.tracks;
      console.log('DELETE TRACK PLEASE!===>', track);
      playing_category.tracks.map((item, index) => {
        if (item.selected != false && item.id === track.id) {
          temp[index].selected = false;
          stopSound(item, index);
        }
      });
      dispatch(
        updateCUrrentPlayingCategory({...playing_category, tracks: temp}),
      );
      playing_category.tracks.filter(e => e.selected != false).length > 0
        ? dispatch(updateAllPlayingTracksStatus(true))
        : dispatch(updateAllPlayingTracksStatus(false));
      playing_category.tracks.map((item, index) => {
        item.selected != false && item.id === track.id
          ? _handleSelectedTracks(item, index)
          : null;
      });
    } else {
      music.map((item, index) => {
        item.selected != false && item.id === track.id
          ? _handleSelectedTracks(item, index)
          : null;
      });
    }
  };

  //To Stop ALL if Playing (Called In Other Methods as Well)
  const _stopAllSounds = async tracks => {
    let temp = tracks;
    for (let index = 0; index < temp.length; index++) {
      if (temp[index].selected != false) {
        temp[index].selected = false;
        await sound[index].stop(r => {
          console.log('STOP', r);
          setSoundState(temp[index], false);
        });
      }
    }
  };

  //Change Volume of Specific Track
  const _onVolumeChangeHandler = (track, v) => {
    if (_checkPreviousCategory()) {
      let temp = playing_category.tracks;
      temp.map((item, index) => {
        if (item.id === track.id) {
          temp[index].volume = Number(v.toPrecision());
          sound[index]?.setVolume(temp[index].volume);
          dispatch(
            updateCUrrentPlayingCategory({...playing_category, tracks: temp}),
          );
        }
      });
    } else {
      let temp = music;
      temp.map((item, index) => {
        if (item.id === track.id) {
          temp[index].volume = Number(v.toPrecision());
          sound[index]?.setVolume(temp[index].volume);
          setmusic(temp);
        }
      });
    }
  };
  // If User Selects the Timer Value
  const _handleSelectedTimer = async time => {
    clearTimeout(timeout.current);
    let tempTime = Number(time.split(' ')[0]);
    let tempType = time.split(' ')[1] === 'minutes' ? 'm' : 'h';
    let jsonObject = JSON.stringify({time: tempTime, type: tempType});
    setTimerModal(false);
    setTimer(tempTime);
    setTimerType(tempType);
    AsyncStorage.setItem('@countdown', jsonObject);
  };
  // WHAT to do When Countdown ends to 0
  const _onCountDownEnds = () => {
    if (_checkPreviousCategory()) {
      playing_category.tracks.map((item, index) => {
        if (item.isPlaying === true) {
          item.selected = false;
          stopSound(item, index);
        }
      });
      dispatch(updateCUrrentPlayingCategory(playing_category));
    } else {
      music.map((item, index) => {
        if (item.isPlaying === true) {
          item.selected = false;
          stopSound(item, index);
        }
      });
      setmusic(music);
    }

    dispatch(updateAllPlayingTracksStatus(false));
    setTimer(null);
    Alert.alert('Music Alert', 'Music Stopped');
  };
  // When User Stops the Timer
  const _handleOnStopTimer = () => {
    setTimer(null);
    setTimerModal(false);
    AsyncStorage.removeItem('@countdown');
    clearTimeout(timeout.current);
  };

  //To Hadle Fav/UnFav Category
  const _handleFavCategory = e => {
    console.log('CALLBACK====>', e);
    dispatch(UpdateFavourites(current_category.id, e));
    setFavourite(e);
  };

  //Handle Dropdown Selection
  const _handleDropDownMenu = e => {
    setLoading(true);
    dispatch(UpdateCurrentCategory(e));
    setdropDown(false);
    dispatch(fetchAllFavourites());
    setLoading(false);
  };

  // {/** JSX */}
  return (
    <ImageBackground
      source={current_category.image}
      style={style.container}
      imageStyle={{opacity: 0.25, backgroundColor: 'black'}}>
      <Appbar
        transparent={true}
        selectedItem={current_category.name}
        type={'dropdown'}
        rightIcon={true}
        isFavourite={favourite}
        onRightIconPress={e => _handleFavCategory(e)}
        dropdownVisible={showDropdown}
        onDropDownVisibilityChange={e => {
          setdropDown(e);
        }}
      />
      <View style={{flex: 0.9}}>
        {/* {Category List} */}
        {showDropdown ? (
          <DropDownMenu
            items={categories}
            onItemPress={e => {
              _handleDropDownMenu(e);
            }}
          />
        ) : null}
        <View style={styles.flatListContainer}>
          {loading ? (
            <>
              <ActivityIndicator size={'small'} color={variables.colorWhite} />
              <Heading
                size={12}
                fontFamily={PoppinsRegular}
                color={variables.colorWhite}
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  paddingVertical: '5%',
                }}>{`Please wait while we setup your current tracks...`}</Heading>
            </>
          ) : isArrayCheck(music) ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={4}
              data={music}
              renderItem={({item, index}) => {
                return (
                  <SoundItem
                    key={index}
                    name={item.title}
                    icon={item.icon}
                    selected={item.selected}
                    onPress={() => {
                      _handleSelectedTracks(item, index);
                    }}
                  />
                );
              }}
            />
          ) : (
            <Heading
              size={variables.fontSizePMedium}
              fontFamily={PoppinsSemiBold}
              style={{
                width: '100%',
                textAlign: 'center',
                letterSpacing: 0.25,
              }}>{`No tracks found!`}</Heading>
          )}
        </View>

        {timerModal ? (
          // Timer
          <TimerComponent
            open={timerModal}
            onClose={e => {
              setTimerModal(e);
            }}
            onStop={_handleOnStopTimer}
            onSelect={time => _handleSelectedTimer(time)}
          />
        ) : null}
        {all_playing && !loading ? (
          //Tracks Bottom Sheet
          <View style={styles.bottomSheetContainer}>
            <PlayerBottomSheet
              time={timer != null ? timer : ''}
              timeType={timerType}
              tracks={playing_category.tracks.filter(e => e.selected != false)}
              onTimer={() => setTimerModal(true)}
              open={
                playing_category.tracks.filter(e => e.selected != false)
                  .length > 0
                  ? true
                  : false
              }
              play={all_playing}
              setAllPlay={e => dispatch(updateAllPlayingTracksStatus(e))}
              onPlay={e => {
                _onPlayHandler(e);
              }}
              onDelete={item => _onDeleteHandler(item)}
              onVolumeChange={(item, e) => {
                _onVolumeChangeHandler(item, e);
              }}
              onCurrentTrackStateChange={(item, e) => {
                _onCurrentTrackPlay(item, e);
              }}
              onCountDownEnd={_onCountDownEnds}
            />
          </View>
        ) : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 0.9,
    justifyContent: 'center',

    marginHorizontal: '2.5%',
  },
  bottomSheetContainer: {position: 'absolute', zIndex: 1, bottom: 0},
});
