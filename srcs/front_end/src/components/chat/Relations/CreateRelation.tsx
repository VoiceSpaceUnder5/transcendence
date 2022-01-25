import React, {useCallback, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {OptionButton} from '../../common/Button';
import {GET_RELATIONS} from '../../../hooks/useRelation';
import {GET_MESSAGE_RELATIONS} from '../MessageBox';

const CREATE_RELATION = gql`
  mutation createRelation($createRelationInput: CreateRelationInput!) {
    createRelation(createRelationInput: $createRelationInput) {
      user_first_id
    }
  }
`;

interface CreateRelationProps {
  userId: number;
  typeId: string;
}

export default function CreateRelation({
  userId,
  typeId,
}: CreateRelationProps): JSX.Element {
  const [meId] = useState<number>(Number(localStorage.getItem('meId')));
  const [createRelation] = useMutation(CREATE_RELATION, {
    variables: {
      createRelationInput: {
        user_first_id: meId,
        user_second_id: userId,
        typeId: typeId,
      },
    },
    refetchQueries: [GET_RELATIONS, GET_MESSAGE_RELATIONS],
  });
  const onClick = useCallback(() => {
    createRelation().catch(e => console.dir(e));
  }, []);
  return (
    <OptionButton onClick={onClick}>
      {typeId === 'RE1' ? '친구 신청' : '차단'}
    </OptionButton>
  );
}
