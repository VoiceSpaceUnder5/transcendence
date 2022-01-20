import React, {useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {HiCube, HiMenu} from 'react-icons/hi';
import Button from './Button';
import GameStart from '../pongGame/GameStart';
import LogOut from './LogOut';
import Img from './Img';

function Navbar(): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const [meName] = useState(localStorage.getItem('meName'));
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const history = useHistory();
  const onToggle = () => setIsToggle(!isToggle);
  const [isClick, setIsClick] = useState(false);
  const onClick = () => setIsClick(!isClick);
  return (
    <NavbarBackground>
      <Nav align="start">
        <Button bg="dark" brand icon>
          <HiCube />
        </Button>
        <NavCollapse isToggle={isToggle} align="start">
          <Button bg="dark" onClick={() => history.push('/home')}>
            Home
          </Button>
          <Button bg="dark" onClick={() => history.push('/profile')}>
            Profile
          </Button>
        </NavCollapse>
      </Nav>
      <Nav align="end">
        <NavToggle onClick={onToggle}>
          <Button bg="dark" icon>
            <HiMenu />
          </Button>
        </NavToggle>
        <NavCollapse isToggle={isToggle} direction="reverse" align="end">
          <Button bg="dark" onClick={onClick}>
            <span style={{paddingRight: '8px'}}>{meName}</span>
            <Img userId={meId} size="navbar" />
          </Button>
          {isClick && <LogOut />}
        </NavCollapse>
      </Nav>
      <GameStart />
    </NavbarBackground>
  );
}

export default React.memo(Navbar);
const NavbarBackground = styled.div`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;

  /* Position */
  top: 0px;
  left: 0px;

  /* Color */
  background: #343a40;

  ${props => props.theme.mobileSize} {
    align-items: flex-start;
  }
`;

const Nav = styled.div<{align?: string}>`
  /* Layout */
  display: flex;

  ${props => props.theme.mobileSize} {
    flex-direction: column;
    align-items: flex-${props => props.align};
  }
`;

const NavCollapse = styled.div<{
  isToggle?: boolean;
  direction?: string;
  align?: string;
}>`
  display: flex;

  ${props => props.theme.mobileSize} {
    ${props => {
      return props.direction
        ? `flex-direction: column-reverse;`
        : `flex-direction: column;`;
    }}
    ${props => {
      return props.align === 'start'
        ? `align-items : flex-start;`
        : `align-items : flex-end;`;
    }};
    ${props => {
      return props.isToggle ? `display: flex;` : `display: none;`;
    }}
  }
`;

const NavToggle = styled.div`
  display: none;

  ${props => props.theme.mobileSize} {
    display: block;
  }
`;
