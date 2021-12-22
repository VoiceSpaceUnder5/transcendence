import React from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';
import {useDispatch} from 'react-redux';
import {joinChannel} from '../../modules/chatting';

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
  const onClickChannel = (id: number) => {
    dispatch(joinChannel(id));
    console.log(`참여 중인 방(room ID: ${id})에 참여 시도`);
  };
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
          onClick={onClickChannel}
        ></Channel>
      ))}
    </MenuList>
  );
}
