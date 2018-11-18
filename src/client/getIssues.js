/* @flow */
import getAll from './getAll';

export type Issue = {
    title: string
};

function getIssues(
    organizationSlug: string,
    projectSlug: string,
    token: string
): Promise<Issue[]> {
    return getAll(
        `/projects/${organizationSlug}/${projectSlug}/issues/`,
        token
    );
}

export default getIssues;
