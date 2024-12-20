import React, { useState } from "react";

const DeleteReportModal = ({ eventDetails, toggleModal, handleDelete }) => {
  const [deleteReason, setDeleteReason] = useState("");

  const handleReasonChange = (e) => {
    setDeleteReason(e.target.value);
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteReason);
    toggleModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl p-6 w-1/3">
        <h3 className="text-xl font-semibold mb-4">
          Are you sure you want to delete this content?
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-white">
              <strong>Report ID:</strong> {eventDetails.id}
            </p>
            <p className="text-white">
              <strong>Event Name:</strong> {eventDetails.name}
            </p>
          </div>
          <div>
            <label className="text-white" htmlFor="delete-reason">
              Reason for deletion:
            </label>
            <textarea
              id="delete-reason"
              value={deleteReason}
              onChange={handleReasonChange}
              placeholder="Enter reason for deletion"
              className="w-full mt-2 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-800 text-gray-200 rounded-md hover:bg-red-900 border border-gray-700 transition-colors"
            disabled={!deleteReason} // Disable the delete button if there's no reason
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReportModal;
