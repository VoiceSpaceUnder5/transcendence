import React from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';
import {gql, useQuery} from '@apollo/client';
import Loader from 'react-loader-spinner';

const USERS_QUERY = gql`
  query {
    me {
      id
      name
      email
      profile_image
      description
    }
  }
`;

function ProfilePage(): JSX.Element {
  const {loading, data, error} = useQuery(USERS_QUERY);
  if (error) console.error(error);

  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            {loading && (
              <Loader
                type="TailSpin"
                color="#343a40"
                width={160}
                height={160}
              />
            )}
            {data && (
              <Profile
                id={data.me.id}
                name={data.me.name}
                email={data.me.email}
                imagePath={data.me.profile_image}
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
