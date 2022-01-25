import React from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {BackboardBoxInnerLayout} from '../components/common/Body';
import Profile from '../components/profile/Profile';
import {BackboardBoxLayout} from '../components/common/Body';
import {gql, useQuery} from '@apollo/client';
import Loader from 'react-loader-spinner';

const GET_DESC = gql`
  query getDesc {
    getMe {
      profile_image
      email
      description
    }
  }
`;

function ProfilePage(): JSX.Element {
  const {loading, data, error} = useQuery(GET_DESC, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });
  if (loading)
    return <Loader type="TailSpin" color="#343a40" width={160} height={160} />;
  if (error) console.error(error);
  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            <Profile
              image={data.getMe.profile_image}
              email={data.getMe.email}
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
