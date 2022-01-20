import React, {useState} from 'react';
import {OptionButton} from '../../common/Button';
import {gql, useMutation} from '@apollo/client';
import {GET_RELATIONS} from '../../../hooks/useRelation';

const UPDATE_RELATION = gql`
  mutation updateRelation($updateRelationInput: CreateRelationInput!) {
    updateRelation(updateRelationInput: $updateRelationInput) {
      user_first_id
    }
  }
`;

interface UpdateRelationProps {
  userId: number;
  actionTypeId: string;
  actionType: string;
}

export default function UpdateRelation({
  userId,
  actionTypeId,
  actionType,
}: UpdateRelationProps): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const [updateRelation] = useMutation(UPDATE_RELATION, {
    variables: {
      updateRelationInput: {
        user_first_id: meId,
        user_second_id: userId,
        typeId: actionTypeId,
      },
    },
    refetchQueries: [GET_RELATIONS],
  });
  const onClick = () => {
    updateRelation();
  };
  return <OptionButton onClick={onClick}>{actionType}</OptionButton>;
}
