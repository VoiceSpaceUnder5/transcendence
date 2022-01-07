import React from 'react';

import {ThemeProvider} from 'styled-components';
import theme from './theme/theme';

import LoginPage from './routes/LoginPage';
import AuthPage from './routes/AuthPage';
import HomePage from './routes/HomePage';
import ProfilePage from './routes/ProfilePage';
import EditProfilePage from './routes/EditProfilePage';
import GamePage from './routes/GamePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
