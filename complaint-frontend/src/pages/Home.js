import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-center p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Welcome to Complaint Tracker System</h1>
      <p className="text-gray-700 text-lg mb-6">
        A centralized platform for users, staff, and administrators to manage and resolve complaints efficiently.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded shadow"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
