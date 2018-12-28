/* @flow */
import ModularScale from 'modular-scale';

const ms = ModularScale({
  base: '1rem',
  ratio: 'majorThird',
});

export default {
  smaller: `${ms(-2)}rem`,
  small: `${ms(-1)}rem`,
  normal: `${ms(0)}rem`,
  large: `${ms(1)}rem`,

  heading5: `${ms(1)}rem`,
  heading4: `${ms(1)}rem`,
  heading3: `${ms(2)}rem`,
  heading2: `${ms(3)}rem`,
  heading1: `${ms(4)}rem`,
};
