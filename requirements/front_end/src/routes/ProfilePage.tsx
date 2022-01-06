import React, {useEffect} from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';
import {gql, useQuery} from '@apollo/client';
import Loader from 'react-loader-spinner';

const USERS_QUERY = gql`
  query getMe {
    getMe {
      id
      name
      email
      description
      profile_image
    }
  }
`;

function ProfilePage(): JSX.Element {
  const {loading, data, error} = useQuery(USERS_QUERY);
  if (loading)
    return <Loader type="TailSpin" color="#343a40" width={160} height={160} />;
  if (error) console.error(error);
  console.log(data);
  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            <Profile
              id={data.getMe.id}
              name={data.getMe.name}
              email={data.getMe.email}
              image={data.getMe.profile_image}
              description={data.getMe.description}
            />
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
        <Chat />
      </Body>
    </>
  );
}

export default ProfilePage;
