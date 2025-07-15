import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole, getToken, getUserInfo } from '../auth/authUtils';

const Navbar = () => {
  const isLoggedIn = !!getToken();
  const navigate = useNavigate();
  const role = getUserRole();
  const user = getUserInfo();
  const [showProfile, setShowProfile] = useState(false);

  // 🎨 Role-based navbar background
  const getNavbarBg = () => {
    switch (role) {
      case 'ADMIN':
        return 'bg-amber-600';
      case 'STAFF':
        return 'bg-green-700';
      case 'USER':
        return 'bg-sky-600';
      default:
        return 'bg-blue-700';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className={`${getNavbarBg()} text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50`}
    >
      {/* Brand */}
      <h1 className="text-2xl font-bold tracking-wide">Complaint Tracker</h1>

      {/* Right Nav Links */}
      <div className="flex items-center space-x-6">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/" className="hover:underline">Home</Link>
          </>
        ) : (
          <>
            {/* Dashboard by Role */}
            {role === 'USER' && <Link to="/user" className="hover:underline">Dashboard</Link>}
            {role === 'STAFF' && <Link to="/staff" className="hover:underline">Dashboard</Link>}
            {role === 'ADMIN' && <Link to="/admin" className="hover:underline">Dashboard</Link>}
            <Link to="/" className="hover:underline">Home</Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="hover:underline"
              >
                View Profile
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg p-4 z-50 animate-fadeIn">
                  <h3 className="font-bold mb-2 border-b pb-1">Your Info</h3>
                  <p><span className="font-semibold">ID:</span> {user?.id}</p>
                  <p><span className="font-semibold">Email:</span> {user?.email}</p>
                  <p><span className="font-semibold">Role:</span> {user?.role}</p>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="mt-3 text-sm text-blue-600 hover:underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
