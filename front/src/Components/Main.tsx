import React, {ReactNode} from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: #f0f0f0;
  height: 100vh;
`;

interface MainProps {
  children?: ReactNode;
}

function Main({children}: MainProps): JSX.Element {
  return <StyledDiv>{children}</StyledDiv>;
}

export default Main;
