import React, {useEffect, useState} from 'react';
import Channel from '../channel/Channel';
import {MenuList} from '../common/MenuList';
import {useDispatch} from 'react-redux';
import {joinChannel} from '../../modules/chatting';
import {gql, useQuery} from '@apollo/client';

const GET_SEARCH_CHANNEL = gql`
  query notParticipatingChannel($userId: Int!) {
    getChannelsByUserId(userId: $userId, joined: false) {
      type {
        id
      }
      id
      name
      channelUsers {
        userId
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
  }[];
}

export default function SearchChannel(): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const {loading, data, error, refetch} = useQuery(GET_SEARCH_CHANNEL, {
    variables: {
      userId: meId,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <></>;
  if (error) return <>에러</>;
  const channelList = (data.getChannelsByUserId as Channel[]).map(channel => {
    return {
      id: channel.id,
      name: channel.name,
      number: channel.channelUsers.length,
      isPrivate: channel.type.id === 'CT1' ? true : false,
    };
  });

  // 각각의 채널을 클릭하면
  // 비밀번호를 요구하는 JoinChatting으로 넘어감
  const join = (id: string, isPrivate: boolean) => {
    dispatch(joinChannel(id, isPrivate));
  };
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
