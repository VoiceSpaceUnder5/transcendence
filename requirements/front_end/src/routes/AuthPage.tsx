import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {gql, useLazyQuery} from '@apollo/client';
import {io} from 'socket.io-client';

const GET_ME = gql`
  query {
    getMe {
      id
      name
    }
  }
`;

export default function AuthPage(): JSX.Element {
  const [getMe, {loading, error}] = useLazyQuery(GET_ME);
  const history = useHistory();

  useEffect(() => {
    getMe().then(data => {
      const user = data.data.getMe;
      const socket = io('http://api.ts.io:30000');
      localStorage.setItem('meId', user.id);
      localStorage.setItem('meName', user.name);
      history.push('/home');
    });
  }, []);
  if (loading) return <>로그인 중</>;
  if (error) return <>로그인 실패</>;
  return <>로그인 성공</>;
}
