/* @flow */
import styled, { css } from 'styled-components';
import View from './View';

const Container = styled(View).attrs({ as: 'div' })`
  transform: skew(2deg);
  max-width: 800px;
  width: 100%;

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.6;
    `}
`;
Container.defaultProps = {
  marginHorizontal: 'auto',
};

export default Container;
