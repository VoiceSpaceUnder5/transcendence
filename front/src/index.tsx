import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {ThemeProvider} from 'styled-components';
import theme from './theme/theme';
import HomePage from './Routes/HomePage';
import ProfilePage from './Routes/ProfilePage';
import EditProfilePage from './Routes/EditProfilePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/profile/edit" element={<EditProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
