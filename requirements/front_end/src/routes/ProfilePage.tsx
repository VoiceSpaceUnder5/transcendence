import React from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';

function ProfilePage(): JSX.Element {
  const profileData = {
    imagePath: './testImage.png',
    userId: 'hyeonkim',
    email: 'test@test.com',
    description: '빙빙 돌아가는 회전 목마처럼',
  };
  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            <Profile profileData={profileData} />
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
        <Chat />
      </Body>
    </>
  );
}

export default ProfilePage;
