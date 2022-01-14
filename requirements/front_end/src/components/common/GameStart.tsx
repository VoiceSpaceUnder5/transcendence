import React, {FormEvent, useState} from 'react';
import styled from 'styled-components';
import Button from './Button';
import {HiChevronDown, HiChevronUp} from 'react-icons/hi';
import {useHistory} from 'react-router-dom';
import {GameData} from '../pongGame/GameData';

interface GameStartProps {
  isStart?: boolean;
}

function GameStart({isStart}: GameStartProps): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const [isHard, setIsHard] = useState(false);
  const history = useHistory();
  const [isLadder, setIsLadder] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const onClickStart = () => {
    GameData.setIsHard(isHard);
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
  return (
    <GameStartStyles>
      {!isStart ? (
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
      ) : (
        <button>취소</button>
      )}
    </GameStartStyles>
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
