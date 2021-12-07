import React, {ReactNode} from 'react';
import styled from 'styled-components';

const FriendsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 445px;
  height: 450px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 24px 0px;
  overflow-y: auto;
`;

interface FriendsListProps {
  children: ReactNode;
}

export default function FriendsList({children}: FriendsListProps): JSX.Element {
  return <FriendsListStyle>{children}</FriendsListStyle>;
}
