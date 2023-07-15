import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../../pages/RegisterPage.jsx';
import MainPage from '../../pages/MainPage.jsx';
import UserPage from '../../pages/UserPage.jsx';
import ProtectedRoute from '../../utils/router/ProtectedRoute.js';

function App() {
  return (
    <Routes>
      <Route path='/' element={<RegisterPage />} />
      <Route
        path='/users'
        element={
          <ProtectedRoute >
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/about'
        element={
          <ProtectedRoute >
            <UserPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
