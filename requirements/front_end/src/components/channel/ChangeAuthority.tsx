import {gql, useMutation} from '@apollo/client';
import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import {GET_CHANNEL_USERS} from './ChannelOption';

const UPDATE_CHANNEL_USER = gql`
  mutation updateChannelUser($input: CreateChannelUserInput!) {
    updateChannelUser(updateChannelUserInput: $input) {
      userId
    }
  }
`;

interface ChangeAuthorityProps {
  meId: number;
  meRole: string;
  userId: number;
  userRole: string;
  channelId: number;
}

export default function ChangeAuthority({
  userId,
  userRole,
  channelId,
}: ChangeAuthorityProps): JSX.Element {
  const [isClick, setIsClick] = useState(false);
  const onClick = () => {
    setIsClick(!isClick);
  };
  const [updateChannelUser] = useMutation(UPDATE_CHANNEL_USER, {
    refetchQueries: [GET_CHANNEL_USERS],
  });
  const onClickManager = () => {
    updateChannelUser({
      variables: {
        input: {
          channelId: channelId,
          userId: userId,
          roleId: userRole === 'UR1' ? 'UR2' : 'UR1',
        },
      },
    });
  };
  const onClickBlock = () => {
    updateChannelUser({
      variables: {
        input: {
          channelId: channelId,
          userId: userId,
          roleId: userRole === 'UR3' ? 'UR2' : 'UR3',
        },
      },
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button bg="grey" onClick={onClick}>
        권한 설정
      </Button>
      {isClick && (
        <AuthDiv>
          <Button onClick={onClick} bg="grey">
            뒤로
          </Button>
          {userRole !== 'UR3' && (
            <Button bg="dark" onClick={onClickBlock}>
              차단
            </Button>
          )}
          {userRole === 'UR3' && (
            <Button bg="dark" onClick={onClickBlock}>
              차단 해제
            </Button>
          )}
          {(userRole === 'UR2' || userRole == 'UR1') && (
            <Button bg="dark" onClick={onClickManager}>
              {userRole === 'UR2' ? '관리자로 임명' : '관리자 해제'}
            </Button>
          )}
        </AuthDiv>
      )}
    </div>
  );
}

const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 80%;
  position: absolute;
  left: 8%;
  top: 8%;

  padding: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
`;
