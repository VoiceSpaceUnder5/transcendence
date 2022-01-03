import React, {useEffect} from 'react';
import Channel from '../channel/Channel';
import {MenuList} from '../common/MenuList';
import {useDispatch} from 'react-redux';
import {joinChannel} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

const GET_SEARCH_CHANNEL = gql`
  query notParticipatingChannel($userId: Int!) {
    getNotParticipatingChannel(userId: $userId) {
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

interface SearchChannelProps {
  userId: number;
}

export default function SearchChannel({
  userId,
}: SearchChannelProps): JSX.Element {
  const {loading, data, error, refetch} = useQuery(GET_SEARCH_CHANNEL, {
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
  const channelList = (data.getNotParticipatingChannel as ChatChannel[]).map(
    chatChannel => {
      return {
        id: chatChannel.id,
        name: chatChannel.name,
        number: chatChannel.chatChannelUsers.length,
        isPrivate: chatChannel.type.id === 'CT1' ? true : false,
      };
    },
  );
  const join = (id: number, isPrivate: boolean) =>
    dispatch(joinChannel(id, isPrivate));
  if (channelList.length === 0) return <>채널이 없습니다.</>;
  return (
    <MenuList>
      {channelList.map(channel => (
        <Channel
          key={channel.id}
          id={channel.id}
          name={channel.name}
          number={channel.number}
          isPrivate={channel.isPrivate}
          onClick={() => join(channel.id, channel.isPrivate)}
        ></Channel>
      ))}
    </MenuList>
  );
}
