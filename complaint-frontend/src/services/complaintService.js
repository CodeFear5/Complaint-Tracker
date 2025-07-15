// services/complaintService.js
import API from './api';

// Submit a complaint
export const submitComplaint = async (complaintData) => {
  const res = await API.post('/complaints', complaintData);
  return res.data;
};

// Get all complaints (admin/staff)
export const getAllComplaints = async () => {
  const res = await API.get('/complaints');
  return res.data;
};

// Get complaints by user ID
export const getComplaintsByUser = async (userId) => {
  const res = await API.get(`/complaints/user/${userId}`);
  return res.data;
};

// Mark complaint as resolved (staff/admin only)
export const resolveComplaint = async (complaintId) => {
  const res = await API.patch(`/complaints/${complaintId}/resolve`);
  return res.data;
};

// Assign complaint (admin only)
export const assignComplaint = async (complaintId, staffId) => {
  const res = await API.post(`/assignments?complaintId=${complaintId}&staffId=${staffId}`);
  return res.data;
};

// Get assignments for a staff
export const getAssignmentsByStaff = async (staffId) => {
  const res = await API.get(`/assignments/staff/${staffId}`);
  return res.data;
};
