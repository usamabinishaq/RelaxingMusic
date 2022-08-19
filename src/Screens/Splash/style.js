import {StyleSheet} from 'react-native';
import {width_screen} from '../../util/common/dimensions';
import variables from '../../util/variables';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: variables.colorWhite,
  },
  logo: {
    height: '90%',
    width: width_screen,
    resizeMode: 'contain',
    opacity: 0.75,
  },
  logoText: {
    fontSize: variables.fontSizeH2Large,
    fontWeight: 'bold',
    color: variables.colorWhite,
  },
  topContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  bottomContainer: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
});
export default style;
