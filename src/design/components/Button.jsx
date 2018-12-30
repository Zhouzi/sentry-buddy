/* @flow */
import styled, { css } from 'styled-components';
import rgba from 'hex-rgba';
import { fontSize, lineHeight, colors, spacing, misc } from '../constants';
import View from './View';

const Button = styled(View).attrs({ as: 'button' })`
  font: inherit;
  color: inherit;
  border: ${misc.borderWidth} solid transparent;
  background: transparent;
  cursor: pointer;

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
  
  ${props =>
    props.icon &&
    css`
      padding: ${spacing.small};
    `}
`;
Button.Group = styled(View).attrs({ as: 'div' })`
  display: inline-block;

  > *:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > *:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;

    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-left: ${misc.borderWidth} solid ${rgba(colors.blueDark, 20)};
      transform: translateX(-50%);
    }
  }
`;

export default Button;
