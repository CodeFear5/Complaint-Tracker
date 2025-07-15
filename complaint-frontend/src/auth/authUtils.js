// src/auth/authUtils.js
import { jwtDecode } from 'jwt-decode'; 

// 🔐 Get the JWT token from localStorage
export const getToken = () => localStorage.getItem('token');

// 👤 Extract user role from the token
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // You can adjust this line depending on how your token is structured
return decoded.role?.toUpperCase() || null;
  } catch {
    return null;
  }
};

// 👤 Get user ID from token (assumes JWT payload includes it as `sub_id` or `id`)
export const getUserId = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id || null; // ✅ must be `id`, not `sub_id`
  } catch {
    return null;
  }
};


// 🛡️ Generate headers with Bearer token for axios/fetch
export const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  }
});

// ✅ Get all user info (ID, email, role) from the token
export const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      email: decoded.sub,
      role: decoded.role?.toUpperCase()
    };
  } catch {
    return null;
  }
};
