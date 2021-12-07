import React from 'react';
import styled from 'styled-components';
import BackBoard from './BackBoard';
import FriendsList from './FriendsList';
import Friend from './Friend';
import MatchRecordInfo from './MatchRecordInfo';

const TitleText = styled.div`
  position: static;
  width: 91.53px;
  height: 24px;
  left: 207.23px;
  top: 30px;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #ffffff;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 24px 0px;
`;

function MatchRecord() {
  return (
    <BackBoard height="558px">
      <TitleText>대전 기록</TitleText>
      <FriendsList>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="1승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="2승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="3승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="4승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="5승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="6승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="7승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
        <Friend imagePath="Profile.png">
          <MatchRecordInfo recordInfo="8승 패 등 대전 관련 정보"></MatchRecordInfo>
        </Friend>
      </FriendsList>
    </BackBoard>
  );
  // return <DivStyle>형태형 바보</DivStyle>;
}

export default MatchRecord;
