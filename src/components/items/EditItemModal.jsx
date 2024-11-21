import React from 'react';

const EditItemModal = ({ itemDetails, toggleModal, handleSave }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Added z-50 for stacking order */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md overflow-auto"> {/* Added overflow-auto to allow scrolling inside the modal if needed */}
                <h2 className="text-2xl font-bold mb-4">Edit item</h2>
                <label className="block mb-2">Title</label>
                <input
                    type="text"
                    defaultValue={itemDetails.title}
                    className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
                />
                <label className="block mb-2">Description</label>
                <textarea
                    className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
                    rows="4"
                    defaultValue={itemDetails.description}
                />
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                        onClick={toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditItemModal;
