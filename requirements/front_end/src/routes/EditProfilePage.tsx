import React from 'react';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import Body from '../components/common/Body';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import EditProfile from '../components/editProfile/EditProfile';
import {BackboardBoxLayout} from '../components/common/Body';

function EditProfilePage(): JSX.Element {
  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            <EditProfile></EditProfile>
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
        <Chat />
      </Body>
    </>
  );
}

export default EditProfilePage;
