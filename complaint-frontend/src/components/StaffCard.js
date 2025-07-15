import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const StaffCard = ({ staff }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">{staff.name}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Staff
        </span>
      </div>
      <p className="text-sm text-gray-600">{staff.email}</p>
      <div className="flex justify-between text-xs text-gray-500">
          <p className="text-sm text-gray-600">{staff.specialization}</p>

      </div>
    </div>
  );
};

export default StaffCard;