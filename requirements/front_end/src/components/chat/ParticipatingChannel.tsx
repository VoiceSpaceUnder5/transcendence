import React, {useState, useEffect} from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';
import {useDispatch} from 'react-redux';
import {afterJoin} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

const GET_PARTICIPATING_CHANNEL = gql`
  query participatingChannel($userId: Int!) {
    getParticipatingChannel(userId: $userId) {
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

export default function ParticipatingChannel(): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const {loading, data, error, refetch} = useQuery(GET_PARTICIPATING_CHANNEL, {
    variables: {
      userId: meId,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  const channelList = (data.getParticipatingChannel as ChatChannel[]).map(
    chatChannel => {
      return {
        id: chatChannel.id,
        name: chatChannel.name,
        number: chatChannel.chatChannelUsers.length,
        isPrivate: chatChannel.type.id === 'CT1' ? true : false,
      };
    },
  );
  if (channelList.length === 0) return <>참여 중인 채널이 없습니다.</>;
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
