import React, {ReactNode} from 'react';
import styled from 'styled-components';

const FriendListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 488px;
  width: 89%;
`;

interface FriendListProps {
  children: ReactNode;
}

export default function FriendList({children}: FriendListProps): JSX.Element {
  return <FriendListStyle>{children}</FriendListStyle>;
}
