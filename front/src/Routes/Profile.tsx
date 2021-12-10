import React, {useState} from 'react';
import Navbar from '../Components/common/Navbar';
import Chat from '../Components/Chat/Chat';
import Body from '../Components/common/Body';
import TitleDiv from '../Components/common/TitleDiv';
import BackBoard from '../Components/common/BackBoard';
import Button from '../Components/common/Button';
import MyForm from '../Components/common/Form';
import FormPrac from '../Components/common/FormPrac';
import {
  PageContentStyle,
  PageContentInnerStyle,
} from '../Components/common/Body';

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
              <img src="Profile.png" />
            </PageContentInnerStyle>
            <PageContentInnerStyle>
              <div>이런 시댕</div>
              <FormPrac formSubmit={onChange}></FormPrac>
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
