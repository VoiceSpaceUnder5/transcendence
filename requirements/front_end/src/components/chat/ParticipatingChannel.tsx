import React from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';
import {useDispatch} from 'react-redux';
import {afterJoin} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

interface ParticipatingChannelProps {
  userId: number;
}

const GET_PARTICIPATING_CHANNEL = gql`
  query getChannels {
    chatChannels {
      type {
        id
      }
      id
      name
      chatChannelUsers {
        userId
      }
    }
  }
`;

interface ChatChannel {
  id: number;
  name: string;
  type: {
    id: string;
  };
  chatChannelUsers: {
    userId: number;
  }[];
}

export default function ParticipatingChannel({
  // eslint-disable-next-line
  userId,
}: ParticipatingChannelProps): JSX.Element {
  const {loading, data, error} = useQuery(GET_PARTICIPATING_CHANNEL);
  const dispatch = useDispatch();

  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  console.log(data);
  const channelList = (data.chatChannels as ChatChannel[]).map(chatChannel => {
    return {
      id: chatChannel.id,
      name: chatChannel.name,
      number: chatChannel.chatChannelUsers.length,
      isPrivate: chatChannel.type.id === 'CT1' ? true : false,
    };
  });
  const afterJoinChannel = (channelId: number) =>
    dispatch(afterJoin(channelId));

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
