import React from 'react';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/Profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';

function ProfilePage(): JSX.Element {
  return (
    <>
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <Profile></Profile>
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
    </>
  );
}

export default ProfilePage;
