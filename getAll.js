const axios = require('axios');
const parseLinkHeader = require('parse-link-header');

const baseURL = 'https://sentry.io/api/0';

async function getAll(url, token, results = []) {
    const client = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const { data, headers } = await client.get(url);
    const { next } = parseLinkHeader(headers.link);
    const newResults = results.concat(data);

    return next.results === 'true'
        ? getAll(next.url, token, newResults)
        : newResults;
}

module.exports = getAll;
