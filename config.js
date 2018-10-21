const Conf = require('conf');

const config = new Conf();

function get({
    organizationSlug = config.get('organizationSlug'),
    projectSlug = config.get('projectSlug'),
    token = config.get('token')
}) {
    return {
        organizationSlug,
        projectSlug,
        token
    };
}

function save({ organizationSlug, projectSlug, token }) {
    config.set('organizationSlug', organizationSlug);
    config.set('projectSlug', projectSlug);
    config.set('token', token);
}

function clear() {
    config.clear();
}

module.exports = { get, save, clear };
