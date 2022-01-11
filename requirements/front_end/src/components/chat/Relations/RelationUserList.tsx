import React, {useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';
import Div from '../../common/Div';
import UserList from '../../friend/UserList';

const GET_RELATIONS = gql`
  query getRelation($typeId: String, $userId: Float!) {
    getRelationsByUserIdTreatAsFirst(typeId: $typeId, userId: $userId) {
      user_first_id
      user_second_id
      typeId
    }
  }
`;

interface Relation {
  user_second_id: number;
}

interface RelationListProps {
  typeId: string;
  type: string;
}

export default function RelationUserList({
  typeId,
  type,
}: RelationListProps): JSX.Element {
  const {loading, error, data, refetch} = useQuery(GET_RELATIONS, {
    variables: {
      userId: Number(localStorage.getItem('meId')),
      typeId: typeId,
    },
  });
  useEffect(() => {
    refetch();
  }, []);
  if (loading)
    return (
      <div>
        <div>로딩 중</div>
        <div>-</div>
      </div>
    );
  if (error) {
    console.error(error);
    return <>에러</>;
  }
  return (
    <>
      <Div align="center">{type}</Div>
      {!data.getRelationsByUserIdTreatAsFirst.length && '-'}
      <UserList
        typeId={typeId}
        userIds={data.getRelationsByUserIdTreatAsFirst.map(
          (relation: Relation) => relation.user_second_id,
        )}
      />
    </>
  );
}
