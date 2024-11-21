import React from 'react';

const EditUserModal = ({ user, toggleModal, handleSave }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-50 backdrop-filter backdrop-blur-lg  border border-gray-700 shadow-lg'">
            <h2 className="text-2xl font-bold mb-4">Edit User Details</h2>
                <label className="block mb-2">Name</label>
                <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
                />
                <label className="block mb-2">Email</label>
                <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
                />
                <div className="flex justify-end space-x-4">
                <button className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"

                        onClick={toggleModal}
                    >
                        Cancel
                    </button>
                    <button className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"

                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
