/* @flow */
import * as React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';
import IconSearch from './icons/IconSearch.svg';
import Button from './Button';
import type { IssueGroup } from './types';

const STYLES = StyleSheet.create({
    issueGroupCard: {
        display: 'table-row'
    },
    issueGroupCardCell: {
        display: 'table-cell',
        padding: 10,

        '&:first-child': {
            width: '100%'
        },

        '&:not(:first-child)': {
            whiteSpace: 'nowrap',
            fontSize: '0.9rem'
        }
    }
});

/*
 * Sentry's search doesn't work well with terms containing the ":" character.
 * This function returns the largest portion of the message that doesn't contain one.
 */
function getSearchTerms(title: string): string {
    return title
        .split(':')
        .reduce((acc, terms) => (terms.length > acc.length ? terms : acc), '');
}

function IssueGroupCard({
    issueGroup,
    sentryURL
}: {
    issueGroup: IssueGroup,
    sentryURL: string
}) {
    return (
        <div className={css(STYLES.issueGroupCard)}>
            <div className={css(STYLES.issueGroupCardCell)}>
                {issueGroup.title}
            </div>
            <div className={css(STYLES.issueGroupCardCell)}>
                {issueGroup.issues.length}
            </div>
            <div className={css(STYLES.issueGroupCardCell)}>
                {issueGroup.issues.reduce(
                    (acc, issue) => acc + Number(issue.count),
                    0
                )}
            </div>
            <div className={css(STYLES.issueGroupCardCell)}>
                {issueGroup.issues.reduce(
                    (acc, issue) => acc + issue.userCount,
                    0
                )}
            </div>
            <div className={css(STYLES.issueGroupCardCell)}>
                <Button
                    tagName="a"
                    href={`${sentryURL}?query=${encodeURIComponent(
                        `is:unresolved ${getSearchTerms(issueGroup.title)}`
                    )}`}
                >
                    <IconSearch /> Search
                </Button>
            </div>
        </div>
    );
}

export default IssueGroupCard;
