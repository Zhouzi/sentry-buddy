/* @flow */
import * as React from 'react';
import { X } from 'styled-icons/octicons';
import { User, Copy, DownArrow } from 'styled-icons/boxicons-solid';
import { Head, Cards, Content, Container, Heading, Button, Pagination } from '../design';

type Issue = {
  title: string,
  events: number,
  users: number,
  duplicates: number,
};

function App({ issues }: { issues: Issue[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentIssue = issues[currentIndex];

  return (
    <Content>
      <Head />
      <Container marginBottom="large">
        <Heading level={1}>{currentIssue.title}</Heading>
      </Container>
      <Container marginBottom="large">
        <Cards>
          <Cards.Card>
            <Cards.Card.Icon>
              <X size={22} />
            </Cards.Card.Icon>
            <Cards.Card.Content>
              <Cards.Card.Content.Title>{currentIssue.events}</Cards.Card.Content.Title>
              <Cards.Card.Content.Label>Events</Cards.Card.Content.Label>
            </Cards.Card.Content>
          </Cards.Card>
          <Cards.Card>
            <Cards.Card.Icon>
              <User size={22} />
            </Cards.Card.Icon>
            <Cards.Card.Content>
              <Cards.Card.Content.Title>{currentIssue.users}</Cards.Card.Content.Title>
              <Cards.Card.Content.Label>Users</Cards.Card.Content.Label>
            </Cards.Card.Content>
          </Cards.Card>
          <Cards.Card>
            <Cards.Card.Icon>
              <Copy size={22} />
            </Cards.Card.Icon>
            <Cards.Card.Content>
              <Cards.Card.Content.Title>{currentIssue.duplicates}</Cards.Card.Content.Title>
              <Cards.Card.Content.Label>Duplicates</Cards.Card.Content.Label>
            </Cards.Card.Content>
          </Cards.Card>
        </Cards>
      </Container>
      <Container>
        <Button marginRight="normal" secondary>
          Search
        </Button>
        <Button.Group marginRight="normal">
          <Button primary>Tag</Button>
          <Button primary icon>
            <DownArrow size={14} />
          </Button>
        </Button.Group>
        <Pagination current={currentIndex} max={issues.length} onChange={setCurrentIndex} />
      </Container>
    </Content>
  );
}

export default App;
