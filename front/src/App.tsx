import React from 'react';

import {ThemeProvider} from 'styled-components';
import theme from './theme/theme';

import Navbar from './Components/common/Navbar';
import Chat from './Components/Chat/Chat';
import Body from './Components/common/Body';
import HomePage from './Routes/HomePage';
import ProfilePage from './Routes/ProfilePage';
import EditProfilePage from './Routes/EditProfilePage';
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
