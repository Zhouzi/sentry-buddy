/* @flow */
import * as React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';
import IssueGroupCard from './IssueGroupCard';
import type { Issue } from './types';

const STYLES = StyleSheet.create({
    '@global html': {
        fontFamily: "'Niramit', sans-serif",
        fontSize: 16,
        lineHeight: 1.4,
        fontWeight: 300,
        color: '#222222'
    },
    '@global body': {
        fontSize: '1rem'
    },
    '@global svg': {
        verticalAlign: 'middle'
    },
    app: {
        display: 'table',
        maxWidth: 800,
        margin: '0 auto',
        padding: 20
    },
    appHeader: {
        display: 'table-row'
    },
    appHeaderCell: {
        display: 'table-cell',
        whiteSpace: 'nowrap',
        color: '#777777',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '0.04rem',
        fontSize: '0.8rem',
        borderBottom: '2px solid #eee',
        padding: 10
    }
});

function App({ issues, sentryURL }: { issues: Issue[], sentryURL: string }) {
    const issueGroups = issues.reduce((acc, issue) => {
        if (acc[issue.title] == null) {
            acc[issue.title] = {
                title: issue.title,
                issues: []
            };
        }

        acc[issue.title].issues.push(issue);
        return acc;
    }, {});
    const issueGroupsList = Object.keys(issueGroups)
        .map(title => issueGroups[title])
        .sort((a, b) => b.issues.length - a.issues.length);
    return (
        <main className={css(STYLES.app)}>
            <div className={css(STYLES.appHeader)}>
                <div className={css(STYLES.appHeaderCell)}>Error</div>
                <div className={css(STYLES.appHeaderCell)}>Duplicates</div>
                <div className={css(STYLES.appHeaderCell)}>Events</div>
                <div className={css(STYLES.appHeaderCell)}>Users</div>
                <div className={css(STYLES.appHeaderCell)} />
            </div>
            {issueGroupsList.map(issueGroup => (
                <IssueGroupCard
                    key={issueGroup.title}
                    issueGroup={issueGroup}
                    sentryURL={sentryURL}
                />
            ))}
        </main>
    );
}

export default App;
