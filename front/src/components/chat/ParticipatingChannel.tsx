import React from 'react';
import ChannelList from '../channel/ChannelList';
import Channel from '../channel/Channel';

export default function ParticipatingChannel(): JSX.Element {
  const channelList = [
    {
      channelId: '같이 코딩하실 분',
      channelPeople: 3,
      isPrivate: true,
    },
    {
      channelId: '게임',
      channelPeople: 50,
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
