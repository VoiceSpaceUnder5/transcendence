import React from 'react';
import Navbar from '../Components/Navbar';
import Chat from '../Components/Chat';
import Main from '../Components/Main';

function Profile(): JSX.Element {
  return (
    <Main>
      <Navbar />
      <Chat />
    </Main>
  );
}

export default Profile;
