import React, { useState } from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirmDelete }) => {
  if (!isOpen) return null;

  const [reason, setReason] = useState("");

  const handleInputChange = (e) => {
    setReason(e.target.value);
  };

  const handleConfirm = () => {
    if (!reason) {
      alert("Please provide a reason for deletion.");
      return;
    }
    onConfirmDelete(reason);
    setReason("");
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Delete User</h2>
        <p className="mb-4 text-white">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        <div className="mb-4">
          <label htmlFor="deletionReason" className="text-white">
            Reason for Deletion:
          </label>
          <textarea
            id="deletionReason"
            rows="4"
            value={reason}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
            placeholder="Please enter the reason for deleting this user..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
            onClick={onClose} // Close modal without deleting
          >
            Cancel
          </button>
          <button
            className="bg-red-800 text-gray-200 px-5 py-2 rounded-md hover:bg-red-900 border border-gray-700 transition-colors"
            onClick={handleConfirm} // Confirm deletion with reason
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
