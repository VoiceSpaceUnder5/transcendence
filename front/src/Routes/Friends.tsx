import React from 'react';
import Navbar from '../Components/Navbar';
import Chat from '../Components/Chat';
import Main from '../Components/Body';

function Friends(): JSX.Element {
  return (
    <Main>
      <Navbar />
      <Chat />
    </Main>
  );
}

export default Friends;
