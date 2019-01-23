/* @flow */
import * as React from 'react';
import { X } from 'styled-icons/octicons';
import { Copy, User } from 'styled-icons/boxicons-solid';
import type { Issue } from '../../../types';
import { Heading, Cards } from '../../../design';

function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <React.Fragment>
      <Heading marginBottom="large" level={1}>
        {issue.title}
      </Heading>
      <Cards>
        <Cards.Card>
          <Cards.Card.Icon>
            <X size={22} />
          </Cards.Card.Icon>
          <Cards.Card.Content>
            <Cards.Card.Content.Title>{issue.events}</Cards.Card.Content.Title>
            <Cards.Card.Content.Label>Events</Cards.Card.Content.Label>
          </Cards.Card.Content>
        </Cards.Card>
        <Cards.Card>
          <Cards.Card.Icon>
            <User size={22} />
          </Cards.Card.Icon>
          <Cards.Card.Content>
            <Cards.Card.Content.Title>{issue.users}</Cards.Card.Content.Title>
            <Cards.Card.Content.Label>Users</Cards.Card.Content.Label>
          </Cards.Card.Content>
        </Cards.Card>
        <Cards.Card>
          <Cards.Card.Icon>
            <Copy size={22} />
          </Cards.Card.Icon>
          <Cards.Card.Content>
            <Cards.Card.Content.Title>{issue.duplicates}</Cards.Card.Content.Title>
            <Cards.Card.Content.Label>Duplicates</Cards.Card.Content.Label>
          </Cards.Card.Content>
        </Cards.Card>
      </Cards>
    </React.Fragment>
  );
}

export default IssueDetails;
