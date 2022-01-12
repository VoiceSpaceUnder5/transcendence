import {gql, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import Button from '../common/Button';
import ChannelOptionsList from './ChannelOptionsList';

const GET_CHANNEL_USERS = gql`
  query getChannelUsersByChannelId($channelId: Int!) {
    getChatChannelUsersByChannelId(channelId: $channelId) {
      userId
    }
  }
`;

interface User {
  userId: number;
}

interface ChannelUsersProps {
  meId: number;
  channelId: number;
  channelName: string;
  channelPasswd: string;
  role: string;
}

export default React.memo(function ChannelOption({
  meId,
  channelId,
  channelName,
  channelPasswd,
  role,
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
  const users: User[] = data.getChatChannelUsersByChannelId;
  return (
    <>
      <Button bg="dark" onClick={onClick} ani={false}>
        {!visible ? '···' : 'x'}
      </Button>
      {visible && (
        <>
          <ChannelOptionsList
            meId={meId}
            userIds={users.map(user => user.userId)}
            channelId={channelId}
            channelName={channelName}
            channelPasswd={channelPasswd}
            role={role}
          ></ChannelOptionsList>
        </>
      )}
    </>
  );
});
