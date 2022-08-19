import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import LinearGradient from 'react-native-linear-gradient';
import {width_screen} from '../../../util/common/dimensions';
import variables from '../../../util/variables';

function ImageSlider({images, onImagePress, data}) {
  return (
    <SliderBox
      images={images}
      parentWidth={width_screen * 0.95}
      dotColor={variables.secondary[0]}
      inactiveDotColor={variables.colorWhiteDim}
      sliderBoxHeight={'95%'}
      onCurrentImagePressed={index => {
        onImagePress(data[index]);
      }}
      dotStyle={styles.dotStyle}
      ImageComponentStyle={[styles.imageStyle]}
      imageLoadingColor={variables.secondary[0]}
      resizeMethod={'resize'}
      resizeMode={'cover'}
    />
  );
}

export default ImageSlider;
const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    top: 15,
  },
  imageStyle: [{borderRadius: 15, width: '97%', marginTop: 5}],
});
