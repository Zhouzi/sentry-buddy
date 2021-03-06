/* @flow */
import styled, { css } from 'styled-components';
import calc from 'reduce-css-calc';
import rgba from 'hex-rgba';
import { fontSize, lineHeight, colors, spacing, misc } from '../constants';
import View from './View';

const Button = styled(View).attrs({ as: 'button', type: 'button' })`
  font: inherit;
  color: inherit;
  border: ${misc.borderWidth} solid transparent;
  background: transparent;
  cursor: pointer;
  text-decoration: none;

  position: relative;
  font-size: ${fontSize.normal};
  line-height: ${lineHeight.small};
  padding: ${spacing.small} ${spacing.large};
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
  
  ${props =>
    props.link &&
    css`
      color: ${colors.pink};
      text-decoration: underline;

      &:focus,
      &:hover {
        color: ${colors.pinkDark};
      }
    `}
`;
Button.Icon = styled.span`
  display: inline-block;
  padding-left: ${spacing.large};
  margin-right: ${calc(`calc(${spacing.small} - ${spacing.large})`)};
`;

export default Button;
