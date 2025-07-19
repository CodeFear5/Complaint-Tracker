import React, { useState, useEffect, useCallback } from 'react';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintCard from '../components/ComplaintCard';
import axios from 'axios';
import { getAuthHeaders, getUserId } from '../auth/authUtils';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('complaints');
  const [complaints, setComplaints] = useState([]);
  const userId = getUserId();

  const fetchComplaints = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://44.201.196.33/api/complaints/user/${userId}`,
        getAuthHeaders()
      );
      setComplaints(res.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  }, [userId]);

  const handleSubmit = async (formData) => {
    try {
      const res = await axios.post(
        `https://44.201.196.33/api/complaints`,
        { ...formData, submittedBy: { id: userId } },
        getAuthHeaders()
      );
      setComplaints((prev) => [res.data, ...prev]);
      setActiveTab('complaints'); // switch to complaints tab
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'complaints'
              ? 'border-b-2 border-blue-600 text-blue-700'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          My Complaints
        </button>
        <button
          onClick={() => setActiveTab('raise')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'raise'
              ? 'border-b-2 border-blue-600 text-blue-700'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          Raise Complaint
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'raise' && (
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">Raise a Complaint</h2>
          <ComplaintForm onSubmit={handleSubmit} />
        </div>
      )}

      {activeTab === 'complaints' && (
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">Your Complaints</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
