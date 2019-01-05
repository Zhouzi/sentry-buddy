/* @flow */
/* global window */
import * as React from 'react';
import styled, { css } from 'styled-components';
import rgba from 'hex-rgba';
import { colors, spacing, misc, fontSize, lineHeight, shadows } from '../constants';
import View from './View';

const Dropdown = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  color: ${colors.black};
  background-color: ${colors.white};
  border-radius: ${misc.borderRadius};
  white-space: nowrap;
  box-shadow: ${shadows.light};

  ${props =>
    !props.isOpen &&
    css`
      display: none;
    `}

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent ${colors.white} transparent;
  }
`;
Dropdown.Item = styled.button`
  font: inherit;
  color: inherit;
  border: 0;
  background: transparent;
  cursor: pointer;

  display: block;
  width: 100%;
  font-size: ${fontSize.large};
  line-height: ${lineHeight.small};
  padding: ${spacing.small} ${spacing.large};
  transition: background-color 150ms ease-out;

  &:focus,
  &:hover {
    background-color: ${rgba(colors.black, 10)};
  }
`;

const DropdownContainer = styled(View).attrs({ as: 'span' })`
  position: relative;
  display: inline-block;
`;
Dropdown.Container = function DropdownContainerWithClickHandler({
  children,
  ...props
}: {
  children: (isOpen: boolean) => React.Node,
}) {
  const [isOpen, setOpen] = React.useState(false);
  const container = React.useRef(null);
  const onClickOutside = (event: *) => {
    if (container.current && container.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    window.document.addEventListener('click', onClickOutside);

    return () => {
      window.document.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <DropdownContainer {...props} onClick={() => setOpen(true)} ref={container}>
      {children(isOpen)}
    </DropdownContainer>
  );
};

export default Dropdown;
