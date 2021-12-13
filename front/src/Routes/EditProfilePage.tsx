import React from 'react';
import Navbar from '../Components/common/Navbar';
import Chat from '../Components/Chat/Chat';
import Body, {BackboardBoxInnerLayout} from '../Components/common/Body';
import EditProfile from '../Components/EditProfile/EditProfile';
import {BackboardBoxLayout} from '../Components/common/Body';

function EditProfilePage(): JSX.Element {
  return (
    <Body>
      <Navbar />
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <EditProfile></EditProfile>
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
      <Chat />
    </Body>
  );
}

export default EditProfilePage;
