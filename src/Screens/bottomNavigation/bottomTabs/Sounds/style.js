import {StyleSheet} from 'react-native';
import variables from '../../../../util/variables';

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: variables.colorBlack,
  },
  topHeading: {
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
    fontWeight: 'bold',
  },
});
export default style;
