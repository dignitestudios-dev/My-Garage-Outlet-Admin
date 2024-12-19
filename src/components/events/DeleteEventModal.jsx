import React, { useState } from "react";

const DeleteEventModal = ({
  eventDetails,
  onClose,
  onDelete,
  isDeletingEvent,
  deletionReason,
  setDeletionReason,
}) => {
  const handleConfirmDelete = async () => {
    if (!deletionReason) {
      alert("Please provide a reason for deleting the event.");
      return;
    }
    onDelete();
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Delete Event</h2>
        <p className="mb-4 text-white">
          Are you sure you want to delete the event "{eventDetails?.title}"?
          This action cannot be undone.
        </p>

        <div className="mb-4">
          <label htmlFor="deletionReason" className="text-white">
            Reason for Deletion:
          </label>
          <textarea
            id="deletionReason"
            rows="4"
            value={deletionReason}
            onChange={(e) => setDeletionReason(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
            placeholder="Please enter the reason for deleting this event..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 border border-gray-700 transition-colors"
            onClick={() => handleConfirmDelete()}
          >
            {isDeletingEvent ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
