import React, {useEffect} from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';
import {useDispatch} from 'react-redux';
import {afterJoin} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

const GET_PARTICIPATING_CHANNEL = gql`
  query participatingChannel($userId: Int!) {
    participatingChannel(userId: $userId) {
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

interface ParticipatingChannelProps {
  userId: number;
}

export default function ParticipatingChannel({
  userId,
}: ParticipatingChannelProps): JSX.Element {
  const {loading, data, error, refetch} = useQuery(GET_PARTICIPATING_CHANNEL, {
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
  const channelList = (data.participatingChannel as ChatChannel[]).map(
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
