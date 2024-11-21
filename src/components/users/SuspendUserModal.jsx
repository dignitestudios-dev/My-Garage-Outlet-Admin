import React, { useState } from 'react';

const SuspendUserModal = ({ toggleSuspendModal, handleSuspend }) => {
    const [reason, setReason] = useState(''); // Local state for the reason

    // Handle input change for the reason
    const handleInputChange = (e) => {
        setReason(e.target.value); // Update the reason state as user types
    };

    // Confirm suspension with reason
    const handleConfirmSuspend = () => {
        if (!reason) {
            alert('Please provide a reason for suspension.'); // Alert if no reason is entered
            return;
        }
        handleSuspend(reason); // Pass reason to the parent function
        toggleSuspendModal(); // Close the modal after suspending
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-white">Suspend User</h2>
                <p className="mb-4 text-white">Are you sure you want to suspend this user? This action can be undone later.</p>
                
                {/* Reason Input */}
                <div className="mb-4">
                    <label htmlFor="suspensionReason" className="text-white">Reason for Suspension:</label>
                    <textarea
                        id="suspensionReason"
                        rows="4"
                        value={reason}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
                        placeholder="Please enter the reason for suspension..."
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
                        onClick={toggleSuspendModal} // Close the modal without suspending
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 border border-gray-700 transition-colors"
                        onClick={handleConfirmSuspend} // Confirm suspension with the reason
                    >
                        Suspend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuspendUserModal;
