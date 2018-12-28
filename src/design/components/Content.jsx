/* @flow */
import styled from 'styled-components';
import { spacing } from '../constants';

const Content = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${spacing.large};
`;

export default Content;
