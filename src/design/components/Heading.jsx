/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import { fontSize, fontWeight, lineHeight } from '../constants';
import View from './View';

const Heading1 = styled(View).attrs({ as: 'h1' })`
  font-size: ${fontSize.heading1};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeight.small};
`;

function Heading({ level, ...props }: { level: number }) {
  switch (level) {
    case 1:
      return <Heading1 {...props} />;
    default:
      throw new Error(`Unknown level ${level}`);
  }
}
Heading.defaultProps = {
  level: 1,
};

export default Heading;
