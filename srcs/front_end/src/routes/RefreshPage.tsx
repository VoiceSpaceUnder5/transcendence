import React from 'react';

function getAccessToken() {
  // accessToken가 만료되었을 때에 refreshToken을 cookie에서 가지고 보내주자.
  // axios.get('http://192.168.219.105:30000/auth/fortytwo');
}

export default function RefreshPage(): JSX.Element {
  getAccessToken();
  return <></>;
}
