const getAll = require('./getAll');

function getIssues({ organizationSlug, projectSlug, token }) {
    return getAll(
        `/projects/${organizationSlug}/${projectSlug}/issues/`,
        token
    );
}

module.exports = getIssues;
