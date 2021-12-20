import React from 'react';
import styled from 'styled-components';

const ChannelInfoListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

interface ChannelInfoListProps {
  children?: React.ReactNode;
}

export default function ChannelInfoList({
  children,
}: ChannelInfoListProps): JSX.Element {
  return <ChannelInfoListStyle>{children}</ChannelInfoListStyle>;
}
