/* @flow */
import styled, { css } from 'styled-components';
import calc from 'reduce-css-calc';
import rgba from 'hex-rgba';
import { fontSize, lineHeight, colors, spacing, misc } from '../constants';
import View from './View';

const Button = styled(View).attrs({ as: 'button' })`
  font: inherit;
  color: inherit;
  border: ${misc.borderWidth} solid transparent;
  background: transparent;
  cursor: pointer;

  position: relative;
  font-size: ${fontSize.large};
  line-height: ${lineHeight.small};
  padding: ${spacing.small} ${spacing.larger};
  border-radius: ${misc.borderRadius};
  transition: background-color 150ms ease-out;

  &[disabled] {
    pointer-events: none;
  }

  ${props =>
    props.secondary &&
    css`
      color: ${colors.pink};
      border-color: ${colors.pink};

      &:focus,
      &:hover {
        background-color: ${rgba(colors.pink, 10)};
      }
    `}

  ${props =>
    props.primary &&
    css`
      color: ${colors.white};
      background-color: ${colors.blue};

      &:focus,
      &:hover {
        background-color: ${colors.blueDark};
      }
    `}
`;
Button.Icon = styled.span`
  display: inline-block;
  padding-left: ${spacing.larger};
  margin-right: ${calc(`calc(${spacing.small} - ${spacing.larger})`)};
`;

export default Button;
