import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import MainPage from '../../pages/MainPage';
import UserPage from '../../pages/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/users" element={<MainPage />} />
      <Route path="/about" element={<UserPage />} />
    </Routes>
  )
}

export default App;
