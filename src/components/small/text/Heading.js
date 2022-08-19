import React from 'react';
import {PoppinsRegular} from '../../../util/Utils';
import variables from '../../../util/variables';
import Text from './Text';

export const headingSize = {
  LARGE: variables.fontSizeH1Large,
  MEDIUM: variables.fontSizeH1Medium,
  SMALL: variables.fontSizeH1Small,
  XSMALL: variables.fontSizeH2Medium,
  XXSMALL: variables.fontSizeH2Small,
};

function Heading({
  children,
  size = headingSize.MEDIUM,
  color = variables.colorWhite,
  fontFamily = PoppinsRegular,
  ...props
}) {
  return (
    <Text fontSize={size} color={color} {...props} fontFamily={fontFamily}>
      {children}
    </Text>
  );
}

export default Heading;
