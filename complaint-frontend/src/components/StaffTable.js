import React from 'react';

const StaffTable = ({ staffList, onAssign }) => {
  return (
    <table className="w-full border text-left bg-white shadow">
      <thead className="bg-blue-100">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Specialization</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {staffList.map(staff => (
          <tr key={staff.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{staff.id}</td>
            <td className="p-3">{staff.name}</td>
            <td className="p-3">{staff.specialization}</td>
            <td className="p-3">
              <button
                onClick={() => onAssign(staff.id)}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                Assign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaffTable;
