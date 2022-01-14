import {gql, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import Button from '../common/Button';
import ChannelOptionsList from './ChannelOptionsList';

const GET_CHANNEL_USERS = gql`
  query getChannelUsersByChannelId($channelId: Int!) {
    getChannelUsersByChannelId(channelId: $channelId) {
      userId
      roleId
    }
  }
`;

export interface UserRole {
  userId: number;
  roleId: string;
}

interface ChannelUsersProps {
  meId: number;
  channelId: number;
  channelName: string;
  channelPasswd: string;
}

export default React.memo(function ChannelOption({
  meId,
  channelId,
  channelName,
  channelPasswd,
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
  const userRoles: UserRole[] = data.getChannelUsersByChannelId;
  const meRole = userRoles.find(userRole => userRole.userId === meId)
    ?.roleId as string;
  return (
    <>
      <Button bg="dark" onClick={onClick} ani={false}>
        {!visible ? '···' : 'x'}
      </Button>
      {visible && (
        <>
          <ChannelOptionsList
            meId={meId}
            userRoles={userRoles}
            channelId={channelId}
            channelName={channelName}
            channelPasswd={channelPasswd}
            meRole={meRole}
          ></ChannelOptionsList>
        </>
      )}
    </>
  );
});
