import React, { useState, useEffect } from 'react';

const EditReportModal = ({ isOpen, onClose, report, onSave }) => {
  const [editedReport, setEditedReport] = useState({});

  useEffect(() => {
    if (report) {
      setEditedReport(report);
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedReport);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-700 bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-100">Edit Report</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            X
          </button>
        </div>

        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={editedReport.name || ''}
            onChange={handleChange}
            className="bg-gray-700 text-gray-100 p-2 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={editedReport.email || ''}
            onChange={handleChange}
            className="bg-gray-700 text-gray-100 p-2 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Reason</label>
          <input
            type="text"
            name="reason"
            value={editedReport.reason || ''}
            onChange={handleChange}
            className="bg-gray-700 text-gray-100 p-2 rounded-md w-full"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReportModal;
