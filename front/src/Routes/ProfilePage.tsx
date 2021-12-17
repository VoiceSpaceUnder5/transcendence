import React from 'react';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/Profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';

function ProfilePage(): JSX.Element {
  const profileData = {
    imagePath: '',
    userId: 'hyeonkim',
    email: 'test@test.com',
    description: '빙빙 돌아가는 회전 목마처럼',
  };
  return (
    <>
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <Profile profileData={profileData} />
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
    </>
  );
}

export default ProfilePage;