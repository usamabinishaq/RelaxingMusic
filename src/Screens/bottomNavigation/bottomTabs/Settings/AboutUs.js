import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import HorizontalView from '../../../../components/small/views/HorizontalView';
import {width_screen} from '../../../../util/common/dimensions';
import variables from '../../../../util/variables';
import BasicText from '../../../../components/small/text/BasicText';
import {
  PrivacyPolicyDescription,
  Settings_bg,
} from '../../../../constants/constants';
import Appbar from '../../../../components/Appbar/Appbar';
import {PoppinsMedium} from '../../../../util/Utils';

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  return (
    <ImageBackground
      imageStyle={{
        opacity: 0.15,
      }}
      source={Settings_bg}
      style={{
        flex: 1,
        width: width_screen,
        backgroundColor: variables.colorBlack,
      }}>
      <Appbar title={'About Us'} transparent={true} leftIcon={true} />

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.scrollStyle}>
            <View style={styles.descriptionContainer}>
              <BasicText
                size={variables.getSize(12)}
                fontFamily={PoppinsMedium}
                style={styles.descriptionText}
                color={variables.colorPrimary}>
                {PrivacyPolicyDescription}
              </BasicText>
            </View>

            <HorizontalView
              icon={'business'}
              title={'Company'}
              label={'Centum Solutions'}
            />
            <HorizontalView
              onPress={() => {
                Linking.openURL('mailto:centumsolutions007@gmail.com');
              }}
              icon={'mail'}
              title={'Email'}
              label={'centumsolutions007@gmail.com'}
            />
            <HorizontalView
              onPress={() => {
                Linking.openURL('https://www.centumsols.com');
              }}
              icon={'md-globe-outline'}
              title={'Website'}
              label={'www.centumsols.com'}
            />
            <HorizontalView
              icon={'information-circle-sharp'}
              title={'App Version'}
              label={DeviceInfo.getVersion()}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default AboutUs;
const styles = StyleSheet.create({
  centeredView: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: variables.selectedCardColor,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  headingText: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headingText2: {
    fontWeight: 'bold',
    letterSpacing: 0.25,
    paddingVertical: '1.5%',
    lineHeight: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollStyle: {
    paddingHorizontal: '2.5%',

    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: variables.fontRubikRegular,

    textAlign: 'justify',
  },
  mainhorizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
    width: '90%',
  },
  descriptionContainer: {
    width: '95%',
    alignSelf: 'center',
    paddingHorizontal: '3.5%',
    elevation: 1,
    backgroundColor: variables.colorWhite,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: '2.5%',
    marginBottom: '3%',
  },
});
