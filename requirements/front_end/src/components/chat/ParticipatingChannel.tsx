import React from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';
import {useDispatch} from 'react-redux';
import {afterJoin} from '../../modules/chatting';

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
  const dispatch = useDispatch();
  const afterJoinChannel = (id: number) => dispatch(afterJoin(id));
  return (
    <MenuList>
      {channelList.map(channel => (
        <Channel
          key={channel.id}
          id={channel.id}
          name={channel.name}
          number={channel.number}
          isPrivate={channel.isPrivate}
          onClick={() => afterJoinChannel(channel.id)}
        ></Channel>
      ))}
    </MenuList>
  );
}
