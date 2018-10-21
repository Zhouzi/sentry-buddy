const stringSimilarity = require('string-similarity');

function groupSimilarIssues(issues) {
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

module.exports = groupSimilarIssues;
