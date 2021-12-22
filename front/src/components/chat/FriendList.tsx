import React from 'react';
import {MenuList} from '../common/MenuList';
import Friend from '../friend/Friend';

export default function FriendList(): JSX.Element {
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
