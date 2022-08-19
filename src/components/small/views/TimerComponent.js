import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {hour, minute, range, Timer} from '../../../data/timer';
import variables from '../../../util/variables';
import BasicText from '../text/BasicText';
import Heading from '../text/Heading';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import {height_screen} from '../../../util/common/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TimerComponent({
  open,
  onStop,
  onSelect,
  onCustom,
  onClose,
}) {
  const [customPicker, setCustomPicker] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(0);
  const [customHours, setCustomHours] = useState(0);

  const refRBSheet = useRef();

  useEffect(() => {
    refRBSheet.current.open();
  }, []);

  const _customPicker = () => {
    return (
      <View style={styles.customPickerContainer}>
        <Icon
          name="close"
          color={variables.colorWhite}
          size={20}
          style={{
            alignSelf: 'flex-end',
            marginTop: '2.5%',
            marginHorizontal: '5%',
          }}
          onPress={() => {
            onClose(false);
          }}
        />
        <View style={styles.customPickerInnerContainer}>
          <View style={{marginHorizontal: '5%'}}>
            <ScrollPicker
              dataSource={range(0, 23)}
              selectedIndex={0}
              onValueChange={data => {
                setCustomHours(data);
              }}
              wrapperHeight={175}
              wrapperWidth={75}
              wrapperBackground={variables.secondary}
              itemHeight={50}
              highlightColor={'#FFFFFF'}
              highlightBorderWidth={2}
              itemTextStyle={styles.itemTextStyle}
              activeItemTextStyle={styles.activeItemTextStyle}
            />
            <Text style={styles.customPickerTimeHeading}>Hours</Text>
          </View>
          <View style={{top: '22%'}}>
            <Text style={[styles.activeItemTextStyle, {fontWeight: 'bold'}]}>
              :
            </Text>
          </View>
          <View style={{marginHorizontal: '5%'}}>
            <ScrollPicker
              dataSource={range(0, 59)}
              selectedIndex={0}
              onValueChange={data => {
                console.log('Custom Minutes: ', data);
                setCustomMinutes(data);
              }}
              wrapperHeight={175}
              wrapperWidth={75}
              wrapperBackground={variables.secondary}
              itemHeight={50}
              highlightColor={'#FFFFFF'}
              highlightBorderWidth={2}
              itemTextStyle={styles.itemTextStyle}
              activeItemTextStyle={styles.activeItemTextStyle}
            />
            <Text style={styles.customPickerTimeHeading}>Minutes</Text>
          </View>
        </View>
        <View style={styles.customPickerButton}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              setCustomPicker(false);
            }}>
            Cancel
          </Text>
          <Text
            style={styles.buttonText}
            onPress={() => {
              customHours > 0
                ? onSelect(customHours + '.' + customMinutes + ' hour')
                : customMinutes > 0
                ? onSelect(customMinutes + ' minutes')
                : console.log('No time Selected');
            }}>
            Start
          </Text>
        </View>
      </View>
    );
  };
  const _defaultPicker = () => {
    return (
      <ScrollView>
        <Icon
          name="close"
          color={variables.colorWhite}
          size={20}
          style={{
            alignSelf: 'flex-end',
            marginTop: '2.5%',
            marginHorizontal: '5%',
          }}
          onPress={() => {
            onClose(false);
          }}
        />
        <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={onStop}>
          <Heading size={variables.fontSizePMedium} style={styles.heading}>
            {'Stop Timer'}
          </Heading>
        </TouchableOpacity>
        {Timer.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(item);
              }}
              style={{alignSelf: 'flex-start'}}>
              <BasicText style={{padding: '2.5%', color: variables.colorWhite}}>
                {item}
              </BasicText>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          onPress={() => {
            setCustomPicker(true);
          }}>
          <BasicText style={{padding: '2.5%', color: variables.colorWhite}}>
            {'Custom'}
          </BasicText>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <RBSheet
      onClose={() => {
        onClose(false);
      }}
      closeDuration={100}
      ref={refRBSheet}
      customStyles={BottomSheetstyle}>
      <LinearGradient colors={variables.secondary}>
        {customPicker ? _customPicker() : _defaultPicker()}
      </LinearGradient>
    </RBSheet>
  );
}

const BottomSheetstyle = StyleSheet.create({
  container: {
    backgroundColor: variables.secondary,

    borderRadius: 20,
  },
  draggableIcon: {backgroundColor: 'transparent'},
});
const styles = StyleSheet.create({
  heading: {fontWeight: 'bold', padding: '2.5%'},
  activeItemTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  itemTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF50',
  },
  customPickerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  customPickerInnerContainer: {
    flex: 0.9,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  customPickerTimeHeading: {
    fontSize: 11,
    color: variables.colorWhite,
    textAlign: 'center',
  },
  customPickerButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: variables.colorWhite,
    paddingHorizontal: '5%',
  },
});
