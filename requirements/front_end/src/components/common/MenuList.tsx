import React, {ReactNode} from 'react';
import styled from 'styled-components';

const MenuListStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 440px;
  width: 89%;
`;

interface MenuListProps {
  children: ReactNode;
}

export function MenuList({children}: MenuListProps): JSX.Element {
  return <MenuListStyles>{children}</MenuListStyles>;
}

const MenuInfoListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

interface MenuInfoListProps {
  children?: React.ReactNode;
}

export function MenuInfoList({children}: MenuInfoListProps): JSX.Element {
  return <MenuInfoListStyle>{children}</MenuInfoListStyle>;
}

const MenuInfoStyle = styled.div`
  text-align: center;
  vertical-align: middle;
  margin: 2px 0px;
  padding: 2px 8px;
  height: 22px;
  font-size: 90%;
  white-space: nowrap;

  background: ${props => props.theme.greyDivBg};
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 10px;
`;

interface MenuInfoProps {
  children?: React.ReactNode;
}

export function MenuInfo({children}: MenuInfoProps): JSX.Element {
  return <MenuInfoStyle>{children}</MenuInfoStyle>;
}
