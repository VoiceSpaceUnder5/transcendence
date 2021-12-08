import React from 'react';
import BackBoard from './BackBoard';
import FriendsList from './FriendList';
import Friend from './Friend';
import FrindInfoList from './FriendInfoList';
import TitleDiv from './TitleDiv';

function MatchRecordBoard(): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>대전 기록</TitleDiv>
      <FriendsList>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="1승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="2승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="3승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="4승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="5승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="6승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="7승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="8승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="8승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="8승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
        <Friend imagePath="Profile.png">
          <FrindInfoList recordInfo="8승 패 등 대전 관련 정보"></FrindInfoList>
        </Friend>
      </FriendsList>
    </BackBoard>
  );
}

export default MatchRecordBoard;
