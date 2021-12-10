import React from 'react';
import styled from 'styled-components';

const FriendInfoListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

interface FriendInfoProps {
  children?: React.ReactNode;
}

export default function FriendInfoList({
  children,
}: FriendInfoProps): JSX.Element {
  return <FriendInfoListStyle>{children}</FriendInfoListStyle>;
}
