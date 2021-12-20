import React from 'react';
import styled from 'styled-components';

const FriendInfoStyle = styled.div`
  text-align: center;
  margin: 2px 0px;
  padding: 2px 8px;
  height: 22px;
  white-space: nowrap;

  background: ${props => props.theme.greyDivBg};
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 10px;
`;

interface FriendInfoProps {
  children: React.ReactNode;
}

export default function FriendInfo({children}: FriendInfoProps): JSX.Element {
  return <FriendInfoStyle>{children}</FriendInfoStyle>;
}
