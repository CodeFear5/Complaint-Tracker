import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ComplaintChart = ({ complaints }) => {
  const statusCounts = complaints.reduce((acc, curr) => {
    const status = curr.status?.toLowerCase() || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pending = statusCounts['pending'] || 0;
  const assigned = statusCounts['assigned'] || 0;
  const resolved = statusCounts['resolved'] || 0;

  const data = {
    labels: ['Pending', 'Assigned', 'Resolved'],
    datasets: [
      {
        label: 'Complaints',
        data: [pending, assigned, resolved],
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center md:flex-row md:justify-between md:w-[80%] mx-auto">
      {/* Pie Chart */}
      <div className="w-full md:w-1/3">
        <Pie data={data} options={{ plugins: { legend: { position: 'bottom' } } }} />
      </div>

      {/* Text Summary */}
      <div className="mt-6 md:mt-0 md:ml-6 text-sm text-gray-700 space-y-2">
        <h4 className="text-base font-semibold">Complaint Status</h4>
        <p><span className="font-medium text-yellow-600">Pending:</span> {pending}</p>
        <p><span className="font-medium text-blue-600">Assigned:</span> {assigned}</p>
        <p><span className="font-medium text-green-600">Resolved:</span> {resolved}</p>
      </div>
    </div>
  );
};

export default ComplaintChart;
