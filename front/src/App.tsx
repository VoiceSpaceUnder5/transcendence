import React from 'react';
import './App.css';
import styled from 'styled-components';
import BackBoard from './BackBoard';

const DivStyle = styled.div`
  font-size: 100px;
`;

function App() {
  return (
    <BackBoard>
      <button>hi</button>
      <div>hyeonkim</div>
      <a href="#">hello</a>
    </BackBoard>
  );
  // return <DivStyle>형태형 바보</DivStyle>;
}

export default App;
