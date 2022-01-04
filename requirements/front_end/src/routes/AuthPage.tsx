import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {gql, useLazyQuery} from '@apollo/client';

const GET_ME = gql`
  query {
    getMe {
      id
    }
  }
`;

export default function AuthPage(): JSX.Element {
  const [getMe, {loading, error}] = useLazyQuery(GET_ME);
  const navigate = useNavigate();

  useEffect(() => {
    getMe().then(data => {
      const userId = data.data.getMe.id;
      localStorage.setItem('userId', userId);
      navigate('/home');
    });
  }, []);
  if (loading) return <>로그인 중</>;
  if (error) return <>로그인 실패</>;
  return <>로그인 성공</>;
}
