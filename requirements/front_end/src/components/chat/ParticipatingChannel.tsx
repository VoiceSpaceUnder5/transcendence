import React, {useState, useEffect} from 'react';
import {MenuList} from '../common/MenuList';
import Channel from '../channel/Channel';
import {useDispatch} from 'react-redux';
import {afterJoin} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

const GET_PARTICIPATING_CHANNEL = gql`
  query participatingChannel($userId: Int!) {
    getChannelsByUserId(userId: $userId, joined: true) {
      type {
        id
      }
      id
      name
      channelUsers {
        userId
        role {
          id
        }
      }
    }
  }
`;

interface Channel {
  id: string;
  name: string;
  type: {
    id: string;
  };
  channelUsers: {
    userId: number;
    role: {
      id: string;
    };
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
  const channelList = (data.getChannelsByUserId as Channel[]).map(channel => {
    return {
      id: channel.id,
      name: channel.name,
      number: channel.channelUsers.length,
      role: channel.channelUsers.filter(user => user.userId === meId)[0].role
        .id,
      isPrivate: channel.type.id === 'CT1' ? true : false,
    };
  });
  if (channelList.length === 0) return <>참여 중인 채널이 없습니다.</>;
  const afterParticipatingChannel = (channelId: string) => {
    dispatch(afterJoin(channelId));
  };
  return (
    <MenuList>
      {channelList.map(channel => (
        <Channel
          key={channel.id}
          id={channel.id}
          name={channel.name}
          number={channel.number}
          isPrivate={channel.isPrivate}
          role={channel.role}
          onClick={() => afterParticipatingChannel(channel.id)}
        ></Channel>
      ))}
    </MenuList>
  );
}
