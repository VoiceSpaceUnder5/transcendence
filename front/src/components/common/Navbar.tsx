import React, {useState} from 'react';

import styled from 'styled-components';

import {useNavigate} from 'react-router-dom';

import {HiCube, HiUserCircle, HiMenu} from 'react-icons/hi';
import Button from './Button';
import GameStart from './GameStart';
import Login from './Login';

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

const NavCollapse = styled.div<{isToggle?: boolean}>`
  display: flex;

  ${props => props.theme.mobileSize} {
    flex-direction: column;
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

function Navbar(): JSX.Element {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  const onToggle = () => setIsToggle(!isToggle);
  return (
    <NavbarBackground>
      <Nav align="start">
        <Button bg="dark" brand icon>
          <HiCube />
        </Button>
        <NavCollapse isToggle={isToggle}>
          <Button bg="dark" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button bg="dark" onClick={() => navigate('/profile')}>
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
        <NavCollapse isToggle={isToggle}>
          <Button bg="dark" icon onClick={() => navigate('/profile')}>
            <HiUserCircle />
          </Button>
          <Login></Login>
        </NavCollapse>
      </Nav>
      <GameStart />
    </NavbarBackground>
  );
}

export default Navbar;
