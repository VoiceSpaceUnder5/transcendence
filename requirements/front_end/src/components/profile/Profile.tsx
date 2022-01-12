import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import TitleDiv from '../common/TitleDiv';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';
import Img from '../common/Img';

export interface ProfileProps {
  image: string;
  email: string;
  description: string;
}

export default function Profile({
  image,
  email,
  description,
}: ProfileProps): JSX.Element {
  const navigate = useNavigate();
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const [meName] = useState(localStorage.getItem('meName'));
  return (
    <BackBoard size="hug">
      <TitleDiv>프로필</TitleDiv>
      <WholeLayout>
        <InnerLayout>
          <Div>프로필 사진</Div>
          {/* <ProfileImgStyle src={image} /> */}
          <Img userId={meId} size="profile" />
        </InnerLayout>
        <InnerLayout>
          <Div>이름</Div>
          <Div bg="light" width="large" align="center">
            {meName}
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
          navigate('/profile/edit', {
            state: {id: meId, name: meName, email, image, description},
          })
        }
      >
        프로필 수정
      </Button>
    </BackBoard>
  );
}

export const WholeLayout = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;

  margin-bottom: 16px;

  ${props => props.theme.padSize} {
    flex-direction: column;
  }
`;

export const InnerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  width: 288px;

  margin: 0px 24px;
`;
