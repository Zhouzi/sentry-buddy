/* @flow */
import * as React from 'react';
import Helmet from 'react-helmet';
import rgba from 'hex-rgba';
import { createGlobalStyle } from 'styled-components';
import { colors, fontSize, fontWeight, lineHeight } from '../constants';

const Reset = createGlobalStyle`
  html {
    font-size: 16px;
  }
  
  body {
    font-family: Muli, sans-serif;
    font-size: ${fontSize.normal};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeight.normal};
    color: ${colors.white};
    background-color: ${colors.black};
    background: linear-gradient(45deg, ${rgba(colors.black, 94)}, ${colors.black});
  }
`;

function Head() {
  return (
    <React.Fragment>
      <Reset />
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Muli:400,900" />
      </Helmet>
    </React.Fragment>
  );
}

export default Head;
