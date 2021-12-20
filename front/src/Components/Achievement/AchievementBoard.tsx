import React from 'react';
import BackBoard from '../common/BackBoard';
import AchievementList from './AchievementList';
import Achievement from './Achievement';
import TitleDiv from '../common/TitleDiv';

interface AchievementBoardProps {
  achievementData: {achievement: string; isSuccess: boolean}[];
}

export default function AchievementBoard({
  achievementData,
}: AchievementBoardProps): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>업적</TitleDiv>
      <AchievementList>
        {achievementData.map(achievementDatum => (
          <Achievement
            key={achievementDatum.achievement}
            isSuccess={achievementDatum.isSuccess}
          >
            {achievementDatum.achievement}
          </Achievement>
        ))}
      </AchievementList>
    </BackBoard>
  );
}
