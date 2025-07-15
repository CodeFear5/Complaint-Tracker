// src/routes/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../auth/authUtils';  // ✅ use from authUtils

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    console.warn('🔐 No token or invalid token');
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(role.toUpperCase())) {
    return children;
  } else {
    console.warn('🚫 Access denied for role:', role);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
