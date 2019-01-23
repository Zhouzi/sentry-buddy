/* @flow */
import * as React from 'react';
import styled, { css } from 'styled-components';
import rgba from 'hex-rgba';
import { misc, fontSize, lineHeight, colors, spacing } from '../constants';
import View from './View';

const Tabs = styled(View).attrs({ as: 'ul' })`
  position: relative;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    width: 100%;
    border-bottom: ${misc.borderWidth} solid ${rgba(colors.white, 5)};
  }
`;
const TabsItem = styled.li``;
const TabsItemButton = styled.button`
  font: inherit;
  color: inherit;
  border: 0;
  border-bottom: ${misc.borderWidth} solid transparent;
  background: transparent;
  cursor: pointer;
  text-decoration: none;

  font-size: ${fontSize.smaller};
  line-height: ${lineHeight.small};
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: ${rgba(colors.white, 60)};
  padding: ${spacing.smaller} ${spacing.small} ${spacing.smaller} 0;

  ${props =>
    props.isActive &&
    css`
      color: ${colors.white};
      border-bottom-color: ${colors.white};
    `}
`;

Tabs.Item = (props: *) => (
  <TabsItem>
    <TabsItemButton {...props} />
  </TabsItem>
);

export default Tabs;
