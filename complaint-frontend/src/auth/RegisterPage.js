import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
    specialization: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    if (formData.role !== 'STAFF') delete payload.specialization;

    const res = await register(payload);
    setMessage(res);
    if (res.toLowerCase().includes('success')) {
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-md overflow-hidden md:flex">
        {/* Left Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-b from-green-700 to-green-600 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Join Complaint Tracker
          </h1>
          <p className="text-lg mb-6 opacity-90">
            A centralized platform to register and track complaints efficiently.
          </p>
          <ul className="space-y-3 text-gray-100">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>User</strong>: Raise and monitor complaints</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Staff</strong>: Resolve assigned issues</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Admin</strong>: Manage users and assignments</span>
            </li>
          </ul>
          {message && (
            <p className={`mt-6 font-medium ${message.toLowerCase().includes('success') ? 'text-green-200' : 'text-red-200'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create your account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="USER">User</option>
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {formData.role === 'STAFF' && (
              <div>
                <input
                  name="specialization"
                  placeholder="Specialization"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-green-600 hover:underline font-medium">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;