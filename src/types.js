/* @flow */

export type Issue = {
  id: string,
  title: string,
  events: number,
  users: number,
  duplicates: number,
  url: string,
};

export type Credentials = {
  organizationSlug: string,
  projectSlug: string,
  token: string,
};
