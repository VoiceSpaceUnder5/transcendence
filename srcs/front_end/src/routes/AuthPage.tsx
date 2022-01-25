import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {gql, useLazyQuery, useMutation} from '@apollo/client';

const GET_ME = gql`
  query {
    getMe {
      id
      name
    }
  }
`;

const CREATE_ACHIEVEMENT = gql`
  mutation createAchievement($input: CreateAchievementInput!) {
    createAchievement(createAchievementInput: $input) {
      typeId
    }
  }
`;

export default function AuthPage(): JSX.Element {
  const [getMe, {loading, error}] = useLazyQuery(GET_ME);
  const [createAchievement] = useMutation(CREATE_ACHIEVEMENT);
  const history = useHistory();

  useEffect(() => {
    getMe().then(data => {
      const user = data.data.getMe;
      localStorage.setItem('meId', user.id);
      localStorage.setItem('meName', user.name);
      createAchievement({
        variables: {
          input: {
            userId: user.id,
            typeId: 'AT0',
          },
        },
      })
        .then(() => {
          alert(
            '첫 로그인을 축하합니다. 프로필 페이지에서 프로필을 수정해보세요',
          );
          history.push('/home');
        })
        .catch(() => {
          history.push('/home');
        });
    });
  }, []);
  if (loading) return <>로그인 중</>;
  if (error) return <>로그인 실패</>;
  return <>로그인 성공</>;
}
