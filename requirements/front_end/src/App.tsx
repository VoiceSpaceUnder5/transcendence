import React from 'react';

import {ThemeProvider} from 'styled-components';
import theme from './theme/theme';

import LoginPage from './routes/LoginPage';
import AuthPage from './routes/AuthPage';
import HomePage from './routes/HomePage';
import ProfilePage from './routes/ProfilePage';
import EditProfilePage from './routes/EditProfilePage';
import GamePage from './routes/GamePage';
import {BrowserRouter, Route} from 'react-router-dom';
import SpectatingPage from './routes/SpectatingPage';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={LoginPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/profile/edit" component={EditProfilePage} />
        <Route path="/game" exact component={GamePage} />
        <Route path="/spectating" exact component={SpectatingPage} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
