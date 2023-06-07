import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage.jsx';
import MainPage from '../../pages/MainPage.jsx';
import UserPage from '../../pages/UserPage.jsx';

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
