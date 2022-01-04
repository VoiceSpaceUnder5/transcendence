import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Div from '../../common/Div';

const GET_RELATIONS = gql`
  query getMe {
    getMe {
      id
      name
      relations(typeId: "RE0") {
        user_first_id
        user_second_id
        type {
          id
        }
      }
    }
  }
`;

export default function RequestingList(): JSX.Element {
  const {loading, error, data} = useQuery(GET_RELATIONS);
  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  return (
    <>
      <Div align="center">요청 중</Div>
      {data.getMe.relations.length === 0 && '-'}
    </>
  );
}
