/* @flow */
/* global window */
import * as React from 'react';
import styled from 'styled-components';
import { Container, Heading, Input, Button, View, spacing } from '../design';

type Credentials = {
  organizationSlug: string,
  projectSlug: string,
  token: string,
};

const Columns = styled(View).attrs({ as: 'div' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${spacing.normal};
`;

function CredentialsPrompt({
  onSubmitCredentials,
  isLoading,
}: {
  onSubmitCredentials: (credentials: Credentials) => void,
  isLoading: boolean,
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
    <form onSubmit={onSubmit} style={{ opacity: isLoading ? 0.6 : 1 }}>
      <Container>
        <Heading level={1} marginBottom="large">
          Fill in the following information to fetch issues from Sentry
        </Heading>

        <Columns marginBottom="normal">
          <Input
            type="text"
            onChange={event => setOrganizationSlug(event.currentTarget.value)}
            value={organizationSlug}
            placeholder="Organization Slug"
            required
          />
          <Input
            type="text"
            onChange={event => setProjectSlug(event.currentTarget.value)}
            value={projectSlug}
            placeholder="Project Slug"
            required
          />
        </Columns>

        <Input
          marginBottom="normal"
          type="text"
          onChange={event => setToken(event.currentTarget.value)}
          value={token}
          placeholder="API Token"
          required
        />
        <Button primary disabled={isLoading}>
          {isLoading ? 'Fetching issues...' : 'Gogo Sentry!'}
        </Button>
      </Container>
    </form>
  );
}

export default CredentialsPrompt;
