/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import DEMO_CREDENTIALS from '../../../DEMO_CREDENTIALS';
import { Container, Heading, Paragraph, Input, Button, View, spacing } from '../../../design';
import type { Credentials } from '../../../types';

const Columns = styled(View).attrs({ as: 'div' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${spacing.normal};
`;
const Highlight = styled.span`
  cursor: help;
  text-decoration: underline;
`;

function CredentialsPrompt({
  credentials,
  onSubmitCredentials,
  isLoading,
}: {
  credentials: Credentials,
  onSubmitCredentials: (credentials: Credentials) => void,
  isLoading: boolean,
}) {
  const [organizationSlug, setOrganizationSlug] = React.useState(credentials.organizationSlug);
  const [projectSlug, setProjectSlug] = React.useState(credentials.projectSlug);
  const [token, setToken] = React.useState(credentials.token);

  const onSubmit = (event: SyntheticEvent<*>) => {
    event.preventDefault();
    onSubmitCredentials({ organizationSlug, projectSlug, token });
  };

  const onSkipToDemo = () => {
    onSubmitCredentials({
      organizationSlug: DEMO_CREDENTIALS.organizationSlug,
      projectSlug: DEMO_CREDENTIALS.projectSlug,
      token: DEMO_CREDENTIALS.token,
    });
  };

  return (
    <Container>
      <form onSubmit={onSubmit} style={{ opacity: isLoading ? 0.6 : 1 }}>
        <Heading level={1} marginBottom="smaller">
          Sentry Buddy
        </Heading>
        <Paragraph marginBottom="large">
          The below information are required to fetch issues from your Sentry account. You can find
          the organization and project slugs in the URL. For example,{' '}
          {DEMO_CREDENTIALS.organizationSlug} is the organization slug and{' '}
          {DEMO_CREDENTIALS.projectSlug} the project slug in the following URL: https://sentry.io/
          <Highlight title="Organization Slug">{DEMO_CREDENTIALS.organizationSlug}</Highlight>/
          <Highlight title="Project Slug">{DEMO_CREDENTIALS.projectSlug}</Highlight>/ Regarding the
          API token, you can create one from your profile, under {'"API keys"'} or {'"API tokens"'}{' '}
          or {'"Auth tokens"'}.
        </Paragraph>
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
        <Button type="submit" primary disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Fetch issues'}
        </Button>
        <Button link onClick={onSkipToDemo}>
          Skip to demo
        </Button>
      </form>
    </Container>
  );
}

export default CredentialsPrompt;
