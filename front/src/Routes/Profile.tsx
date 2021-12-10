import React, {useState} from 'react';
import styled from 'styled-components';
import Navbar from '../Components/common/Navbar';
import Chat from '../Components/Chat/Chat';
import Body from '../Components/common/Body';
import TitleDiv from '../Components/common/TitleDiv';
import BackBoard from '../Components/common/BackBoard';
import Button from '../Components/common/Button';
import Text from '../Components/common/Text';
import FormPrac from '../Components/common/FormPrac';
import {
  PageContentStyle,
  PageContentInnerStyle,
} from '../Components/common/Body';

const ProfileImgStyle = styled.img`
  width: '288px';
  height: '288px';
  border-radius: '25px';
  border: '1px solid #000000';
`;

function Profile(): JSX.Element {
  const [Input, setInput] = useState('hello');

  const onChange = (value: string) => {
    setInput(value);
    return;
  };
  return (
    <Body>
      <Navbar />
      <PageContentStyle>
        <BackBoard>
          <TitleDiv>프로필</TitleDiv>
          <PageContentStyle>
            <PageContentInnerStyle>
              <ProfileImgStyle src="faceImgEx.png" />
            </PageContentInnerStyle>
            <PageContentInnerStyle>
              <FormPrac formSubmit={onChange}></FormPrac>
              <Text>안녕하세요</Text>
            </PageContentInnerStyle>
          </PageContentStyle>
          <Button large>프로필 수정</Button>
          <TitleDiv>{Input}</TitleDiv>
        </BackBoard>
      </PageContentStyle>
      <Chat />
    </Body>
  );
}

export default Profile;
