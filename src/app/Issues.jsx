/* @flow */
import * as React from 'react';
import { X } from 'styled-icons/octicons';
import { User, Copy, DownArrow } from 'styled-icons/boxicons-solid';
import { LinkExternal } from 'styled-icons/boxicons-regular';
import type { Issue } from '../types';
import { Cards, Container, Heading, Button, Pagination, Dropdown, Tabs } from '../design';
import storage from '../storage';

const CATEGORIES = {
  thirdParty: 'Third-Party',
  browserSupport: 'Browser Support',
  edgeCase: 'Edge Case',
  needsFix: 'Needs Fix',
};

function Issues({ issues }: { issues: Issue[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentTagID, setCurrentTagID] = React.useState(null);
  const [_, rerender] = React.useState({});

  if (issues.length === 0) {
    return null;
  }

  const onChangeTagID = (newTagID: ?string) => {
    setCurrentTagID(newTagID);
    setCurrentIndex(0);
  };

  const filteredIssues = issues.filter(issue => storage.getIssueTag(issue) === currentTagID);
  const currentIssue = filteredIssues[currentIndex];
  const currentIssueTagID = currentIssue && storage.getIssueTag(currentIssue);
  const onPrevious = () => {
    setCurrentIndex(index => (index - 1 < 0 ? filteredIssues.length - 1 : index - 1));
  };
  const onNext = () => {
    setCurrentIndex(index => (index + 1 >= filteredIssues.length ? 0 : index + 1));
  };

  const setIssueTag = (issue: Issue, tagID: string) => {
    storage.setIssueTag(issue, tagID);
    rerender({});
  };

  return (
    <React.Fragment>
      <Container marginBottom="normal">
        <Tabs>
          <Tabs.Item isActive={currentTagID === null} onClick={() => onChangeTagID(null)}>
            Untagged
          </Tabs.Item>
          {Object.keys(CATEGORIES).map(id => (
            <Tabs.Item key={id} isActive={currentTagID === id} onClick={() => onChangeTagID(id)}>
              {CATEGORIES[id]}
            </Tabs.Item>
          ))}
        </Tabs>
      </Container>
      {currentIssue ? (
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
          <Container marginBottom="large">
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
                    {(currentIssueTagID && CATEGORIES[currentIssueTagID]) || 'Untagged'}
                    <Button.Icon>
                      <DownArrow size={14} />
                    </Button.Icon>
                  </Button>
                  <Dropdown isOpen={isOpen}>
                    {Object.keys(CATEGORIES).map(id => (
                      <Dropdown.Item
                        key={id}
                        onClick={() => {
                          setIssueTag(currentIssue, id);
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
              count={filteredIssues.length}
              onNext={onNext}
              onPrevious={onPrevious}
            />
          </Container>
        </React.Fragment>
      ) : (
        <React.Fragment>There are no issues with this tag.</React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Issues;
