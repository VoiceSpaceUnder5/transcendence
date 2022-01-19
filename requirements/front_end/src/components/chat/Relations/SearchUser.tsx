import React, {useCallback, useEffect, useState} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import Friend from '../../friend/Friend';

const GET_USER_BY_NAME = gql`
  query getUserByName($user_name: String!) {
    getUsersByName(user_name: $user_name) {
      id
      name
      description
      profile_image
      connectionStatusId
    }
  }
`;

interface SearchUserProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface UserData {
  id: number;
  name: string;
  profile_image: string;
  description?: string;
  connectionStatusId: string;
}

export default function SearchUser({
  name,
  onChange,
}: SearchUserProps): JSX.Element {
  const [user, setUser] = useState<UserData>();
  const [visible, setVisible] = useState(false);
  const [getUserByName] = useLazyQuery(GET_USER_BY_NAME, {
    variables: {
      user_name: name,
    },
  });
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    getUserByName()
      .then(data => {
        const userData = data.data.getUsersByName[0];
        setUser(userData);
        setVisible(true);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    if (!name) {
      setVisible(false);
    }
  }, [name]);
  return (
    <>
      <form onSubmit={onSubmit} style={{marginBottom: '8px'}}>
        <input
          required
          name="name"
          value={name}
          onChange={onChange}
          autoComplete="off"
        />
        <button type="submit">검색</button>
      </form>
      {user && visible && (
        <Friend
          userId={user.id}
          username={user.name}
          description={user.description}
          connectionStatus={user.connectionStatusId}
        ></Friend>
      )}
    </>
  );
}
