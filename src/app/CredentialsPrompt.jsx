/* @flow */
/* global window */
import * as React from 'react';

type Credentials = {
  organizationSlug: string,
  projectSlug: string,
  token: string,
};

function CredentialsPrompt({
  onSubmitCredentials,
}: {
  onSubmitCredentials: (credentials: Credentials) => void,
}) {
  const [organizationSlug, setOrganizationSlug] = React.useState(
    window.localStorage.getItem('organizationSlug') || ''
  );
  const [projectSlug, setProjectSlug] = React.useState(
    window.localStorage.getItem('projectSlug') || ''
  );
  const [token, setToken] = React.useState(window.localStorage.getItem('token') || '');

  const onSubmit = (event: SyntheticEvent<*>) => {
    event.preventDefault();

    window.localStorage.setItem('organizationSlug', organizationSlug);
    window.localStorage.setItem('projectSlug', projectSlug);
    window.localStorage.setItem('token', token);

    onSubmitCredentials({ organizationSlug, projectSlug, token });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={event => setOrganizationSlug(event.currentTarget.value)}
        value={organizationSlug}
        required
      />
      <input
        type="text"
        onChange={event => setProjectSlug(event.currentTarget.value)}
        value={projectSlug}
        required
      />
      <input
        type="text"
        onChange={event => setToken(event.currentTarget.value)}
        value={token}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CredentialsPrompt;
