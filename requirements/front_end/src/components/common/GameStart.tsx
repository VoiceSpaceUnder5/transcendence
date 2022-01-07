import React, {FormEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import Button from './Button';
import {HiChevronDown, HiChevronUp} from 'react-icons/hi';
import {RootState} from '../../modules';
import {useNavigate} from 'react-router-dom';

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

interface GameStartProps {
  isStart?: boolean;
}

function GameStart({isStart}: GameStartProps): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const [isHard, setIsHard] = useState(false);
  const navigate = useNavigate();
  const onToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const onClickStart = () => {
    navigate('/game', {state: {isStart: true}});
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHard(!isHard);
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
                    type="checkbox"
                    id="game 2"
                    name="game 2"
                    checked={isHard}
                    onChange={onChange}
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
