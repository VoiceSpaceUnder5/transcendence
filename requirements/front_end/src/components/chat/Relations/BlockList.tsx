import React from 'react';
import Div from '../../common/Div';
import {gql, useQuery} from '@apollo/client';

const GET_RELATIONS = gql`
  query getMe {
    getMe {
      id
      name
      relations(typeId: "RE3") {
        user_first_id
        user_second_id
        type {
          id
        }
      }
    }
  }
`;

export default function BlockList(): JSX.Element {
  const {loading, error, data} = useQuery(GET_RELATIONS);
  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  // console.log(data.getMe.relations.length);
  return (
    <>
      <Div align="center">차단 중</Div>
      {data.getMe.relations.length === 0 && '-'}
    </>
  );
}
