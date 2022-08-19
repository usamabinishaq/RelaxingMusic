import {StyleSheet} from 'react-native';
import {width_screen} from '../../../util/common/dimensions';
import variables from '../../../util/variables';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: variables.colorBlack,
    width: width_screen,
    alignItems: 'center',
    paddingHorizontal: '2.5%',
  },
});
export default styles;
