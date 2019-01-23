/* @flow */
import * as React from 'react';
import { Tabs } from '../../../design';
import { CATEGORIES } from '../../constants';

function TagsTabs({
  currentTagID,
  onChangeTagID,
}: {
  currentTagID: ?string,
  onChangeTagID: (tagID: ?string) => void,
}) {
  return (
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
  );
}

export default TagsTabs;
