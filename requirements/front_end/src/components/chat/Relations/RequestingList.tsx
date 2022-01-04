import React from 'react';
import {gql, useQuery} from '@apollo/client';

const GET_RELATIONS = gql`
  query getMe {
    getMe {
      id
      name
      relations(typeId: "RE2") {
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
  console.log(data);
  return (
    <>
      <div style={{borderBottom: '1px solid black'}}>수락 대기</div>
    </>
  );
}
