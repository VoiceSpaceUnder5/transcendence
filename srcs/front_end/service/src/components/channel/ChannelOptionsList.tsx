import React, {useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import styled from 'styled-components';
import Button from '../common/Button';
import ChannelUser from './ChannelUser';
import {useDispatch} from 'react-redux';
import {selectMenu} from '../../modules/chatting';
import ChannelSetting from './ChannelSetting';
import {UserRole} from './ChannelOption';

const GET_USERS_BY_IDS = gql`
  query getUsersByIds($userIds: [Int!]!) {
    getUsersByIds(ids: $userIds) {
      id
      name
      profile_image_thumb
    }
  }
`;

// 소유자가 나가면 다른 유저한테 소유자 권한 넘기기
// 1. 관리자 탐색하고 관리자 있으면 관리자에게
// 2. 없으면 참여자에게
const LEAVE_CHANNEL = gql`
  mutation leaveChannel($input: LeaveChannelInput!) {
    leaveChannel(leaveChannelInput: $input)
  }
`;

interface UserInfo {
  id: number;
  name: string;
  profile_image: string;
}

interface ChannelOptionsListProps {
  meId: number;
  userRoles: UserRole[];
  channelId: string;
  channelName: string;
  channelPasswd: string;
  meRole: string;
}

export default function ChannelOptionsList({
  meId,
  userRoles,
  channelId,
  channelName,
  channelPasswd,
  meRole,
}: ChannelOptionsListProps): JSX.Element {
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState(false);
  const usersData = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds: userRoles.map(user => user.userId),
    },
    fetchPolicy: 'no-cache',
  });
  const [leaveChannel] = useMutation(LEAVE_CHANNEL);
  const onLeave = () => {
    leaveChannel({
      variables: {
        input: {
          userId: meId,
          channelId: channelId,
        },
      },
    })
      .then(() => {
        dispatch(selectMenu(1));
      })
      .catch(console.log);
  };
  const onSetting = () => {
    setIsClick(!isClick);
  };
  if (usersData.loading) return <></>;
  if (usersData.error) return <>에러</>;

  const users: UserInfo[] = usersData.data.getUsersByIds;
  return (
    <>
      <ChannelOptionsListStyles top={80}>
        {!isClick ? (
          <>
            <ChannelUser
              meRole={meRole}
              meId={meId}
              userId={meId}
              userRole={meRole}
              name="나"
              channelId={channelId}
            />
            {users.map(user => {
              if (user.id !== meId)
                return (
                  <ChannelUser
                    meRole={meRole}
                    meId={meId}
                    key={user.id}
                    name={user.name}
                    userId={user.id}
                    userRole={
                      userRoles.find(userRole => userRole.userId === user.id)
                        ?.roleId as string
                    }
                    channelId={channelId}
                  />
                );
            })}
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {meRole === 'UR0' && (
                <Button bg="grey" ani={false} onClick={onSetting}>
                  설정
                </Button>
              )}
              <Button bg="grey" ani={false} onClick={onLeave}>
                나가기
              </Button>
            </div>
          </>
        ) : (
          <ChannelSetting
            channelId={channelId}
            onBack={onSetting}
            channelName={channelName}
            channelPasswd={channelPasswd}
          />
        )}
      </ChannelOptionsListStyles>
    </>
  );
}

const ChannelOptionsListStyles = styled.ul<{top?: number}>`
  position: absolute;
  top: ${props => props.top}px;
  right: 5%;
  width: 58%;
  background-color: #dddddd;
  lists-tyle: none;
  padding: 4px;
  max-height: 68%;
  overflow-y: auto;
  border-radius: 8px;
`;
