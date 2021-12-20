import React from 'react';
import FriendsList from '../friend/FriendList';
import Friend from '../friend/Friend';

export default function ChatFriendList(): JSX.Element {
  const friendList = [
    {
      userId: 'kilee',
      imagePath: '',
      description: '헬로우',
      isOnline: true,
    },
    {
      userId: 'mijeong',
      imagePath: '',
      description: '앱 만드실 분 괌',
      isOnline: true,
    },
    {
      userId: 'hyeonkim',
      imagePath: '',
      description: '즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐즐',
      isOnline: false,
    },
  ];
  return (
    <FriendsList>
      {friendList.map(friend => (
        <Friend
          key={friend.userId}
          imagePath={friend.imagePath}
          userId={friend.userId}
          description={friend.description}
          isOnline={friend.isOnline}
        ></Friend>
      ))}
    </FriendsList>
  );
}
