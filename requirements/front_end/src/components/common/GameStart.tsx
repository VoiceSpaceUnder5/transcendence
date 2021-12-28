import React, {FormEvent, useState} from 'react';
import styled from 'styled-components';
import Button from './Button';
import {HiChevronDown, HiChevronUp} from 'react-icons/hi';

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

function GameStart(): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const onToggle = () => {
    setToggle(!toggle);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <GameStartStyles>
      <Button icon right bg="grey" onClick={onToggle}>
        {toggle ? <HiChevronUp /> : <HiChevronDown />}
      </Button>
      <form onSubmit={onSubmit}>
        <Button left large>
          <span style={{paddingLeft: '24px'}}>게임 시작</span>
        </Button>
        {toggle && (
          <GameOptions>
            <GameOption>
              <label htmlFor="game1">GAME 1</label>
              <input type="checkbox" id="game 1" name="game 1"></input>
            </GameOption>
            <GameOption>
              <label htmlFor="game2">GAME 2</label>
              <input type="checkbox" id="game 2" name="game 2"></input>
            </GameOption>
          </GameOptions>
        )}
      </form>
    </GameStartStyles>
  );
}

export default GameStart;
