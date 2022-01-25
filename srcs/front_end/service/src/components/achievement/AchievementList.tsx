import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_ACHIEVMENT} from '../../gql/query';
import Achievement from './Achievement';
import styled from 'styled-components';

interface AchievementType {
  typeId: string;
}

interface AchivementListProps {
  userId: number;
}

export default function AchievementList({
  userId,
}: AchivementListProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_ACHIEVMENT, {
    variables: {
      input: userId,
    },
    fetchPolicy: 'no-cache',
  });
  const [achievements, setAchievements] = useState({
    // AT0: 첫 승, AT1: 첫 로그인, AT2: 첫 패
    AT0: false,
    AT1: false,
    AT2: false,
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
  if (loading) return <></>;
  if (error) return <>에러</>;
  return (
    <AchievementListStyle>
      <Achievement isSuccess={achievements.AT0}>첫 로그인</Achievement>
      <Achievement isSuccess={achievements.AT1}>첫 승</Achievement>
      <Achievement isSuccess={achievements.AT2}>첫 패</Achievement>
    </AchievementListStyle>
  );
}

// Carousel로 수정 예정
const AchievementListStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  overflow-x: auto;
`;
