import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Heading from '../../../../components/small/text/Heading';
import PaddingView from '../../../../components/small/views/PaddingView';
import Statusbar from '../../../../components/small/views/StatusBar';
import {
  APP_LINK,
  APP_NAME,
  backgroundImage,
  settings,
  Settings_bg,
} from '../../../../constants/constants';
import variables from '../../../../util/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './style';
import Appbar from '../../../../components/Appbar/Appbar';
import {PoppinsRegular, PoppinsSemiBold} from '../../../../util/Utils';

const Setting = ({navigation}) => {
  const [isClicked, setClicked] = useState(false);
  const _handleOnpress = index => {
    switch (index) {
      case 0:
        _handleNavigation('AboutUs');
        break;
      case 1:
        _handleShare();
        break;
      case 2:
        _handleNavigation('PrivacyPolicy');
        break;
      case 3:
        Linking.openURL('https://play.google.com/store/apps');
        break;
      default:
        console.log('Not Available');
        break;
    }
  };

  const _handleNavigation = nav => {
    navigation.navigate(nav);
  };
  const _handleShare = () => {
    if (!isClicked) {
      setClicked(true);
      Share.share({
        title: `${APP_NAME}`,
        message: `Let me recommend you ${APP_NAME} app to enjoy the Relaxing Music. Download from the Link Below. \n${APP_LINK}`,
      }).then(response => {
        setTimeout(() => {
          setClicked(false);
        }, 2000);
      });
    }
  };
  return (
    <ImageBackground
      style={style.main}
      imageStyle={{
        opacity: 0.15,
      }}
      source={Settings_bg}>
      <Appbar title={'Settings'} transparent={true} />
      <View style={{flex: 0.9}}>
        {settings.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => _handleOnpress(index)}
              activeOpacity={0.6}
              style={style.horizontalView}>
              <Image
                source={item.icon}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
              <Heading
                style={{paddingHorizontal: '5%'}}
                size={variables.fontSizePSmall}
                fontFamily={PoppinsRegular}>
                {item.name}
              </Heading>
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
};
export default Setting;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  modalView: {
    width: '90%',
    height: '90%',
    marginHorizontal: '5%',
    backgroundColor: variables.selectedCardColor,
    borderRadius: 20,
    paddingVertical: '5%',
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
    marginTop: '5%',
  },
  descriptionText: {
    letterSpacing: 0.25,
    lineHeight: 22,
    color: variables.colorWhite,
    textAlign: 'justify',
  },
  mainhorizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
    width: '90%',
  },
});
