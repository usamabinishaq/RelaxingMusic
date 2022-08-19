import {StyleSheet} from 'react-native';
import {width_screen} from '../../../../util/common/dimensions';
import variables from '../../../../util/variables';

const style = StyleSheet.create({
  main: {flex: 1, width: width_screen, backgroundColor: variables.colorBlack},
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default style;
