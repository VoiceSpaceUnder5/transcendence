import React, {ReactNode} from 'react';
import styled from 'styled-components';

const BodyStyle = styled.div`
  background-color: #f0f0f0;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const PageContentStyle = styled.div`
  display: flex;
  justify-content: center;
  align-self: stretch;
  align-items: center;
  height: calc(100vh - 47px);

  ${props => props.theme.padSize} {
    flex-direction: column;
  } ;
`;

export const PageContentInnerStyle = styled.div`
  display: 'flex',
  flex-direction: 'column';
`;

interface BodyProps {
  children?: ReactNode;
}

function Body({children}: BodyProps): JSX.Element {
  return <BodyStyle>{children}</BodyStyle>;
}

export default Body;
