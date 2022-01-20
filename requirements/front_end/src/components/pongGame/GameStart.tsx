import React, {FormEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import {HiChevronDown, HiChevronUp} from 'react-icons/hi';
import {useHistory} from 'react-router-dom';
import {GameData} from './GameData';
import {io} from 'socket.io-client';
import Text from '../common/Text';
import BackBoard from '../common/BackBoard';

function GameStart(): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const [isHard, setIsHard] = useState(false);
  const history = useHistory();
  const [isLadder, setIsLadder] = useState(false);
  const [join, setJoin] = useState(false);
  const [requestUserName, setRequestUserName] = useState('');

  // 게임 소켓은 스타트 버튼이 뜨면  바로 연결됩니다.
  useEffect(() => {
    // 멍청한 코드네...
    if (GameData.socket) {
      GameData.socket.disconnect();
    }
    console.log('몇번이나 불릴까??');
    console.log(GameData.socket);
    GameData.setSocket(io('http://api.ts.io:33000/game'));
    GameData.setIsHard(isHard);
    GameData.setIsLadder(isLadder);
    GameData.setId(Number(localStorage.getItem('meId')));
    // user 데이터 집어넣기.
    GameData.socket.emit('sendUserData', {userId: GameData.id});
    GameData.socket.on(
      'requestGame',
      ({
        roomId,
        opponentId,
        userName,
      }: {
        roomId: string;
        opponentId: number;
        userName: string;
      }) => {
        setJoin(true);
        setRequestUserName(userName);
        GameData.setRoomId(roomId);
        GameData.setOnGameUserId(opponentId);
      },
    );
    return () => {
      GameData.socket.off('requestGame');
    };
  }, []);

  const onToggle = () => {
    setToggle(!toggle);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const onClickStart = () => {
    GameData.setIsHard(isHard);
    GameData.setIsRandomMatch(true);
    history.push({pathname: '/game', state: {isStart: true}});
    GameData.setIsLadder(isLadder);
  };
  const onHardModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void e;
    setIsHard(!isHard);
  };
  const onLadderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void e;
    if (isHard) setIsHard(!isHard);
    setIsLadder(!isLadder);
  };
  const onWithMeClick = () => {
    GameData.setIsHard(false);
    GameData.setIsRandomMatch(false);
    GameData.setIsLadder(false);
    history.push('/game');
  };
  const onCancelClick = () => {
    history.push('/home');
  };
  return (
    <>
      <GameStartStyles>
        <>
          <Button icon right bg="grey" onClick={onToggle}>
            {toggle ? <HiChevronUp /> : <HiChevronDown />}
          </Button>
          <form onSubmit={onSubmit}>
            <Button left large onClick={onClickStart}>
              <span style={{paddingLeft: '24px'}}>게임 시작</span>
            </Button>
            {toggle && (
              <GameOptions>
                Game Mode
                <GameOption>
                  <label htmlFor="game2">Hard</label>
                  <input
                    disabled={isLadder}
                    type="checkbox"
                    id="hard"
                    name="hard"
                    checked={isHard}
                    onChange={onHardModeChange}
                  ></input>
                </GameOption>
                <GameOption>
                  <label htmlFor="game2">LadderGame</label>
                  <input
                    type="checkbox"
                    id="ladder"
                    name="ladder"
                    checked={isLadder}
                    onChange={onLadderChange}
                  ></input>
                </GameOption>
              </GameOptions>
            )}
          </form>
        </>
      </GameStartStyles>
      <RequestPopUp>
        <BackBoard hidden={!join} size={'medium'}>
          <Text>{requestUserName}가 대전을 신청하였습니다</Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Button onClick={onWithMeClick}>수락</Button>
            <Button onClick={onCancelClick}>거절</Button>
          </div>
        </BackBoard>
      </RequestPopUp>
    </>
  );
}

export default GameStart;
const GameStartStyles = styled.div`
  /* Auto Layout */

  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  top: 8px;
  height: 20px;
  left: calc(50% - 12px - 85px);
`;

const GameOptions = styled.div`
  /* Auto Layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  left: calc(50% - 97px);

  /* size */
  width: 194px;
  background-color: ${props => props.theme.lightButtonBg};
  border-radius: 4px;
`;

const GameOption = styled.div`
  /* Auto Layout */

  display: flex;
  align-self: stretch;
  justify-content: flex-end;
`;

const RequestPopUp = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;
