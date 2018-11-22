/* @flow */

export type Issue = {
    id: string,
    title: string,
    count: string,
    userCount: number
};

export type IssueGroup = {
    title: string,
    issues: Issue[]
};
