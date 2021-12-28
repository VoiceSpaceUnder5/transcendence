import React from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';
import {gql, useQuery} from '@apollo/client';

const USERS_QUERY = gql`
  query {
    me {
      name
      id
      email
      description
    }
  }
`;

// interface User {
//   name: string;
//   id: number;
//   email: string;
//   profile_image: string;
//   description: string;
// }

function ProfilePage(): JSX.Element {
  const {loading, data, error} = useQuery(USERS_QUERY);
  if (error) console.error(error);

  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            {loading && <h1>loading...</h1>}
            {data && (
              <Profile
                id={data.me.id}
                name={data.me.name}
                email={data.me.email}
                description={data.me.description}
              />
            )}
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
        <Chat />
      </Body>
    </>
  );
}

export default ProfilePage;
