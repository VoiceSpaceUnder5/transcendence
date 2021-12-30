import React from 'react';
import Channel from '../channel/Channel';
import {MenuList} from '../common/MenuList';
import {useDispatch} from 'react-redux';
import {ParticipatingChannel} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

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

interface SearchChannelProps {
  userId: number;
}

export default function SearchChannel({
  // eslint-disable-next-line
  userId,
}: SearchChannelProps): JSX.Element {
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
  // const channelList = [
  //   {
  //     id: 0,
  //     name: '혼자 코딩하실 분',
  //     number: 3,
  //     isPrivate: true,
  //   },
  // ];
  const join = (id: number, isPrivate: boolean) =>
    dispatch(ParticipatingChannel(id, isPrivate));
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
