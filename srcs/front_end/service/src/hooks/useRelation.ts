import {useState, useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';

export const GET_RELATIONS = gql`
  query getRelation($meId: Int!, $userId: Int!) {
    getRelation(user_first_id: $meId, user_second_id: $userId) {
      typeId
    }
  }
`;

export default function useRelation(
  meId: number,
  userId: number,
): string | undefined {
  const {data} = useQuery(GET_RELATIONS, {
    variables: {
      meId: meId,
      userId: userId,
    },
    fetchPolicy: 'no-cache',
  });
  const [typeId, setTypeId] = useState<string | undefined>(undefined);

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
          case 'RE2':
            setTypeId('RE2');
            break;
          default:
            setTypeId('RE6');
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
  return typeId;
}
