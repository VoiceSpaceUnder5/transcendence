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
import {MenuList} from '../common/MenuList';
import Friend from './Friend';
import DirectMessages from './DirectMessage';
import {GameData} from '../pongGame/GameData';
import {useHistory} from 'react-router-dom';

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
  const history = useHistory();
  if (loading) return <></>;
  if (error) return <>에러 ..</>;
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
      {data && (
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
                <UserProfileDiv>{data.getUserById.name}</UserProfileDiv>
                <Div>email</Div>
                <UserProfileDiv>test@test.com</UserProfileDiv>
                {/* <UserProfileDiv>{data.getUserById.email}</UserProfileDiv> */}
                <Div>자기소개</Div>
                <UserProfileDiv style={{height: '140px'}}>
                  {data.getUserById.description}
                </UserProfileDiv>
              </InnerLayout>
            </WholeLayout>
            <WholeLayout>
              <InnerLayout>
                <Div>대전 기록</Div>
                <MenuList height="fit">
                  <Friend
                    imagePath="#"
                    username="hi"
                    matchRecord="패"
                    connectionStatus="CS0"
                  />
                  <Friend
                    imagePath="#"
                    username="hi"
                    matchRecord="패"
                    connectionStatus="CS0"
                  />
                  <Friend
                    imagePath="#"
                    username="hi"
                    matchRecord="패"
                    connectionStatus="CS1"
                  />
                </MenuList>
              </InnerLayout>
              <InnerLayout>
                <Div>업적</Div>
                <UserAchivementList>
                  <UserAchivementDiv isSuccess={true}>
                    첫 접속
                  </UserAchivementDiv>
                  <UserAchivementDiv isSuccess={false}>첫 승</UserAchivementDiv>
                  <UserAchivementDiv isSuccess={false}>5승</UserAchivementDiv>
                </UserAchivementList>
              </InnerLayout>
            </WholeLayout>
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
                  <DirectMessages
                    changeVisible={onBackClick}
                    meId={meId}
                    userId={userId}
                  />
                  <OptionButton
                    onClick={onGameStartButtonClick}
                    disabled={typeId === ('RE3' || 'RE4' || 'RE5') && true}
                    hidden={data.getUserById.connectionStatusId !== 'CS1'}
                  >
                    게임하기
                  </OptionButton>
                  <OptionButton
                    onClick={onGameSpectateButtonClick}
                    disabled={typeId === ('RE3' || 'RE4' || 'RE5') && true}
                    hidden={!(data.getUserById.connectionStatusId === 'CS2')}
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
    overflow-y: auto;
  }
`;

const UserProfileBackboard = styled.div`
  width: 50%;
  min-width: 320px;
  // height: 70%;

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

const OptionBox = styled.div`
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

const UserAchivementList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  overflow-x: auto;
`;

const UserAchivementDiv = styled.div<{isSuccess: boolean}>`
  position: static;
  width: 103px;
  height: 103px;
  display: flex;
  justify-content: center;
  align-items: center;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 10px 14px;
  margin-left: 0px;
  background: ${props => (props.isSuccess ? '#FFEF98' : '#89969F')};
  border-radius: 10px;
`;
