import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(formData);
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const role = decoded?.role?.toUpperCase() || 'USER';

      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'STAFF') navigate('/staff');
      else navigate('/user');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gradient-to-br from-sky-200 via-blue-100 to-white px-4 md:px-0">
      
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-center">
        
        {/* Branding Left Side */}
        <div className="w-full md:w-1/2 p-10 md:p-16 text-blue-900">
          <h1 className="text-5xl font-extrabold mb-4">Complaint Tracker</h1>
          <p className="text-lg max-w-xl text-blue-800">
            Welcome to the campus complaint portal. Login to raise, track and resolve issues transparently.
          </p>
          <p className="mt-10 text-sm text-blue-700">© 2025 Complaint Tracker</p>
        </div>

        {/* Transparent Form Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="backdrop-blur-lg bg-white/60 p-8 md:p-10 rounded-xl w-full max-w-md shadow-none">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

            {error && (
              <p className="text-red-600 mb-4 text-center font-medium text-sm">{error}</p>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-600">
              Don’t have an account?{' '}
              <a href="/register" className="text-blue-500 hover:underline font-medium">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
