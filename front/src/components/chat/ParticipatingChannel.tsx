import React from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';

export default function ParticipatingChannel(): JSX.Element {
  const channelList = [
    {
      id: 0,
      name: '노실 분?',
      number: 3,
      isPrivate: true,
    },
    {
      id: 1,
      name: '윗방처럼 놀면 망함',
      number: 50,
      isPrivate: false,
    },
  ];
  return (
    <MenuList>
      {channelList.map(channel => (
        <Channel
          key={channel.id}
          id={channel.id}
          name={channel.name}
          number={channel.number}
          isJoin={true}
          isPrivate={channel.isPrivate}
        ></Channel>
      ))}
    </MenuList>
  );
}
