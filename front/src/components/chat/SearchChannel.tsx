import React from 'react';
import ChannelList from '../channel/ChannelList';
import Channel from '../channel/Channel';

import {useDispatch} from 'react-redux';
import {joinChannel} from '../../modules/chatting';
// import ChannelInfo from '../channel/ChannelInfo';

export default function SearchChannel(): JSX.Element {
  const channelList = [
    {
      id: 0,
      name: '혼자 코딩하실 분',
      number: 3,
      isPrivate: true,
    },
    {
      id: 1,
      name: '다른 게임',
      number: 50,
      isPrivate: false,
    },
    {
      id: 2,
      name: '놀 사람',
      number: 60,
      isPrivate: true,
    },
    {
      id: 3,
      name: '한강 온도 체크할 사람',
      number: 10,
      isPrivate: false,
    },
    {
      id: 4,
      name: '공부하실 분',
      number: 3,
      isPrivate: false,
    },
    {
      id: 5,
      name: '즐',
      number: 3,
      isPrivate: false,
    },
    {
      id: 6,
      name: '즐',
      number: 3,
      isPrivate: false,
    },
    {
      id: 7,
      name: '즐',
      number: 3,
      isPrivate: false,
    },
  ];
  const dispatch = useDispatch();
  const onClickChannel = (id: number) => {
    dispatch(joinChannel(id));
    console.log(`참여 중이 아닌 방(room ID: ${id})에 참여 시도`);
  };
  return (
    <ChannelList>
      {channelList.map(channel => (
        <Channel
          key={channel.id}
          id={channel.id}
          name={channel.name}
          isJoin={false}
          number={channel.number}
          isPrivate={channel.isPrivate}
          onClick={onClickChannel}
        ></Channel>
      ))}
    </ChannelList>
  );
}
