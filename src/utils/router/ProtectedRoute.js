import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, fallbackPath = '/' }) => {
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
