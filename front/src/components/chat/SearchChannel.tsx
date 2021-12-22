import React from 'react';
import Channel from '../channel/Channel';
import {MenuList} from '../common/MenuList';
import {useDispatch} from 'react-redux';
import {join} from '../../modules/chatting';

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
  const joinChannel = (id: number, isPrivate: boolean) =>
    dispatch(join(id, isPrivate));
  return (
    <MenuList>
      {channelList.map(channel => (
        <Channel
          key={channel.id}
          id={channel.id}
          name={channel.name}
          number={channel.number}
          isPrivate={channel.isPrivate}
          onClick={() => joinChannel(channel.id, channel.isPrivate)}
        ></Channel>
      ))}
    </MenuList>
  );
}
