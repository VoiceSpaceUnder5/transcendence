import React from 'react';
import styled from 'styled-components';

const FriendInfoStyle = styled.div`
  /* layout */
  display: flex;
  justify-content: center;
  margin: 2px 8px;
  padding: 2px 44px;

  background: ${props => props.theme.greyDivBg};
  border-radius: 10px;
`;

interface FriendInfoProps {
  children: React.ReactNode;
}

export default function FriendInfo({children}: FriendInfoProps): JSX.Element {
  return <FriendInfoStyle>{children}</FriendInfoStyle>;
}
