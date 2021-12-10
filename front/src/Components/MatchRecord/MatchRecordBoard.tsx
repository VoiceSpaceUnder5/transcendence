import React from 'react';
import BackBoard from '../common/BackBoard';
import FriendsList from '../Friend/FriendList';
import Friend from '../Friend/Friend';
import TitleDiv from '../common/TitleDiv';

function MatchRecordBoard(): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>대전 기록</TitleDiv>
      <FriendsList>
        <Friend imagePath="Profile.png"></Friend>
      </FriendsList>
    </BackBoard>
  );
}

export default MatchRecordBoard;
