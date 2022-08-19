import {StyleSheet} from 'react-native';
import {width_screen} from '../../../../util/common/dimensions';
import variables from '../../../../util/variables';

const style = StyleSheet.create({
  main: {
    flex: 1,
    width: width_screen,
    backgroundColor: '#000000',
  },
  horizontalView: {
    flexDirection: 'row',
    width: '100%',
    padding: '5%',
    alignItems: 'center',
  },
});
export default style;
