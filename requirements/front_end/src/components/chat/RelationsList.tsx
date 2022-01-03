// import {gql} from '@apollo/client';
import React from 'react';
import {MenuList} from '../common/MenuList';
import Friend from '../friend/Friend';

interface RelationListProps {
  userId: number;
}

// const GET_RELATIONS = gql`
//   query getMe {
//     getMe {
//       id
//       name
//       relations(typeId: "RE2") {
//         user_first_id
//         user_second_id
//         type {
//           id
//         }
//       }
//     }
//   }
// `;

// eslint-disable-next-line
export default function RelationList({userId}: RelationListProps): JSX.Element {
  // 친구추가 기능도 필요!!!!!
  const RelationList = [
    {
      userId: 'kilee',
      imagePath: './imagePath.png',
      description: '헬로우',
      isOnline: true,
    },
    {
      userId: 'mijeong',
      imagePath: './imagePath.png',
      description: '앱 만드실 분 괌',
      isOnline: true,
    },
    {
      userId: 'hyeonkim',
      imagePath: './imagePath.png',
      description: '즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐',
      isOnline: false,
    },
  ];
  // const {loading, error, data} = useQuery(GET_RELATIONS);
  // if (loading) return <>로딩 중..</>;
  // if (error) return <>에러...</>;
  // console.log(data);
  return (
    <MenuList>
      {/* <div style={{borderBottom: '1px solid black'}}>친구 요청</div>
      <div style={{borderBottom: '1px solid black'}}>친구 목록</div> */}
      {RelationList.map(friend => (
        <Friend
          key={friend.userId}
          imagePath={friend.imagePath}
          userId={friend.userId}
          description={friend.description}
          isOnline={friend.isOnline}
        ></Friend>
      ))}
    </MenuList>
  );
}
