import React, {ReactNode} from 'react';
import styled from 'styled-components';

interface AchievementListProps {
  children: ReactNode;
}

const AchievementListStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: static;
  width: 501px;
  left: 3px;
  top: 64px;

  border-radius: 4px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 16px 0px;
  overflow-x: auto;
`;

export default function AchievementList(
  props: AchievementListProps,
): JSX.Element {
  return <AchievementListStyle>{props.children}</AchievementListStyle>;
}
