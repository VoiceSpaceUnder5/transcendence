import React from 'react';
import styled from 'styled-components';

// 수정 예정

const FriendInfoListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* fill/gray */
  background: #f0f0f0;
  border-radius: 10px;
`;

const FriendInfoStyle = styled.div`
  align-self: stretch;
`;

interface FriendInfoProps {
  recordInfo: string;
}

export default function FriendInfo({recordInfo}: FriendInfoProps): JSX.Element {
  return (
    <FriendInfoListStyle>
      <FriendInfoStyle>{recordInfo}</FriendInfoStyle>
    </FriendInfoListStyle>
  );
}
