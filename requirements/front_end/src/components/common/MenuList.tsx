import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components';

const MenuListStyles = styled.div<{height?: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 440px;
  width: 89%;
  ${props =>
    props.height === 'fit' &&
    css`
      height: 123px;
      width: 100%;
      overflow-x: hidden;
    `}
  overflow-y: auto;
`;

interface MenuListProps {
  children: ReactNode;
  height?: string;
}

export function MenuList({children, height}: MenuListProps): JSX.Element {
  return <MenuListStyles height={height}>{children}</MenuListStyles>;
}

const MenuInfoListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: inherit;
  margin-left: 8px;
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
  width: inherit;

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
