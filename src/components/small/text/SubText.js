import React from 'react';
import variables from '../../../util/variables';
import Text from './Text';

export const subtextSize = {
  HEADING: variables.fontSizePMedium,
  MEDIUM: variables.fontSizePSmall,
};

function SubText({children, size = subtextSize.MEDIUM, ...props}) {
  return (
    <Text fontSize={size} color={variables.colorSubtext} thin {...props}>
      {children}
    </Text>
  );
}

export default SubText;
