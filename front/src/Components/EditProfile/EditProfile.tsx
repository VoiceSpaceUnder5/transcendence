import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import TitleDiv from '../common/TitleDiv';
import Input from '../common/Input';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import {useLocation, useNavigate} from 'react-router-dom';

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
  const location = useLocation();
  const [inputs, setInputs] = useState({
    userId: '',
    email: '',
    description: '',
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  useEffect(() => {
    const {userId, email, description} = location.state;
    setInputs({userId, email, description});
  }, []);
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
          <Input name="name" onChange={onChange} value={inputs.userId} />
          <Div>email</Div>
          <Input name="email" onChange={onChange} value={inputs.email} />
          <Div>자기소개</Div>
          <Textarea
            name="description"
            value={inputs.description}
            onChange={onChange}
          ></Textarea>
        </InnerLayout>
      </WholeLayout>
      <div
        style={{display: 'flex', width: '20%', justifyContent: 'space-evenly'}}
      >
        <Button onClick={() => navigate('/profile', {state: inputs})}>
          확인
        </Button>
        <Button onClick={() => navigate('/profile')}>취소</Button>
      </div>
    </BackBoard>
  );
}