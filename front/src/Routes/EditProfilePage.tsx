import React from 'react';
import {BackboardBoxInnerLayout} from '../Components/common/Body';
import EditProfile from '../Components/EditProfile/EditProfile';
import {BackboardBoxLayout} from '../Components/common/Body';

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
