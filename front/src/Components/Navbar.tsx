import React from 'react';

import styled from 'styled-components';

import {Link} from 'react-router-dom';

import {HiCube, HiUserCircle, HiMenu} from 'react-icons/hi';
import Button from './Button';
import {useState} from 'react';

const NavbarBackground = styled.div`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  align-self
  
  /* Position */
  position: absolute;
  top: 0px;
  left: 0px;

  /* Color */
  background: #343a40;

  @media screen and (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Nav = styled.div<{align?: string}>`
  /* Layout */
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-${props => props.align};
  }
`;

const NavCollapse = styled.div<{isToggle?: boolean}>`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    ${props => {
      return props.isToggle ? `display: flex;` : `display: none;`;
    }}
  }
`;

const NavToggle = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

function Navbar(): JSX.Element {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const onToggle = () => {
    console.log(isToggle);
    setIsToggle(!isToggle);
  };
  return (
    <>
      <NavbarBackground>
        <Nav align="start">
          <Button bg="dark" brand icon>
            <HiCube />
          </Button>
          <NavCollapse isToggle={isToggle}>
            <Link to="/">
              <Button bg="dark">Home</Button>
            </Link>
            <Link to="/profile">
              <Button bg="dark">Profile</Button>
            </Link>
            <Link to="/friends">
              <Button bg="dark">Friends</Button>
            </Link>
          </NavCollapse>
        </Nav>
        <Nav align="end">
          <NavToggle onClick={onToggle}>
            <Button bg="dark" icon>
              <HiMenu />
            </Button>
          </NavToggle>
          <NavCollapse isToggle={isToggle}>
            <Button bg="dark" icon>
              <HiUserCircle />
            </Button>
            <Button bg="dark">Login</Button>
          </NavCollapse>
        </Nav>
      </NavbarBackground>
    </>
  );
}

export default React.memo(Navbar);
