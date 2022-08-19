import React from 'react';
import {Text as RNText} from 'react-native';
import variables from '../../../util/variables';
function Text({
  children,
  fontSize,
  color = variables.colorBlack,
  style,
  fontFamily,
  ...props
}) {
  return (
    <RNText
      {...props}
      style={{
        fontSize,
        color: color,
        fontFamily: fontFamily,
        ...style,
      }}>
      {children}
    </RNText>
  );
}

export default Text;
