import React from 'react';
import {MenuList} from '../common/MenuList';
import Friend from '../friend/Friend';

interface FriendListProps {
  userId: number;
}

// eslint-disable-next-line
export default function FriendList({userId}: FriendListProps): JSX.Element {
  // 친구추가 기능도 필요!!!!!
  const friendList = [
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
  return (
    <MenuList>
      {/* <div style={{borderBottom: '1px solid black'}}>친구 요청</div>
      <div style={{borderBottom: '1px solid black'}}>친구 목록</div> */}
      {friendList.map(friend => (
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
