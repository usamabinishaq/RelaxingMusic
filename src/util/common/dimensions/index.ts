import {Dimensions} from 'react-native';

const width_screen = Dimensions.get('window').width;
const height_screen = Dimensions.get('window').height;
const width_ = Dimensions.get('screen').width;
const height_ = Dimensions.get('screen').height;

const orientation_screen = width_ > height_ ? 'landscape' : 'potrait';

export {width_screen, height_screen, orientation_screen, width_, height_};
