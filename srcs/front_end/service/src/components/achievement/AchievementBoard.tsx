import React from 'react';
import BackBoard from '../common/BackBoard';
import AchievementList from './AchievementList';
import TitleDiv from '../common/TitleDiv';

export default function AchievementBoard(): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>업적</TitleDiv>
      <AchievementList userId={Number(localStorage.getItem('meId'))} />
    </BackBoard>
  );
}
