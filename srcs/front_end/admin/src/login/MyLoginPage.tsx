import * as React from 'react';
import {useLogin, useNotify, Notification, defaultTheme} from 'react-admin';
import {ThemeProvider} from '@material-ui/styles';
import {createTheme} from '@material-ui/core/styles';

const MyLoginPage = () => {
  const login = useLogin();
  const notify = useNotify();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // will call authProvider.login({ email, password })
    login({}).catch(() =>
      notify(
        '사이트에 로그인 후 다시 시도해보세요! 토큰이 없거나, 관리자가 아닙니다.',
      ),
    );
  };

  return (
    <ThemeProvider theme={createTheme(defaultTheme)}>
      <form onSubmit={submit}>
        <button type="submit">Login</button>
      </form>
      <Notification />
    </ThemeProvider>
  );
};

export default MyLoginPage;
