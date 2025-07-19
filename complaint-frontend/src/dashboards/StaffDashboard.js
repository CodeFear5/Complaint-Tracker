import { useCallback, useEffect, useState } from 'react';
import ComplaintCard from '../components/ComplaintCard';
import axios from 'axios';
import { getAuthHeaders, getUserId } from '../auth/authUtils';

const StaffDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('assigned'); // default
  const staffId = getUserId();

  const fetchAssignments = useCallback(async () => {
    try {
      const res = await axios.get(`http://44.201.196.33:8080/api/assignments/staff/${staffId}`, getAuthHeaders());
      setAssignments(res.data);
    } catch (err) {
      console.error("❌ Error fetching assignments", err);
    }
  }, [staffId]);

  const resolveComplaint = async (id) => {
    try {
      await axios.patch(`http://44.201.196.33:8080/api/complaints/${id}/resolve`, {}, getAuthHeaders());
      fetchAssignments();
    } catch (err) {
      console.error("❌ Error resolving complaint", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const filteredAssignments = assignments.filter(assign => 
    assign.complaint.status?.toLowerCase() === filter
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">Assigned Complaints</h2>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        {['pending', 'assigned', 'resolved'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Filtered Complaint Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map(assign => (
            <div key={assign.id} className="space-y-2">
              <ComplaintCard complaint={assign.complaint} />
              {assign.complaint.status !== 'resolved' && (
                <button
                  onClick={() => resolveComplaint(assign.complaint.id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No complaints under "{filter}"</p>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
