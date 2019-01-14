/* @flow */
import * as React from 'react';
import rgba from 'hex-rgba';
import styled from 'styled-components';
import { ComboKey } from 'react-combo-keys';
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
  count,
  onNext,
  onPrevious,
}: {
  current: number,
  count: number,
  onNext: () => void,
  onPrevious: () => void,
}) {
  return (
    <React.Fragment>
      <ComboKey combo="left" onTrigger={onPrevious} />
      <ComboKey combo="right" onTrigger={onNext} />
      <Container>
        <Button onClick={onPrevious}>
          <KeyboardArrowLeft size={14} />
        </Button>
        <Label>
          {current + 1} of {count}
        </Label>
        <Button onClick={onNext}>
          <KeyboardArrowRight size={14} />
        </Button>
      </Container>
    </React.Fragment>
  );
}

export default Pagination;
