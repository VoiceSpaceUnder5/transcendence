import React from 'react';
import styled from 'styled-components';

const FriendInfoStyle = styled.div`
  /* layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding: 2px 44px;

  background: rgba(247, 247, 247, 0.8);
  border-radius: 10px;
`;

interface FriendInfoProps {
  children: React.ReactNode;
}

export default function FriendInfo({children}: FriendInfoProps): JSX.Element {
  return <FriendInfoStyle>{children}</FriendInfoStyle>;
}
