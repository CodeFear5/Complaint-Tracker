import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-8">
      <h1 className="text-6xl font-extrabold text-blue-700">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mt-4">Oops! Page not found.</h2>
      <p className="text-gray-600 mt-2 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
