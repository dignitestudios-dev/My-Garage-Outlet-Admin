import React, { useState } from 'react';

const DeleteItemModal = ({ itemDetails, toggleModal, handleDelete, setDeletionReason, deletionReason }) => {
    const [reason, setReason] = useState(deletionReason || ''); // Local state for the reason

    const handleInputChange = (e) => {
        setReason(e.target.value);
        setDeletionReason(e.target.value); // Update parent state as well
    };

    const handleConfirmDelete = () => {
        if (!reason) {
            alert('Please provide a reason for deletion.');
            return;
        }
        handleDelete(reason); // Pass the reason to the parent
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Ensure z-index is high enough */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Delete Item</h2>
                <p className="mb-4">
                    Are you sure you want to delete the item "{itemDetails.title}"? This action cannot be undone.
                </p>

                {/* Reason Input */}
                <div className="mb-4">
                    <label htmlFor="deletionReason" className="text-white">Reason for Deletion:</label>
                    <textarea
                        id="deletionReason"
                        rows="4"
                        value={reason}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
                        placeholder="Please enter the reason for deletion..."
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                        onClick={toggleModal} // Close the modal
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        onClick={handleConfirmDelete} // Confirm delete with reason
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteItemModal;
