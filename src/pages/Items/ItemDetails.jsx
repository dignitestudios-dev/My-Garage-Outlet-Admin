import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaRetweet, FaComment, FaFilePdf } from 'react-icons/fa'; // Added PDF icon
import EditItemModal from '../../components/items/EditItemModal';
import DeleteItemModal from '../../components/items/DeleteItemModal';
import { FaShare } from "react-icons/fa";


const mockItemDetails = {
    id: 'E001',
    title: 'Item Title',
    description: 'Placeholder Item Description',
    image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",  
    geolocation: { lat: 25.7617, lon: -80.1918 }, // Miami coordinates
    city: 'Miami',
    zipcode: '33101',
    likes: 120,
    reposts: 30,
    comments: 45,
};

const ItemDetails = () => {
    const { eventId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const handleSave = () => {
        console.log('Item details saved!');
        toggleEditModal();
    };

    const handleDelete = () => {
        console.log('Item deleted!');
        toggleDeleteModal(); 
    };

    return (
        <div className="h-auto w-full bg-[#001229] text-white flex flex-col items-center px-4 py-8 overflow-y-auto">
            <div className="w-full bg-gray-800 text-gray-200 rounded-lg shadow-lg">
                {/* Item Image Section */}
                <div className="relative w-full">
                    <img
                        src={mockItemDetails.image}
                        alt={mockItemDetails.title}
                        className="w-full h-72 object-cover rounded-t-lg"
                    />
                </div>

                {/* Item Details Section */}
                <div className="p-6 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white">{mockItemDetails.title}</h2>
                    <p className="text-lg md:text-xl text-gray-400">{mockItemDetails.description}</p>

                    <div className="space-y-4">
                        {/* Location, City, and Zipcode */}
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Location:</strong> {mockItemDetails.city}, {mockItemDetails.zipcode}
                        </div>
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Geolocation:</strong> Lat: {mockItemDetails.geolocation.lat}, Lon: {mockItemDetails.geolocation.lon}
                        </div>
                    </div>


                    <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center text-gray-300">
                        <div className="flex items-center space-x-2">
                            <FaHeart className="text-red-500" />
                            <span>{mockItemDetails.likes} Likes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaRetweet className="text-green-500" />
                            <span>{mockItemDetails.reposts} Reposts</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaComment className="text-blue-500" />
                            <span>{mockItemDetails.comments} Comments</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaShare className="text-orange-500" />
                            <span>{mockItemDetails.comments} Shares</span>
                        </div>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="mt-6 flex justify-start space-x-6">
                        {/* <button
                            className="bg-gray-700 text-gray-200 px-6 py-2 rounded-md hover:bg-gray-600 transition-colors shadow-md"
                            onClick={toggleEditModal}
                        >
                            Edit Item
                        </button> */}
                        <button
                            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md"
                            onClick={toggleDeleteModal}
                        >
                            Delete Item
                        </button>

                        {/* Button for downloading PDF report */}
                        {/* <button
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center space-x-2"
                            onClick={() => {}}
                        >
                            <FaFilePdf className="text-xl" /> 
                            <span>Download PDF Report</span>
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Modals for Edit and Delete */}
            {isEditModalOpen && (
                <EditItemModal
                    itemDetails={mockItemDetails}
                    toggleModal={toggleEditModal}
                    handleSave={handleSave}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteItemModal
                    itemDetails={mockItemDetails} 
                    toggleModal={toggleDeleteModal}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default ItemDetails;
