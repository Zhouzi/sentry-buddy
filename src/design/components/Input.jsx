/* @flow */
import * as React from 'react';
import calc from 'reduce-css-calc';
import rgba from 'hex-rgba';
import styled, { css } from 'styled-components';
import { fontSize, lineHeight, spacing, misc, colors } from '../constants';
import View from './View';

const Container = styled.div`
  position: relative;
  color: ${colors.black};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.small};
`;
const Label = styled.div`
  color: ${rgba(colors.black, 60)};
  position: absolute;
  left: ${spacing.small};
  transition-duration: 250ms;
  transition-timing-function: ease-out;
  transition-property: top, font-size, color;

  ${props =>
    props.isFloating
      ? css`
          top: 0.6rem;
          font-size: ${fontSize.small};
        `
      : css`
          top: 50%;
          transform: translateY(-50%);
        `}
`;
const Input = styled(View).attrs({ as: 'input' })`
  font: inherit;
  color: inherit;
  border: 0;
  background: transparent;

  padding: ${calc(`calc(${spacing.small} + 0.44rem)`)} ${spacing.small}
    ${calc(`calc(${spacing.small} - 0.44rem)`)} ${spacing.small};
  border-radius: ${misc.borderRadius};
  background-color: ${colors.white};
  display: block;
  width: 100%;
`;

function InputContainer({ placeholder, value, ...props }: { placeholder: string, value: string }) {
  const [isFocused, setFocused] = React.useState(false);

  return (
    <Container>
      <Label isFloating={Boolean(value) || isFocused}>{placeholder}</Label>
      <Input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
      />
    </Container>
  );
}

export default InputContainer;
