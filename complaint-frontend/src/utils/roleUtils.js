// utils/roleUtils.js

// Get the decoded payload of the JWT token
export const getDecodedToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error('Invalid JWT token:', err);
    return null;
  }
};

// Get logged-in user's role (e.g., ADMIN, USER, STAFF)
export const getUserRole = () => {
  const decoded = getDecodedToken();
  return decoded?.role || null;
};

// Get logged-in user's ID
export const getUserId = () => {
  const decoded = getDecodedToken();
  return decoded?.sub_id || null;
};

// Check if user has a specific role
export const isRole = (role) => getUserRole() === role;

// Check if token exists
export const isAuthenticated = () => !!localStorage.getItem('token');
