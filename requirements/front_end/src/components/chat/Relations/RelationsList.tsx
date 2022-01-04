import React from 'react';
import useInput from '../../../hooks/useInput';
import {MenuList} from '../../common/MenuList';
import BlockList from './BlockList';
import FriendList from './FriendList';
import RequestedList from './RequestedList';
import RequestingList from './RequestingList';
import SearchUser from './SearchUser';
// import Friend from '../../friend/Friend';

interface RelationListProps {
  userId: number;
}

// eslint-disable-next-line
export default function RelationList({userId}: RelationListProps): JSX.Element {
  // 친구추가 기능도 필요!!!!!
  // const RelationList = [
  //   {
  //     userId: 'kilee',
  //     imagePath: './imagePath.png',
  //     description: '헬로우',
  //     isOnline: true,
  //     relationState: '친구',
  //   },
  //   {
  //     userId: 'mijeong',
  //     imagePath: './imagePath.png',
  //     description: '앱 만드실 분 괌',
  //     isOnline: true,
  //     relationState: '요청 받음',
  //   },
  //   {
  //     userId: 'hyeonkim',
  //     imagePath: './imagePath.png',
  //     description: '즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐',
  //     isOnline: false,
  //     relationState: '차단됨',
  //   },
  // ];
  // const {loading, error, data} = useQuery(GET_RELATIONS);
  // if (loading) return <>로딩 중..</>;
  // if (error) return <>에러...</>;
  // console.log(data);
  const [{name}, onChange] = useInput({name: '' as string});
  return (
    <MenuList>
      {/* <div style={{borderBottom: '1px solid black'}}>친구 요청</div>
      <div style={{borderBottom: '1px solid black'}}>친구 목록</div> */}
      {/* {RelationList.map(friend => (
        <Friend
          key={friend.userId}
          imagePath={friend.imagePath}
          userId={friend.userId}
          description={friend.description}
          isOnline={friend.isOnline}
        ></Friend>
      ))} */}
      <SearchUser name={name as string} onChange={onChange} />
      {!name && (
        <>
          <FriendList />
          <RequestedList />
          <RequestingList />
          <BlockList />
        </>
      )}
    </MenuList>
  );
}
