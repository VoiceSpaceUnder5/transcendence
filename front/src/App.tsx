import React from 'react';

import {ThemeProvider} from 'styled-components';
import theme from './theme/theme';

import Navbar from './components/common/Navbar';
import Chat from './components/Chat/Chat';
import Body from './components/common/Body';
import HomePage from './routes/HomePage';
import ProfilePage from './routes/ProfilePage';
import EditProfilePage from './routes/EditProfilePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Body>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
          </Routes>
          <Chat />
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
