import React, {useEffect} from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';
import {useDispatch} from 'react-redux';
import {afterJoin} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

interface ParticipatingChannelProps {
  userId: number;
}

const GET_JOIN_CHANNEL = gql`
  query ParticipatingChannel($userId: Int!) {
    ParticipatingChannel(userId: $userId) {
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
  userId,
}: ParticipatingChannelProps): JSX.Element {
  const {loading, data, error, refetch} = useQuery(GET_JOIN_CHANNEL, {
    variables: {
      userId,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  const channelList = (data.ParticipatingChannel as ChatChannel[]).map(
    chatChannel => {
      return {
        id: chatChannel.id,
        name: chatChannel.name,
        number: chatChannel.chatChannelUsers.length,
        isPrivate: chatChannel.type.id === 'CT1' ? true : false,
      };
    },
  );
  const afterParticipatingChannel = (channelId: number) =>
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
          onClick={() => afterParticipatingChannel(channel.id)}
        ></Channel>
      ))}
    </MenuList>
  );
}
