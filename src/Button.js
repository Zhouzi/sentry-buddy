/* @flow */
import * as React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';

const STYLES = StyleSheet.create({
    button: {
        cursor: 'pointer',
        font: 'inherit',
        color: 'inherit',
        padding: '6px 8px',
        borderRadius: 2,
        border: 0,
        background: 'transparent',
        display: 'inline-block',
        textDecoration: 'none',

        '&:focus, &:hover': {
            backgroundColor: '#eee'
        }
    }
});

function Button({
    tagName: TagName,
    children,
    ...props
}: {
    tagName?: string,
    children: React.Node
}) {
    return (
        <TagName {...props} className={css(STYLES.button)}>
            {children}
        </TagName>
    );
}
Button.defaultProps = {
    tagName: 'button'
};

export default Button;
