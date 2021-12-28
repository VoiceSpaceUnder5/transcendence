import React from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';
import {gql, useQuery} from '@apollo/client';

const USERS_QUERY = gql`
  query me {
    name
    id
    email
    profile_image
    description
  }
`;

interface User {
  name: string;
  id: number;
  email: string;
  profile_image: string;
  description: string;
}

function ProfilePage(): JSX.Element {
  // state는 어떻게 받지... 404, 500 이런거
  const {loading, data, error} = useQuery<User>(USERS_QUERY);
  if (error) console.error(error);

  const profileData = {
    imagePath: data?.profile_image,
    userId: data?.id,
    email: data?.email,
    description: data?.description,
  };
  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            {loading ? (
              <h1>loading...</h1>
            ) : (
              <Profile profileData={profileData} />
            )}
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
        <Chat />
      </Body>
    </>
  );
}

export default ProfilePage;
