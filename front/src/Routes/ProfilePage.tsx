import React from 'react';
import {BackboardBoxInnerLayout} from '../Components/common/Body';
import Profile from '../Components/Profile/Profile';
import {BackboardBoxLayout} from '../Components/common/Body';

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
