import React, {useState} from 'react';

import styled from 'styled-components';

import {useNavigate} from 'react-router-dom';

import {HiCube, HiMenu} from 'react-icons/hi';
import Button from './Button';
import GameStart from './GameStart';
import {logOut} from '../../modules/auth';

import LogOut from './LogOut';
import Img from './Img';
import {useDispatch} from 'react-redux';

// function Navbar(): JSX.Element {
//   const [meId] = useState(Number(localStorage.getItem('meId')));
//   const [meName] = useState(localStorage.getItem('meName'));
//   const [isToggle, setIsToggle] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const onToggle = () => setIsToggle(!isToggle);
//   const [isClick, setIsClick] = useState(false);

//   const onClick = () => setIsClick(!isClick);
//   return (
//     <NavbarBackground>
//       <Nav align="start">
//         <Button bg="dark" brand icon>
//           <HiCube />
//         </Button>
//         <NavCollapse isToggle={isToggle} align="start">
//           <Button bg="dark" onClick={() => navigate('/home')}>
//             Home
//           </Button>
//           <Button bg="dark" onClick={() => navigate('/profile')}>
//             Profile
//           </Button>
//         </NavCollapse>
//       </Nav>
//       <Nav align="end">
//         <NavToggle onClick={onToggle}>
//           <Button bg="dark" icon>
//             <HiMenu />
//           </Button>
//         </NavToggle>
//         <NavCollapse isToggle={isToggle} direction="reverse" align="end">
//           <Button bg="dark" onClick={onClick}>
//             <span style={{paddingRight: '8px'}}>{meName}</span>
//             <Img userId={meId} size="navbar" />
//           </Button>
//           {isClick && <LogOut />}
//         </NavCollapse>
//       </Nav>
//       <GameStart />
//     </NavbarBackground>
//   );
// }

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

interface NavbarProps {
  isStart?: boolean;
}
function Navbar({isStart}: NavbarProps): JSX.Element {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onToggle = () => setIsToggle(!isToggle);
  const [isHover, setIsHover] = useState(false);
  const onHover = () => setIsHover(!isHover);
  return (
    <NavbarBackground>
      <Nav align="start">
        <Button bg="dark" brand icon>
          <HiCube />
        </Button>
        <NavCollapse isToggle={isToggle} align="start">
          <Button bg="dark" onClick={() => navigate('/home')}>
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
        <NavCollapse isToggle={isToggle} direction="reverse" align="end">
          <Button
            bg="dark"
            onHover={onHover}
            onClick={() => {
              localStorage.removeItem('meId');
              localStorage.removeItem('meName');
              localStorage.clear();
              dispatch(logOut());
              navigate('/');
            }}
          >
            {!isHover ? '이름' : 'logout'}
          </Button>
          <Button bg="dark" onClick={() => navigate('/profile')}>
            사진(예정)
          </Button>
        </NavCollapse>
      </Nav>
      <GameStart isStart={isStart} />
    </NavbarBackground>
  );
}

export default React.memo(Navbar);
