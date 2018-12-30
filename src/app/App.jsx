/* @flow */
/* global fetch */
import * as React from 'react';
import CredentialsPrompt from './CredentialsPrompt';
import { Content, Head } from '../design';
import Issues from './Issues';

function App() {
  const [issues, setIssues] = React.useState(null);

  const onSubmitCredentials = (credentials: {
    organizationSlug: string,
    projectSlug: string,
    token: string,
  }) => {
    const { organizationSlug, projectSlug, token } = credentials;
    fetch(
      `/api/sentry?organizationSlug=${organizationSlug}&projectSlug=${projectSlug}&token=${token}`
    )
      .then(res => res.json())
      .then(newIssues => {
        setIssues(newIssues);
      });
  };

  return (
    <Content>
      <Head />
      {issues == null ? (
        <CredentialsPrompt onSubmitCredentials={onSubmitCredentials} />
      ) : (
        <Issues issues={issues} />
      )}
    </Content>
  );
}

export default App;
