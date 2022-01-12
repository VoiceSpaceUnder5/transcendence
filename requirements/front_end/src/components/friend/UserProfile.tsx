import React from 'react';
import styled from 'styled-components';
import {gql, useQuery} from '@apollo/client';
import Div from '../common/Div';
import TitleDiv from '../common/TitleDiv';
import {OptionButton} from '../common/Button';
import CreateRelation from '../chat/Relations/CreateRelation';
import UpdateRelation from '../chat/Relations/UpdateRelation';
import useRelation from '../../hooks/useRelation';

const GET_USER_BY_ID = gql`
  query getUserById($userId: Int!) {
    getUserById(id: $userId) {
      name
      email
      description
    }
  }
`;

interface UserProfileProps {
  typeId: string;
  userId: number;
  meId: number;
  onBackClick: () => void;
}

export default function UserProfile({
  // typeId,
  userId,
  meId,
  onBackClick,
}: UserProfileProps): JSX.Element {
  const typeId = useRelation(meId, userId);
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: userId,
    },
    fetchPolicy: 'no-cache',
  });
  if (loading) return <></>;
  if (error) return <>에러 ..</>;
  //   console.log(data.getUserById);
  return (
    <>
      {data && (
        <UserProfileStyles>
          <UserProfileBackboard>
            <TitleDiv color="black">친구 프로필</TitleDiv>
            <Div align="center">기본 정보</Div>
            <div>{data.getUserById.name}</div>
            <div style={{display: 'flex', width: '70%'}}>
              <Div align="center">대전 기록</Div>
              <Div align="center">업적</Div>
            </div>
            {/* 친구 상태에 따라 신청할지 차단할지? */}
            <OptionBoxLayout>
              <OptionBox>
                {typeId === 'RE1' && (
                  <UpdateRelation
                    userId={userId}
                    actionType="요청 취소"
                    actionTypeId="RE6"
                  />
                )}
                {typeId === 'RE0' && (
                  <UpdateRelation
                    userId={userId}
                    actionType="수락"
                    actionTypeId="RE2"
                  />
                )}
                {typeId === 'RE0' && (
                  <UpdateRelation
                    userId={userId}
                    actionType="거절"
                    actionTypeId="RE6"
                  />
                )}
                {typeId === 'RE6' && (
                  <UpdateRelation
                    userId={userId}
                    actionType="친구 신청"
                    actionTypeId="RE1"
                  />
                )}
                {typeId === undefined && <CreateRelation userId={userId} />}
                {typeId !== 'RE3' && (
                  <UpdateRelation
                    userId={userId}
                    actionType="차단"
                    actionTypeId="RE3"
                  />
                )}
                {typeId === 'RE3' && (
                  <UpdateRelation
                    userId={userId}
                    actionType="차단 해제"
                    actionTypeId="RE6"
                  />
                )}
              </OptionBox>
              <OptionBox>
                {/* 대화방 없으면 만들고 입장 & 있으면 거기에 입장 */}
                {/* 차단 중이면 대화하기, 게임하기 비활성화 */}
                <>
                  <OptionButton
                    disabled={typeId === ('RE3' || 'RE4' || 'RE5') && true}
                  >
                    대화하기
                  </OptionButton>
                  <OptionButton
                    disabled={typeId === ('RE3' || 'RE4' || 'RE5') && true}
                  >
                    게임하기
                  </OptionButton>
                </>
                <OptionButton onClick={onBackClick}>닫기</OptionButton>
              </OptionBox>
            </OptionBoxLayout>
          </UserProfileBackboard>
        </UserProfileStyles>
      )}
    </>
  );
}

const UserProfileStyles = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserProfileBackboard = styled.div`
  width: 50%;
  min-width: 320px;
  height: 70%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.9);

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(2%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  & {
    animation: smoothAppear 0.5s ease-in-out;
  }
`;

const OptionBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const OptionBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;

  justify-content: center;
`;
