/* @flow */
import styled from 'styled-components';
import { fontSize, lineHeight, spacing, misc, colors } from '../constants';
import View from './View';

const Input = styled(View).attrs({ as: 'input' })`
  font: inherit;
  color: inherit;
  border: 0;
  background: transparent;

  font-size: ${fontSize.large};
  line-height: ${lineHeight.small};
  padding: ${spacing.small};
  border-radius: ${misc.borderRadius};
  color: ${colors.black};
  background-color: ${colors.white};
  display: block;
  width: 100%;
`;

export default Input;
