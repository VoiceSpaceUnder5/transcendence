import React, {useEffect, useState} from 'react';
import BackBoard from '../common/BackBoard';
import AchievementList from './AchievementList';
import Achievement from './Achievement';
import TitleDiv from '../common/TitleDiv';
import {useQuery} from '@apollo/client';
import {GET_ACHIEVMENT} from '../../gql/query';

interface AchievementType {
  typeId: string;
}

export default function AchievementBoard(): JSX.Element {
  const [achievements, setAchievements] = useState({
    // AT0: 첫 승, AT1: 첫 로그인, AT2: 첫 패
    AT0: false,
    AT1: false,
    AT2: false,
  });
  const {loading, error, data} = useQuery(GET_ACHIEVMENT, {
    variables: {
      input: Number(localStorage.getItem('meId')),
    },
  });
  useEffect(() => {
    if (data) {
      const fetchedAchievements = data.getAchievementsByUserId;
      fetchedAchievements.forEach((achivement: AchievementType) => {
        setAchievements(achievements => ({
          ...achievements,
          [achivement.typeId]: true,
        }));
      });
    }
  }, [data]);
  if (loading) return <>로딩 중..</>;
  if (error) return <>에러</>;
  return (
    <BackBoard>
      <TitleDiv>업적</TitleDiv>
      <AchievementList>
        <Achievement isSuccess={achievements.AT0}>첫 로그인</Achievement>
        <Achievement isSuccess={achievements.AT1}>첫 승</Achievement>
        <Achievement isSuccess={achievements.AT2}>첫 패</Achievement>
      </AchievementList>
    </BackBoard>
  );
}
