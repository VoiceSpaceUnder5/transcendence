import React, {ReactNode} from 'react';
import styled from 'styled-components';

const BodyStyle = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  background-color: #f0f0f0;
`;

export const BackboardBoxLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  height: calc(100vh - 47px);
  overflow-y: auto;

  ${props => props.theme.padSize} {
    padding-top: 8px;
    flex-direction: column;
    height: 100%;
    justify-content: start;
  } ;
`;

export const BackboardBoxInnerLayout = styled.div`
  display: 'flex';
`;

interface BodyProps {
  children?: ReactNode;
}

function Body({children}: BodyProps): JSX.Element {
  return <BodyStyle>{children}</BodyStyle>;
}

export default Body;
