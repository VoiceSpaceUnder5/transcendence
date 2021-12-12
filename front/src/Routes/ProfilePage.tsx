import React from 'react';
import Navbar from '../Components/common/Navbar';
import Chat from '../Components/Chat/Chat';
import Body, {BackboardBoxInnerLayout} from '../Components/common/Body';
import Profile from '../Components/Profile/Profile';
import {BackboardBoxLayout} from '../Components/common/Body';

function ProfilePage(): JSX.Element {
  return (
    <Body>
      <Navbar />
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <Profile></Profile>
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
      <Chat />
    </Body>
  );
}

export default ProfilePage;
