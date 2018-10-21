const got = require('got');
const parseLinkHeader = require('parse-link-header');

const baseUrl = 'https://sentry.io/api/0';

async function getAll(url, token, results = []) {
    const { body, headers } = await got(url, {
        baseUrl,
        json: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const { next } = parseLinkHeader(headers.link);
    const newResults = results.concat(body);

    return next.results === 'true'
        ? getAll(next.url, token, newResults)
        : newResults;
}

module.exports = getAll;
