import React from 'react';
import BackBoard from './BackBoard';
import AchievementList from './AchievementList';
import Achievement from './Achievement';
import styled from 'styled-components';

const TitleText = styled.div`
  position: static;
  width: 91.53px;
  height: 24px;
  left: 207.23px;
  top: 30px;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #ffffff;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 24px 0px;
`;

export default function AchievementBoard(): JSX.Element {
  return (
    <BackBoard height="210px">
      <TitleText>업적</TitleText>
      <AchievementList>
        <Achievement isSuccess Achievement="ohohoh"></Achievement>
        <Achievement isSuccess Achievement="ohohoh"></Achievement>
        <Achievement isSuccess={false} Achievement="asdf"></Achievement>
        <Achievement isSuccess={false} Achievement="ohfdsohoh"></Achievement>
        <Achievement isSuccess={false} Achievement="ohoasdhoh"></Achievement>
      </AchievementList>
    </BackBoard>
  );
}
