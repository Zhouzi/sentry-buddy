/* @flow */
import axios from 'axios';
import parseLinkHeader from 'parse-link-header';

const baseURL = 'https://sentry.io/api/0';

/*
 * Get all items from a endpoint by going through the next directive.
 */
async function getAll<T>(
    url: string,
    token: string,
    results: T[] = []
): Promise<T[]> {
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

export default getAll;
