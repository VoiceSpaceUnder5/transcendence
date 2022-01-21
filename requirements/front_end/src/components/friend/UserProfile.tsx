import React from 'react';
import styled from 'styled-components';
import {gql, useQuery} from '@apollo/client';
import Div from '../common/Div';
import TitleDiv from '../common/TitleDiv';
import {OptionButton} from '../common/Button';
import CreateRelation from '../chat/Relations/CreateRelation';
import UpdateRelation from '../chat/Relations/UpdateRelation';
import useRelation from '../../hooks/useRelation';
import Img from '../common/Img';
import DirectMessages from './DirectMessage';
import {GameData} from '../pongGame/GameData';
import {useHistory} from 'react-router-dom';
import MatchRecords from '../matchRecord/MatchRecords';
import useRecord from '../../hooks/useRecord';
import AchievementList from '../achievement/AchievementList';

const GET_USER_BY_ID = gql`
  query getUserById($userId: Int!) {
    getUserById(id: $userId) {
      name
      email
      description
      connectionStatusId
    }
  }
`;

interface UserProfileProps {
  typeId?: string;
  userId: number;
  meId: number;
  onBackClick: () => void;
}

export default function UserProfile({
  userId,
  meId,
  onBackClick,
}: UserProfileProps): JSX.Element {
  const typeId = useRelation(meId, userId);
  const user = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: userId,
    },
    fetchPolicy: 'no-cache',
  });
  const records = useRecord(userId);
  const history = useHistory();
  if (user.loading || records.loading) return <></>;
  if (user.error || records.error) return <>에러 ..</>;
  const onGameStartButtonClick = () => {
    GameData.setIsHard(false);
    GameData.setOnGameUserId(userId);
    GameData.setIsRandomMatch(false);
    GameData.setIsLadder(false);
    history.push('/game');
  };
  const onGameSpectateButtonClick = () => {
    history.push('/spectating');
  };
  return (
    <>
      {user.data && (
        <UserProfileStyles>
          <UserProfileBackboard>
            <TitleDiv color="black">친구 프로필</TitleDiv>
            <WholeLayout>
              <InnerLayout>
                <Div>프로필 사진</Div>
                <Img userId={userId} size="userProfile" />
              </InnerLayout>
              <InnerLayout>
                <Div>이름</Div>
                <UserProfileDiv>{user.data.getUserById.name}</UserProfileDiv>
                <Div>email</Div>
                <UserProfileDiv>{user.data.getUserById.email}</UserProfileDiv>
                <Div>자기소개</Div>
                <UserProfileDiv style={{height: '140px'}}>
                  {user.data.getUserById.description}
                </UserProfileDiv>
              </InnerLayout>
            </WholeLayout>
            <WholeLayout>
              <InnerLayout>
                <Div>대전 기록</Div>
                <MatchRecords records={records.records} height="fit" />
              </InnerLayout>
              <InnerLayout>
                <Div>업적</Div>
                <AchievementList userId={userId} />
              </InnerLayout>
            </WholeLayout>
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
                {typeId === undefined && (
                  <CreateRelation userId={userId} typeId="RE0" />
                )}
                {typeId !== 'RE3' && typeId !== undefined && (
                  <UpdateRelation
                    userId={userId}
                    actionType="차단"
                    actionTypeId="RE3"
                  />
                )}
                {typeId === undefined && (
                  <CreateRelation userId={userId} typeId="RE3" />
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
                <>
                  <DirectMessages
                    changeVisible={onBackClick}
                    meId={meId}
                    userId={userId}
                  />
                  <OptionButton
                    onClick={onGameStartButtonClick}
                    disabled={typeId === ('RE3' || 'RE4' || 'RE5') && true}
                    hidden={user.data.getUserById.connectionStatusId !== 'CS1'}
                  >
                    게임하기
                  </OptionButton>
                  <OptionButton
                    onClick={onGameSpectateButtonClick}
                    disabled={typeId === ('RE3' || 'RE4' || 'RE5') && true}
                    hidden={
                      !(user.data.getUserById.connectionStatusId === 'CS2')
                    }
                  >
                    관전하기
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

  ${props => props.theme.padSize} {
    top: 48px;
    padding-top: 8px;
    flex-direction: column;
    height: 100%;
    justify-content: start;
  }
`;

const UserProfileBackboard = styled.div`
  min-width: 320px;
  height: 90%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 16px;
  background-color: rgba(225, 225, 225, 0.9);

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

export const OptionBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;

  justify-content: center;
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
  align-items: center;
  flex-direction: column;

  width: 240px;

  margin: 0px 24px;
`;

const UserProfileDiv = styled.div`
  width: 100%;
  background-color: white;

  border-radius: 6px;
  padding: 2px;
`;
