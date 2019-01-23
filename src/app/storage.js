/* @flow */
/* global window */
import type { Issue, Credentials } from '../types';
import { CATEGORIES } from './constants';

function setIssueTag(issue: Issue, tagID: string): void {
  window.localStorage.setItem(`ISSUE_${issue.id}_TAG`, tagID);
}

function getIssueTag(issue: Issue): ?{ id: string, label: string } {
  const tagID = window.localStorage.getItem(`ISSUE_${issue.id}_TAG`);

  if (tagID == null || CATEGORIES[tagID] == null) {
    return null;
  }

  return { id: tagID, label: CATEGORIES[tagID] };
}

function getCredentials(): Credentials {
  return {
    organizationSlug: window.localStorage.getItem('organizationSlug') || '',
    projectSlug: window.localStorage.getItem('projectSlug') || '',
    token: window.localStorage.getItem('token') || '',
  };
}

function setCredentials({ organizationSlug, projectSlug, token }: Credentials) {
  window.localStorage.setItem('organizationSlug', organizationSlug);
  window.localStorage.setItem('projectSlug', projectSlug);
  window.localStorage.setItem('token', token);
}

export default {
  setIssueTag,
  getIssueTag,
  getCredentials,
  setCredentials,
};
