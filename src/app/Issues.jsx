/* @flow */
import * as React from 'react';
import { X } from 'styled-icons/octicons';
import { User, Copy, DownArrow } from 'styled-icons/boxicons-solid';
import { LinkExternal } from 'styled-icons/boxicons-regular';
import { Cards, Container, Heading, Button, Pagination } from '../design';

type Issue = {
  title: string,
  events: number,
  users: number,
  duplicates: number,
};

function Issues({ issues }: { issues: Issue[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (issues.length === 0) {
    return null;
  }

  const currentIssue = issues[currentIndex];
  const onPrevious = () => {
    setCurrentIndex(index => (index - 1 < 0 ? issues.length - 1 : index - 1));
  };
  const onNext = () => {
    setCurrentIndex(index => (index + 1 >= issues.length ? 0 : index + 1));
  };

  return (
    <React.Fragment>
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
          Open
          <Button.Icon>
            <LinkExternal size={18} />
          </Button.Icon>
        </Button>
        <Button marginRight="normal" primary>
          Tag
          <Button.Icon>
            <DownArrow size={18} />
          </Button.Icon>
        </Button>
        <Pagination current={currentIndex} onNext={onNext} onPrevious={onPrevious} />
      </Container>
    </React.Fragment>
  );
}

export default Issues;
