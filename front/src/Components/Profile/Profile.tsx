import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import TitleDiv from '../common/TitleDiv';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';

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

export default function Profile(): JSX.Element {
  const navigate = useNavigate();
  return (
    <BackBoard size="hug">
      <TitleDiv>프로필</TitleDiv>
      <WholeLayout>
        <InnerLayout>
          <Div>프로필 사진</Div>
          <ProfileImgStyle></ProfileImgStyle>
        </InnerLayout>
        <InnerLayout>
          <Div>이름</Div>
          <Div bg="light" width="large" align="center">
            익명의 토끼
          </Div>
          <Div>email</Div>
          <Div bg="light" width="large" align="center">
            test@test.com
          </Div>
          <Div>자기소개</Div>
          <Div bg="light" width="large" align="center" height="full">
            자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기
            소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개
            자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기
            소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개
            자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기
            소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개
            자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기
            소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개
            자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기
            소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개
            자기 소개 자기 소개 자기 소개 자기 소개 자기 소개 자기 소개
          </Div>
        </InnerLayout>
      </WholeLayout>
      <Button large onClick={() => navigate('/profile/edit')}>
        프로필 수정
      </Button>
    </BackBoard>
  );
}
