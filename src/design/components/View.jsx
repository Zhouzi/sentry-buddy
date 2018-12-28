/* @flow */
import styled from 'styled-components';
import { spacing } from '../constants';

type SpacingValue = string | number;
type SpacingType = 'smaller' | 'small' | 'normal' | 'large' | 'larger';

function getSpacing(type: ?(SpacingType | SpacingValue)): SpacingValue {
  if (type == null) {
    return '0';
  }

  if (spacing[type] == null) {
    return type;
  }

  return spacing[type];
}

const View = styled.div`
  padding: ${props =>
    [
      getSpacing(props.paddingVertical || props.paddingTop),
      getSpacing(props.paddingHorizontal || props.paddingRight),
      getSpacing(props.paddingVertical || props.paddingBottom),
      getSpacing(props.paddingHorizontal || props.paddingLeft),
    ].join(' ')};
  margin: ${props =>
    [
      getSpacing(props.marginVertical || props.marginTop),
      getSpacing(props.marginHorizontal || props.marginRight),
      getSpacing(props.marginVertical || props.marginBottom),
      getSpacing(props.marginHorizontal || props.marginLeft),
    ].join(' ')};
`;

export default View;
