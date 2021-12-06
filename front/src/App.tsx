import React from 'react';
import './App.css';
import styled from 'styled-components';
import BackBoard from './BackBoard';
import ListWithLine from './ListWithLine';
import UserVSInfo from './UserVSInfo';

const TitleText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
`;

function App() {
  return (
    <div style={{height: '100vh'}}>
      <BackBoard
        height="80%"
        borderRadius="50px"
        color="rgba(196, 196, 196, 0.8)"
      >
        <TitleText>대전 기록</TitleText>
        <ListWithLine line={1}>
          <UserVSInfo imagePath="Profile.png"></UserVSInfo>
          <UserVSInfo imagePath="Profile.png"></UserVSInfo>
          <UserVSInfo imagePath="Profile.png"></UserVSInfo>
          <UserVSInfo imagePath="Profile.png"></UserVSInfo>
          <UserVSInfo imagePath="Profile.png"></UserVSInfo>
          <UserVSInfo imagePath="Profile.png"></UserVSInfo>
        </ListWithLine>
      </BackBoard>
    </div>
  );
  // return <DivStyle>형태형 바보</DivStyle>;
}

export default App;
