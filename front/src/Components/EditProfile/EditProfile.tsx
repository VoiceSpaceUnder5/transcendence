import React, {useState} from 'react';
import styled from 'styled-components';
import TitleDiv from '../common/TitleDiv';
import Input from '../common/Input';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import {useNavigate} from 'react-router-dom';

const ProfileImgStyle = styled.div`
  width: 288px;
  height: 288px;
  border-radius: 25px;
  border: 1px solid #000000;
`;

const WholeLayout = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;

  margin-bottom: 16px;

  ${props => props.theme.padSize} {
    flex-direction: column;
  }
`;

const InnerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  width: 288px;

  margin: 0px 24px;
`;

export default function EditProfile(): JSX.Element {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '익명의 토끼',
    email: 'test@test.com',
    description: '자기 소개',
  });
  const {name, email, description} = inputs;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <BackBoard size="hug">
      <TitleDiv>프로필 편집</TitleDiv>
      <WholeLayout>
        <InnerLayout>
          <Div>프로필 사진</Div>
          <ProfileImgStyle></ProfileImgStyle>
        </InnerLayout>
        <InnerLayout>
          <Div>이름</Div>
          <Input name="name" onChange={onChange} value={name} />
          <Div>email</Div>
          <Input name="email" onChange={onChange} value={email} />
          <Div>자기소개</Div>
          <Textarea
            name="description"
            value={description}
            onChange={onChange}
          ></Textarea>
        </InnerLayout>
      </WholeLayout>
      <div
        style={{display: 'flex', width: '20%', justifyContent: 'space-evenly'}}
      >
        <Button onClick={() => navigate('/profile')}>확인</Button>
        <Button onClick={() => navigate('/profile')}>취소</Button>
      </div>
    </BackBoard>
  );
}
