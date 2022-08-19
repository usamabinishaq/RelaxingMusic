import React from 'react';
import {PoppinsRegular} from '../../../util/Utils';
import variables from '../../../util/variables';
import Text from './Text';

export const textSize = {
  MEDIUM: variables.fontSizePMedium,
  SMALL: variables.fontSizePSmall,
  EX_SMALL: variables.fontSizeSubtext,
};

function BasicText({
  children,
  size = textSize.MEDIUM,
  fontFamily = PoppinsRegular,
  ...props
}) {
  return (
    <Text fontSize={size} color={variables.colorBlack} {...props}>
      {children}
    </Text>
  );
}

export default BasicText;
