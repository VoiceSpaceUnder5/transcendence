import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import TitleDiv from '../common/TitleDiv';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';

const ProfileImgStyle = styled.img`
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

export interface ProfileProps {
  id: number;
  name: string;
  email: string;
  imagePath: string;
  description: string;
}

export default function Profile({
  id,
  name,
  email,
  imagePath,
  description,
}: ProfileProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <BackBoard size="hug">
      <TitleDiv>프로필</TitleDiv>
      <WholeLayout>
        <InnerLayout>
          <Div>프로필 사진</Div>
          <ProfileImgStyle src={imagePath}></ProfileImgStyle>
        </InnerLayout>
        <InnerLayout>
          <Div>이름</Div>
          <Div bg="light" width="large" align="center">
            {name}
          </Div>
          <Div>email</Div>
          <Div bg="light" width="large" align="center">
            {email}
          </Div>
          <Div>자기소개</Div>
          <Div bg="light" width="large" align="center" height="full">
            {description}
          </Div>
        </InnerLayout>
      </WholeLayout>
      <Button
        large
        onClick={() =>
          navigate('/profile/edit', {state: {id, name, email, description}})
        }
      >
        프로필 수정
      </Button>
    </BackBoard>
  );
}
