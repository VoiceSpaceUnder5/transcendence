import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Cookies} from 'react-cookie';

export default function ReceiveAccessCode(): JSX.Element {
  const [loginState, setLoginState] = useState('로그인 중');

  useEffect(() => {
    const get42Token = async (code: string) => {
      // back으로 인가코드 보내기.
      try {
        const response = await axios.post(
          'http://192.168.219.100:30000/login/code',
          {
            code: code,
          },
        );
        console.log(response.data);
        const cookies = new Cookies();
        // cookie setting
        cookies.set('42accessToken', response.data, {
          path: '/',
        });
        setLoginState('로그인 성공 :)');
        console.log(window);
        window.close();
      } catch (e) {
        setLoginState('로그인 실패 :(');
        window.close();
      }
    };

    const code = location.search.split('=')[1];
    get42Token(code);
  }, [location]);

  return <>{loginState}</>;
}
