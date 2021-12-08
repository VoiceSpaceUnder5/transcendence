import React from 'react';
import Navbar from '../Components/common/Navbar';
import Chat from '../Components/Chat/Chat';
import Main from '../Components/common/Body';

function Profile(): JSX.Element {
  return (
    <Main>
      <Navbar />
      <Chat />
    </Main>
  );
}

export default Profile;
