/* @flow */
import * as React from 'react';
import rgba from 'hex-rgba';
import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from 'styled-icons/material';
import { spacing, colors, misc, fontSize } from '../constants';

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 40px auto 40px;
  grid-template-rows: 40px;
  grid-gap: ${spacing.small};
  align-items: center;
  font-size: ${fontSize.small};
`;
const Button = styled.button`
  font: inherit;
  color: inherit;
  border: 0;
  background: transparent;
  cursor: pointer;

  width: 100%;
  height: 100%;
  border-radius: ${misc.borderRadius};
  color: ${rgba(colors.white, 60)};

  &:focus,
  &:hover {
    color: ${colors.white};
    background-color: ${rgba(colors.white, 5)};
  }
`;
const Label = styled.div``;

function Pagination({
  current,
  max,
  onChange,
}: {
  current: number,
  max: number,
  onChange: number => void,
}) {
  return (
    <Container>
      <Button onClick={() => onChange(current - 1 < 0 ? max - 1 : current - 1)}>
        <KeyboardArrowLeft size={14} />
      </Button>
      <Label>{current + 1}</Label>
      <Button onClick={() => onChange(current + 1 >= max ? 0 : current + 1)}>
        <KeyboardArrowRight size={14} />
      </Button>
    </Container>
  );
}

export default Pagination;
