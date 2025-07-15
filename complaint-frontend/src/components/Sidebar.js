import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <aside className="w-64 bg-white border-r h-full px-4 py-6 shadow-md">
      <nav className="space-y-4">
        {role === 'ADMIN' && (
          <>
            <Link to="/admin" className="block text-gray-800 hover:text-blue-600">Dashboard</Link>
            <Link to="/admin/users" className="block text-gray-800 hover:text-blue-600">Users</Link>
            <Link to="/admin/staff" className="block text-gray-800 hover:text-blue-600">Staff</Link>
          </>
        )}

        {role === 'USER' && (
          <>
            <Link to="/user" className="block text-gray-800 hover:text-blue-600">My Complaints</Link>
            <Link to="/user/new" className="block text-gray-800 hover:text-blue-600">Raise Complaint</Link>
          </>
        )}

        {role === 'STAFF' && (
          <>
            <Link to="/staff" className="block text-gray-800 hover:text-blue-600">Assigned Complaints</Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
