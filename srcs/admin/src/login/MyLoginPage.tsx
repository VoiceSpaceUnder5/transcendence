import * as React from 'react';
import {useLogin, useNotify, Notification, defaultTheme} from 'react-admin';
import {ThemeProvider} from '@material-ui/styles';
import {createTheme} from '@material-ui/core/styles';

const MyLoginPage = () => {
  const login = useLogin();
  const notify = useNotify();
  const submit = (e: any) => {
    e.preventDefault();
    // will call authProvider.login({ email, password })
    login({}).catch(() => notify('Invalid email or password'));
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
