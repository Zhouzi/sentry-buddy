const Conf = require('conf');
const ora = require('ora');
const got = require('got');
const meow = require('meow');
const parseLinkHeader = require('parse-link-header');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const express = require('express');
const getPort = require('get-port');
const open = require('opn');

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
                            module: {
                                rules: [
                                    {
                                        test: /\.js$/,
                                        exclude: /node_modules/,
                                        use: [
                                            {
                                                loader: 'babel-loader',
                                                options: {
                                                    presets: [
                                                        '@babel/preset-env',
                                                        '@babel/preset-react',
                                                        '@babel/preset-flow'
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        test: /\.css$/,
                                        use: ['style-loader', 'css-loader']
                                    },
                                    {
                                        test: /\.svg$/,
                                        use: [
                                            {
                                                loader: '@svgr/webpack',
                                                options: {
                                                    icon: true,
                                                    svgProps: {}
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            plugins: [
                                new webpack.DefinePlugin({
                                    'process.env.SENTRY_ISSUES': JSON.stringify(
                                        issues
                                    ),
                                    'process.env.SENTRY_ORG': JSON.stringify(
                                        orgSlug
                                    ),
                                    'process.env.SENTRY_PROJECT': JSON.stringify(
                                        projectSlug
                                    )
                                }),
                                new HTMLWebpackPlugin({
                                    template: './src/index.html'
                                })
                            ]
                        }),
                        {
                            lazy: true,
                            logLevel: 'silent'
                        }
                    )
                );
                const port = await getPort({ port: 1234 });
                app.listen(port, () => {
                    const url = `http://localhost:${port}`;
                    spinner.succeed(`Server started: ${url}`);
                    open(url);
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
