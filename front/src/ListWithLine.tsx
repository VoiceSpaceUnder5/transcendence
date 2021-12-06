import {interfaceExtends} from '@babel/types';
import React, {ReactNode} from 'react';
import styled from 'styled-components';

const ListWithLineStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: between-items;
  align-items: center;

  flex: none;
  min-width: 400px;
  max-height: 80%;
  width: 80%;
  order: 1;
  flex-grow: 0;
  margin: 24px 0px;
  background-color: 'black';
  overflow: scroll;
`;

interface ListWithLineProps {
  children: ReactNode;
  line: number;
}

export default function ListWithLine({children, line}: ListWithLineProps) {
  return <ListWithLineStyle>{children}</ListWithLineStyle>;
}
