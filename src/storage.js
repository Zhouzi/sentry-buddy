/* @flow */
/* global window */
import type { Issue } from './types';

function setIssueTag(issue: Issue, tagID: string): void {
  window.localStorage.setItem(`ISSUE_${issue.id}_TAG`, tagID);
}

function getIssueTag(issue: Issue): ?string {
  return window.localStorage.getItem(`ISSUE_${issue.id}_TAG`);
}

export default {
  setIssueTag,
  getIssueTag,
};
