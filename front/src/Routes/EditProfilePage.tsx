import React from 'react';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import EditProfile from '../components/EditProfile/EditProfile';
import {BackboardBoxLayout} from '../components/common/Body';

function EditProfilePage(): JSX.Element {
  return (
    <>
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <EditProfile></EditProfile>
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
    </>
  );
}

export default EditProfilePage;
