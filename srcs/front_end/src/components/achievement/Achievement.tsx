import React from 'react';
import styled from 'styled-components';

const AchievementStyle = styled.div<{isSuccess: boolean}>`
  position: static;
  width: 103px;
  height: 103px;
  left: 34px;
  top: 9.5px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 10px 7px;
  background: ${props => (props.isSuccess ? '#FFEF98' : '#89969F')};
  border-radius: 10px;
`;

interface AchievementProps {
  children: React.ReactNode;
  isSuccess: boolean;
}

export default function Achievement({
  children,
  isSuccess,
}: AchievementProps): JSX.Element {
  return <AchievementStyle isSuccess={isSuccess}>{children}</AchievementStyle>;
}
