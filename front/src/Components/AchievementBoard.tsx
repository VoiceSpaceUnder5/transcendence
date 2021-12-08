import React from 'react';
import BackBoard from './BackBoard';
import AchievementList from './AchievementList';
import Achievement from './Achievement';
import TitleDiv from './TitleDiv';

export default function AchievementBoard(): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>업적</TitleDiv>
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
