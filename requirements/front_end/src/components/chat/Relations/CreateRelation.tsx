import React, {useCallback, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {OptionButton} from '../../common/Button';

const CREATE_RELATION = gql`
  mutation createRelation($createRelationInput: CreateRelationInput!) {
    createRelation(createRelationInput: $createRelationInput) {
      user_first_id
    }
  }
`;

interface CreateRelationProps {
  userId: number;
}

export default function CreateRelation({
  userId,
}: CreateRelationProps): JSX.Element {
  const [meId] = useState<number>(Number(localStorage.getItem('meId')));
  const [createRelation] = useMutation(CREATE_RELATION, {
    variables: {
      createRelationInput: {
        user_first_id: meId,
        user_second_id: userId,
        typeId: 'RE1',
      },
    },
  });
  const onClick = useCallback(() => {
    createRelation()
      .then(console.log)
      .catch(e => console.dir(e));
  }, []);
  return <OptionButton onClick={onClick}>친구 신청</OptionButton>;
}
