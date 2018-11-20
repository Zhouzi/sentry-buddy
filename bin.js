const Conf = require('conf');
const ora = require('ora');
const got = require('got');
const meow = require('meow');
const parseLinkHeader = require('parse-link-header');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const express = require('express');

const config = new Conf();

/*
 * Get all items from a endpoint by looping through the next directive.
 */
async function getAll(url, token, results = []) {
    const baseUrl = 'https://sentry.io/api/0';
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

/*
 * Get all of a project's issues.
 */
function getIssues(organizationSlug, projectSlug, token) {
    return getAll(
        `/projects/${organizationSlug}/${projectSlug}/issues/`,
        token
    );
}

const { flags, showHelp } = meow(
    `
    Usage
        $ sentry-buddy --orgSlug acme --projectSlug app --token token
`,
    {
        flags: {
            orgSlug: {
                type: 'string',
                alias: 'o'
            },
            projectSlug: {
                type: 'string',
                alias: 'p'
            },
            token: {
                type: 'string',
                alias: 't'
            }
        }
    }
);

(async ({ orgSlug, projectSlug, token }) => {
    if (orgSlug == null || projectSlug == null || token == null) {
        showHelp();
    } else {
        config.set('orgSlug', orgSlug);
        config.set('projectSlug', projectSlug);
        config.set('token', token);

        const spinner = ora('Fetching issues...').start();
        try {
            const issues = await getIssues(orgSlug, projectSlug, token);
            spinner.text = 'Starting server...';

            try {
                const app = express();
                app.use(
                    webpackDevMiddleware(
                        webpack({
                            entry: './src/index.js',
                            mode: 'development',
                            plugins: [
                                new webpack.DefinePlugin({
                                    'process.env.SENTRY_ISSUES': JSON.stringify(
                                        issues
                                    )
                                }),
                                new HTMLWebpackPlugin()
                            ]
                        }),
                        {
                            lazy: true,
                            logLevel: 'silent'
                        }
                    )
                );
                app.listen(3000, () => {
                    spinner.succeed('Server started on port 3000');
                });
            } catch (err) {
                spinner.fail(
                    `Failed to start server on port 3000: ${err.message}`
                );
            }
        } catch (err) {
            spinner.fail(`Failed to fetch Sentry issues: ${err.message}`);
        }
    }
})({
    orgSlug: flags.orgSlug || config.get('orgSlug'),
    projectSlug: flags.projectSlug || config.get('projectSlug'),
    token: flags.token || config.get('token')
});
