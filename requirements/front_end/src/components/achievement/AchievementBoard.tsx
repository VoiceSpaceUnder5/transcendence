import React from 'react';
import BackBoard from '../common/BackBoard';
import AchievementList from './AchievementList';
import Achievement from './Achievement';
import TitleDiv from '../common/TitleDiv';
import {useQuery} from '@apollo/client';
import {GET_ACHIEVMENT} from '../../gql/query';

interface AchievementBoardProps {
  achievementData: {achievement: string; isSuccess: boolean}[];
}

export default function AchievementBoard({
  achievementData,
}: AchievementBoardProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_ACHIEVMENT, {
    variables: {
      input: Number(localStorage.getItem('meId')),
    },
  });
  if (loading) return <>로딩 중..</>;
  if (error) return <>에러</>;
  console.log(data);
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
