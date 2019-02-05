/* @flow */
import * as React from 'react';
import { DownArrow } from 'styled-icons/boxicons-solid';
import { LinkExternal } from 'styled-icons/boxicons-regular';
import type { Issue } from '../../../types';
import { Container, Button, Pagination, Dropdown } from '../../../design';
import storage from '../../storage';
import TagsTabs from './TagsTabs';
import IssueDetails from './IssueDetails';

const CATEGORIES = {
  thirdParty: 'Third-Party',
  browserSupport: 'Browser Support',
  edgeCase: 'Edge Case',
  needsFix: 'Needs Fix',
};

function IssuesCarousel({ issues }: { issues: Issue[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentTagID, setCurrentTagID] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [_, rerender] = React.useState({});

  if (issues.length === 0) {
    return null;
  }

  const onChangeTagID = (newTagID: ?string) => {
    setCurrentTagID(newTagID);
    setCurrentIndex(0);
  };

  const filteredIssues = issues.filter(issue => {
    const tag = storage.getIssueTag(issue);

    if (tag == null) {
      return currentTagID == null;
    }

    return tag.id === currentTagID;
  });
  const currentIssue = filteredIssues[currentIndex];
  const currentIssueTag = currentIssue ? storage.getIssueTag(currentIssue) : null;
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
        <TagsTabs currentTagID={currentTagID} onChangeTagID={onChangeTagID} />
      </Container>
      {currentIssue ? (
        <React.Fragment>
          <Container marginBottom="large">
            <IssueDetails issue={currentIssue} />
          </Container>
          <Container marginBottom="large">
            <Button
              as="a"
              type={null}
              href={currentIssue.url}
              target="_blank"
              marginRight="normal"
              secondary
            >
              Open
              <Button.Icon>
                <LinkExternal size={14} />
              </Button.Icon>
            </Button>
            <Dropdown.Container marginRight="normal">
              {({ isOpen, onOpen, onClose }) => (
                <React.Fragment>
                  <Button onClick={onOpen} primary>
                    {currentIssueTag ? currentIssueTag.label : 'Untagged'}
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
        <Container>There are no issues with this tag.</Container>
      )}
    </React.Fragment>
  );
}

export default IssuesCarousel;
