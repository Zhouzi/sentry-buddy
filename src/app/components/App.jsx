/* @flow */
/* global fetch */
import * as React from 'react';
import DEMO_CREDENTIALS from '../../DEMO_CREDENTIALS';
import { Content, Head } from '../../design';
import storage from '../storage';
import CredentialsPrompt from './CredentialsPrompt';
import IssuesCarousel from './IssuesCarousel';

function App() {
  const [issues, setIssues] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const onSubmitCredentials = (credentials: {
    organizationSlug: string,
    projectSlug: string,
    token: string,
  }) => {
    const { organizationSlug, projectSlug, token } = credentials;

    setLoading(true);

    if (
      organizationSlug !== DEMO_CREDENTIALS.organizationSlug ||
      projectSlug !== DEMO_CREDENTIALS.projectSlug ||
      token !== DEMO_CREDENTIALS.token
    ) {
      // Do not store the demo credentials
      storage.setCredentials({
        organizationSlug,
        projectSlug,
        token,
      });
    }

    fetch(
      `/api/sentry?organizationSlug=${organizationSlug}&projectSlug=${projectSlug}&token=${token}`
    )
      .then(res => res.json())
      .then(newIssues => {
        setIssues(newIssues);
        setLoading(false);
      });
  };

  return (
    <Content>
      <Head />
      {issues == null ? (
        <CredentialsPrompt
          isLoading={isLoading}
          credentials={storage.getCredentials()}
          onSubmitCredentials={onSubmitCredentials}
        />
      ) : (
        <IssuesCarousel issues={issues} />
      )}
    </Content>
  );
}

export default App;
