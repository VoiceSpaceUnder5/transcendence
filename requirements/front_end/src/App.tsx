import React from 'react';

import {ThemeProvider} from 'styled-components';
import theme from './theme/theme';

import LoginPage from './routes/LoginPage';
import LoadingPage from './routes/LoadintgPage';
import HomePage from './routes/HomePage';
import ProfilePage from './routes/ProfilePage';
import EditProfilePage from './routes/EditProfilePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ReceiveAccessCode from './routes/ReceiveAccessCode';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/loading" element={<LoadingPage />}></Route>
          <Route path="/return" element={<ReceiveAccessCode />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
