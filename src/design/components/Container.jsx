/* @flow */
import styled from 'styled-components';
import View from './View';

const Container = styled(View).attrs({ as: 'div' })`
  transform: skew(2deg);
  max-width: 800px;
  width: 100%;
`;
Container.defaultProps = {
  marginHorizontal: 'auto',
};

export default Container;
