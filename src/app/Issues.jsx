/* @flow */
/* global window */
import * as React from 'react';
import { X } from 'styled-icons/octicons';
import { User, Copy, DownArrow } from 'styled-icons/boxicons-solid';
import { LinkExternal } from 'styled-icons/boxicons-regular';
import { Cards, Container, Heading, Button, Pagination, Dropdown } from '../design';

type Issue = {
  id: string,
  title: string,
  events: number,
  users: number,
  duplicates: number,
  url: string,
};

const CATEGORIES = {
  thirdParty: 'Third-Party',
  browserSupport: 'Browser Support',
  edgeCase: 'Edge Case',
  needsFix: 'Needs Fix',
};

function Issues({ issues }: { issues: Issue[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [_, rerender] = React.useState({});

  if (issues.length === 0) {
    return null;
  }

  const currentIssue = issues[currentIndex];
  const currentIssueCategoryID = window.localStorage.getItem(`ISSUE_${currentIssue.id}_CATEGORY`);
  const onPrevious = () => {
    setCurrentIndex(index => (index - 1 < 0 ? issues.length - 1 : index - 1));
  };
  const onNext = () => {
    setCurrentIndex(index => (index + 1 >= issues.length ? 0 : index + 1));
  };

  const setIssueCategory = (issueID: string, categoryID: string) => {
    window.localStorage.setItem(`ISSUE_${issueID}_CATEGORY`, categoryID);
    rerender({});
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
        <Button as="a" href={currentIssue.url} target="_blank" marginRight="normal" secondary>
          Open
          <Button.Icon>
            <LinkExternal size={14} />
          </Button.Icon>
        </Button>
        <Dropdown.Container marginRight="normal">
          {({ isOpen, onOpen, onClose }) => (
            <React.Fragment>
              <Button onClick={onOpen} primary>
                {CATEGORIES[currentIssueCategoryID] || 'Uncategorized'}
                <Button.Icon>
                  <DownArrow size={14} />
                </Button.Icon>
              </Button>
              <Dropdown isOpen={isOpen}>
                {Object.keys(CATEGORIES).map(id => (
                  <Dropdown.Item
                    key={id}
                    onClick={() => {
                      setIssueCategory(currentIssue.id, id);
                      onClose();
                    }}
                  >
                    {CATEGORIES[id]}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </React.Fragment>
          )}
        </Dropdown.Container>
        <Pagination
          current={currentIndex}
          count={issues.length}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </Container>
    </React.Fragment>
  );
}

export default Issues;
