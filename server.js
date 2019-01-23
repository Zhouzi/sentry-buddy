const path = require('path');
const axios = require('axios');
const parseLinkHeader = require('parse-link-header');
const express = require('express');

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

// Sentry's search tool doesn't work well with strings containing ":"
// so this function returns the longest string that doesn't contain a ":"
function getSearchQuery(title) {
  const parts = title.split(':');
  const longestPart = parts.sort((a, b) => b.length - a.length)[0];

  return longestPart.trim();
}

const app = express();

app.get('/api/sentry', async (req, res) => {
  const { organizationSlug, projectSlug, token } = req.query;
  const rawIssues = await getIssues({
    organizationSlug,
    projectSlug,
    token,
  });
  const issuesMap = rawIssues.reduce(
    (acc, issue) =>
      Object.assign(acc, {
        [issue.title]: acc[issue.title]
          ? {
              ...acc[issue.title],
              events: acc[issue.title].events + Number(issue.count),
              users: acc[issue.title].users + issue.userCount,
              duplicates: acc[issue.title].duplicates + 1,
              url: `https://sentry.io/${organizationSlug}/${projectSlug}?query=${encodeURIComponent(
                `is:unresolved ${getSearchQuery(issue.title)}`
              )}`,
            }
          : {
              id: issue.id,
              title: issue.title,
              events: Number(issue.count),
              users: issue.userCount,
              duplicates: 0,
              url: issue.permalink,
            },
      }),
    {}
  );
  const issues = Object.keys(issuesMap)
    .map(title => issuesMap[title])
    .sort((a, b) => {
      if (a.duplicates !== b.duplicates) {
        return b.duplicates - a.duplicates;
      }

      if (a.events !== b.events) {
        return b.events - a.events;
      }

      return b.users - a.users;
    });
  return res.json(issues);
});
app.use(express.static('dist'));
app.use((req, res) => res.sendFile(path.join(__dirname, './dist/index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
