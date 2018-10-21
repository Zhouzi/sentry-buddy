const fs = require('fs');
const path = require('path');
const meow = require('meow');
const ora = require('ora');
const getIssues = require('./getIssues');
const groupSimilarIssues = require('./groupSimilarIssues');
const config = require('./config');

const { flags, showHelp } = meow(
    `
    Usage
        $ sentry-buddy --organizationSlug acme --projectSlug app --token <token>
`,
    {
        flags: {
            organizationSlug: {
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
            },
            save: {
                type: 'boolean',
                alias: 's'
            },
            clear: {
                type: 'boolean',
                alias: 'c'
            }
        }
    }
);

const { organizationSlug, projectSlug, token } = config.get(flags);

if (flags.clear) {
    config.clear();
} else if (organizationSlug == null || projectSlug == null || token == null) {
    showHelp();
} else {
    if (flags.save) {
        config.save({ organizationSlug, projectSlug, token });
    }

    (async function run() {
        const spinner = ora('Fetching issues...').start();
        const issues = await getIssues({
            organizationSlug,
            projectSlug,
            token
        });

        spinner.text = 'Looking for similarities...';
        const similarIssues = groupSimilarIssues(issues);

        spinner.text = 'Saving results...';
        const outputPath = path.resolve(process.cwd(), 'stats.json');
        fs.writeFile(
            outputPath,
            JSON.stringify(similarIssues, null, 2),
            'utf8',
            () => {
                spinner.succeed(`Saved results to ${outputPath}`);
            }
        );
    })();
}
