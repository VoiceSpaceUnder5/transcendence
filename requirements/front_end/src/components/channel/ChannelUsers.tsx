import {gql, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import Button from '../common/Button';
import ChannelUsersList from './ChannelUsersList';

const GET_CHANNEL_USERS = gql`
  query getChannelUsersByChannelId($channelId: Int!) {
    chatChannelUsersByChannelId(channelId: $channelId) {
      userId
    }
  }
`;

interface User {
  userId: number;
}

interface ChannelUsersProps {
  channelId: number;
}

export default React.memo(function ChannelUsers({
  channelId,
}: ChannelUsersProps): JSX.Element {
  const {loading, data, error, refetch} = useQuery(GET_CHANNEL_USERS, {
    variables: {
      channelId: channelId,
    },
  });
  const [visible, setVisible] = useState(false);
  const onClick = () => setVisible(!visible);

  useEffect(() => {
    refetch();
  }, []);
  if (loading) return <>로딩</>;
  if (error) return <>에러</>;
  const users: User[] = data.chatChannelUsersByChannelId;
  return (
    <>
      <Button bg="dark" onClick={onClick} ani={false}>
        {!visible ? `${users.length} 명` : '닫기'}
      </Button>
      {visible && (
        <ChannelUsersList
          userIds={users.map(user => user.userId)}
        ></ChannelUsersList>
      )}
    </>
  );
});
