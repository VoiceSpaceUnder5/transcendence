import React from 'react';
import styled from 'styled-components';

const AchievementStyle = styled.div<{isSuccess: boolean}>`
  position: static;
  width: 103px;
  height: 103px;
  left: 34px;
  top: 9.5px;

  border-radius: 10px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 7px;
  background: ${props => (props.isSuccess ? '#FFEF98' : '#89969F')};
  border-radius: 10px;
`;

interface AchievementProps {
  isSuccess: boolean;
  Achievement: string;
}

export default function Achievement(props: AchievementProps): JSX.Element {
  return (
    <AchievementStyle isSuccess={props.isSuccess}>
      {props.Achievement}
    </AchievementStyle>
  );
}
