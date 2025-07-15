import React, { useState } from 'react';

const ComplaintForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', location: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded space-y-4">
      <input
        name="title"
        placeholder="Complaint Title"
        className="w-full px-4 py-2 border rounded"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full px-4 py-2 border rounded"
        rows="3"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        className="w-full px-4 py-2 border rounded"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
        Submit Complaint
      </button>
    </form>
  );
};

export default ComplaintForm;
