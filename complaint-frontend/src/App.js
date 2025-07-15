import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
  
import UserDashboard from './dashboards/UserDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import LandingPage from './components/LandingPage';
function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

         <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} /> 
        {/* Protected Routes (role-based) */}
<Route
  path="/user"
  element={
    <PrivateRoute allowedRoles={['USER']}>
      <UserDashboard />
    </PrivateRoute>
  }
/>

        {/* <Route path="/user" element={<UserDashboard />} /> */}

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute allowedRoles={['STAFF']}>
              <StaffDashboard />
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
