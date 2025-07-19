import   { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../auth/authUtils';
import ComplaintCard from '../components/ComplaintCard';
import StaffCard from '../components/StaffCard';
import UserTable from '../components/UserTable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
 import ComplaintChart from  "../components/ComplaintChart";
 dayjs.extend(relativeTime);

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [staff, setStaff] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('complaints');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [assignmentStatus, setAssignmentStatus] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [res1, res2] = await Promise.all([
        axios.get('http://localhost:8080/api/complaints', getAuthHeaders()),
        axios.get('http://localhost:8080/api/users', getAuthHeaders())
      ]);
      setComplaints(res1.data);
      setUsers(res2.data.filter(u => u.role === 'USER'));
      setStaff(res2.data.filter(u => u.role === 'STAFF'));
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resolveComplaint = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/complaints/${id}/resolve`,
        {},
        getAuthHeaders()
      );
      fetchAll();
    } catch (err) {
      setError('Failed to resolve complaint. Please try again.');
      console.error(err);
    }
  };

  const assignComplaint = async () => {
    if (!selectedComplaint || !selectedStaff) {
      setError('Please select both a complaint and a staff member');
      return;
    }
    
    try {
      setAssignmentStatus('Assigning...');
      await axios.post(
        `http://localhost:8080/api/assignments?complaintId=${selectedComplaint.id}&staffId=${selectedStaff.id}`,
        {},
        getAuthHeaders()
      );
      setAssignmentStatus('Assignment successful!');
      setSelectedComplaint(null);
      setSelectedStaff(null);
      setTimeout(() => setAssignmentStatus(''), 2000);
      fetchAll();
    } catch (err) {
      setError('Failed to assign complaint. Please try again.');
      console.error(err);
      setAssignmentStatus('');
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

 
const unresolvedComplaints = useMemo(() => 
  complaints.filter(c => c.status?.toLowerCase() === 'pending'), 
  [complaints]
);


const [complaintFilter, setComplaintFilter] = useState('pending');

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
          <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            ×
          </button>
        </div>
      )}

 

      {/* Tabs */}
      <div className="flex space-x-4 border-b mt-4">
        <button 
          onClick={() => setTab('complaints')} 
          className={`pb-2 ${tab === 'complaints' ? 'border-b-2 border-blue-600 text-blue-700' : ''}`}
        >
          Complaints
        </button>
        <button 
          onClick={() => setTab('assign')} 
          className={`pb-2 ${tab === 'assign' ? 'border-b-2 border-blue-600 text-blue-700' : ''}`}
        >
          Assign to Staff
        </button>
        <button 
          onClick={() => setTab('users')} 
          className={`pb-2 ${tab === 'users' ? 'border-b-2 border-blue-600 text-blue-700' : ''}`}
        >
          Users
        </button>

        <button 
    onClick={() => setTab('analysis')} 
    className={`pb-2 ${tab === 'analysis' ? 'border-b-2 border-blue-600 text-blue-700' : ''}`}
  >
    View Analysis
  </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Complaints Tab */}
   {/* Complaints Tab */}
{!loading && tab === 'complaints' && (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Complaints - {complaintFilter.toUpperCase()}</h3>

    {/* Filter Buttons */}
    <div className="flex gap-3 mb-4">
      {['pending', 'assigned', 'resolved'].map(status => (
        <button
          key={status}
          onClick={() => setComplaintFilter(status)}
          className={`px-4 py-1 rounded ${
            complaintFilter === status
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>

    {/* Complaint Cards */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {complaints
        .filter(c => c.status?.toLowerCase() === complaintFilter)
        .map(c => (
          <div key={c.id} className="relative border rounded shadow p-4 bg-white">
            <ComplaintCard complaint={c} />
            {c.status !== 'resolved' && (
              <button
                onClick={() => resolveComplaint(c.id)}
                className="absolute top-2 right-2 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Mark Resolved
              </button>
            )}
            <p className="text-xs text-gray-500 mt-2">Created {dayjs(c.created_at).fromNow()}</p>
          </div>
        ))}
    </div>
  </div>
)}

{/* Analysis Tab */}
{!loading && tab === 'analysis' && (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Complaint Overview</h3>
    <ComplaintChart complaints={complaints} />
  </div>
)}


      {/* Assign to Staff Tab - Split View */}
      {!loading && tab === 'assign' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Assign Complaints to Staff</h3>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Pending Complaints Section */}
            <div className="lg:w-1/2 bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-medium mb-3">Pending Complaints ({unresolvedComplaints.length})</h4>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {unresolvedComplaints.length > 0 ? (
                  unresolvedComplaints.map(complaint => (
                    <div
                      key={complaint.id}
                      onClick={() => setSelectedComplaint(complaint)}
                      className={`p-3 border rounded cursor-pointer transition-all ${
                        selectedComplaint?.id === complaint.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <ComplaintCard complaint={complaint} compact />
                      <p className="text-xs text-gray-500 mt-1">
                        Created {dayjs(complaint.created_at).fromNow()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No pending complaints</p>
                )}
              </div>
            </div>

            {/* Staff Members Section */}
            <div className="lg:w-1/2 bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-medium mb-3">Available Staff ({staff.length})</h4>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {staff.length > 0 ? (
                  staff.map(staffMember => (
                    <div
                      key={staffMember.id}
                      onClick={() => setSelectedStaff(staffMember)}
                      className={`p-3 border rounded cursor-pointer transition-all ${
                        selectedStaff?.id === staffMember.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <StaffCard staff={staffMember} />
                 
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No staff members available</p>
                )}
              </div>
            </div>
          </div>

          {/* Assignment Controls */}
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h4 className="font-medium">Selected Complaint:</h4>
                {selectedComplaint ? (
                  <div className="mt-1">
                    <p className="font-semibold">#{selectedComplaint.id} - {selectedComplaint.title}</p>
                    <p className="text-sm text-gray-600 truncate">{selectedComplaint.description}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No complaint selected</p>
                )}
              </div>

              <div className="flex-1">
                <h4 className="font-medium">Selected Staff:</h4>
                {selectedStaff ? (
                  <div className="mt-1">
                    <p className="font-semibold">{selectedStaff.name}</p>
                    <p className="text-sm text-gray-600">{selectedStaff.email}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No staff selected</p>
                )}
              </div>

              <button
                onClick={assignComplaint}
                disabled={!selectedComplaint || !selectedStaff}
                className={`px-4 py-2 rounded text-white font-medium ${
                  selectedComplaint && selectedStaff 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {assignmentStatus || 'Assign Complaint'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {!loading && tab === 'users' && (
        <UserTable users={users} staff={staff} />
      )}
    </div>
  );
};

export default AdminDashboard;