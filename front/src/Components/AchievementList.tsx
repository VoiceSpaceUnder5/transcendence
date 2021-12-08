import React, {ReactNode} from 'react';
import styled from 'styled-components';

interface AchievementListProps {
  children: ReactNode;
}

// Carousel로 수정 예정
const AchievementListStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;
  // width: 456px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  overflow-x: auto;
`;

export default function AchievementList(
  props: AchievementListProps,
): JSX.Element {
  return <AchievementListStyle>{props.children}</AchievementListStyle>;
}
