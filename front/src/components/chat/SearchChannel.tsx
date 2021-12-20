import React from 'react';
import ChannelList from '../channel/ChannelList';
import Channel from '../channel/Channel';

export default function SearchChannel(): JSX.Element {
  const channelList = [
    {
      channelId: '혼자 코딩하실 분',
      channelPeople: 3,
      isPrivate: true,
    },
    {
      channelId: '다른 게임',
      channelPeople: 50,
      isPrivate: false,
    },
    {
      channelId: '놀 사람',
      channelPeople: 60,
      isPrivate: true,
    },
    {
      channelId: '한강 온도 체크할 사람',
      channelPeople: 10,
      isPrivate: false,
    },
    {
      channelId: '공부하실 분',
      channelPeople: 3,
      isPrivate: false,
    },
    {
      channelId: '즐',
      channelPeople: 3,
      isPrivate: false,
    },
    {
      channelId: '즐',
      channelPeople: 3,
      isPrivate: false,
    },
    {
      channelId: '즐',
      channelPeople: 3,
      isPrivate: false,
    },
  ];
  return (
    <ChannelList>
      {channelList.map((channel, idx) => (
        <Channel
          key={idx}
          channelId={channel.channelId}
          channelPeople={channel.channelPeople}
          isPrivate={channel.isPrivate}
        ></Channel>
      ))}
    </ChannelList>
  );
}
