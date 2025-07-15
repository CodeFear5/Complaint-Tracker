import React from 'react';

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg text-blue-700">{complaint.title}</h3>
      <p className="text-gray-600 mt-1">{complaint.description}</p>
      <p className="text-sm text-gray-500">Location: {complaint.location}</p>
      <span className={`mt-2 inline-block px-2 py-1 text-sm rounded 
        ${complaint.status === 'resolved' ? 'bg-green-200 text-green-800' :
        complaint.status === 'Assigned' ? 'bg-yellow-200 text-yellow-800' :
        'bg-red-200 text-red-800'}`}>
        {complaint.status}
      </span>
    </div>
  );
};

export default ComplaintCard;
