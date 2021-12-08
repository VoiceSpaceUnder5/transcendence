import React from 'react';
import styled from 'styled-components';
import FriendInfo from './FriendInfo';

// 수정 예정

const FriendInfoListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  /* fill/gray */
  background: #f0f0f0;
  border-radius: 10px;
`;

interface FriendInfoProps {
  recordInfo: React.ReactNode;
}

export default function FriendInfoList({
  recordInfo,
}: FriendInfoProps): JSX.Element {
  return (
    <FriendInfoListStyle>
      <FriendInfo>{recordInfo}</FriendInfo>
    </FriendInfoListStyle>
  );
}
