import React, {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import UserProfile from '../friend/UserProfile';
import Button from '../common/Button';

const GET_RELATIONS = gql`
  query getRelation($meId: Int!, $userId: Int!) {
    getRelation(user_first_id: $meId, user_second_id: $userId) {
      typeId
    }
  }
`;

interface ChannelUserProfileProps {
  meId: number;
  userId: number;
}

export default function ChannelUserProfile({
  meId,
  userId,
}: ChannelUserProfileProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [typeId, setTypeId] = useState<string | undefined>(undefined);
  const {loading, error, data} = useQuery(GET_RELATIONS, {
    variables: {
      meId: meId,
      userId: userId,
    },
  });

  useEffect(() => {
    if (data) {
      if (userId < meId) {
        switch (data.getRelation.typeId) {
          case 'RE0':
            setTypeId('RE1');
            break;
          case 'RE1':
            setTypeId('RE0');
            break;
          case 'RE3':
            setTypeId('RE4');
            break;
          case 'RE4':
            setTypeId('RE3');
            break;
        }
      } else {
        setTypeId(
          data.getRelation.typeId === undefined
            ? 'RE6'
            : data.getRelation.typeId,
        );
      }
    }
  }, [data]);
  const onClick = () => setVisible(!visible);
  if (loading) return <>로딩...</>;
  if (error) return <>에러...</>;
  return (
    <>
      <Button bg="grey" onClick={onClick}>
        프로필 보기
      </Button>
      {visible && (
        <UserProfile
          typeId={typeId as string}
          userId={userId}
          onBackClick={onClick}
        />
      )}
    </>
  );
}
