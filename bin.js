const axios = require('axios');
const parseLinkHeader = require('parse-link-header');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const open = require('opn');
const config = require('./webpack.config');

const baseURL = 'https://sentry.io/api/0';

async function getAll(url, token, results = []) {
  const client = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data, headers } = await client.get(url);
  const { next } = parseLinkHeader(headers.link);
  const newResults = results.concat(data);

  return next.results === 'true' ? getAll(next.url, token, newResults) : newResults;
}

function getIssues({ organizationSlug, projectSlug, token }) {
  return getAll(`/projects/${organizationSlug}/${projectSlug}/issues/`, token);
}

const compiler = webpack(config);
const app = express();

app.get('/api/sentry', async (req, res) => {
  const rawIssues = await getIssues({
    organizationSlug: req.query.organizationSlug,
    projectSlug: req.query.projectSlug,
    token: req.query.token,
  });
  const issuesMap = rawIssues.reduce(
    (acc, issue) =>
      Object.assign(acc, {
        [issue.title]: acc[issue.title]
          ? {
              title: issue.title,
              events: acc[issue.title].events + Number(issue.count),
              users: acc[issue.title].users + issue.userCount,
              duplicates: acc[issue.title].duplicates + 1,
            }
          : {
              title: issue.title,
              events: Number(issue.count),
              users: issue.userCount,
              duplicates: 0,
            },
      }),
    {}
  );
  const issues = Object.keys(issuesMap).map(title => issuesMap[title]);
  return res.json(issues);
});
app.use(middleware(compiler));

const port = 3000;
app.listen(port, () => open(`http://localhost:${port}`));
