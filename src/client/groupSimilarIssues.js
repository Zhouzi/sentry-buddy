/* @flow */
import stringSimilarity from 'string-similarity';
import type { Issue } from './getIssues';

function groupSimilarIssues(issues: Issue[]): { [title: string]: string[] } {
    return issues.reduce((acc, { title }) => {
        const similarIssue = Object.keys(acc).find(
            key => stringSimilarity.compareTwoStrings(key, title) > 0.7
        );

        if (similarIssue) {
            return Object.assign(acc, {
                [similarIssue]: acc[similarIssue].concat(title)
            });
        }

        return Object.assign(acc, {
            [title]: [title]
        });
    }, {});
}

export default groupSimilarIssues;
