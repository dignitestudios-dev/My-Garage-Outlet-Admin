import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditEventModal from '../../components/events/EditEventModal';
import DeleteEventModal from '../../components/events/DeleteEventModal';
import { FaHeart, FaRetweet, FaComment, FaFilePdf } from 'react-icons/fa'; 
import { FaShare } from "react-icons/fa";


const mockEventDetails = {
    id: 'E001',
    title: 'Event Title',
    description: 'An exciting boat racing event in the open sea. Experience the thrill and speed!',
    date: '2024-09-12',
    time: '10:00 AM - 2:00 PM',
    location: 'Miami, Florida',
    participants: 'John, Alice, Bob',
    image: "https://images.pexels.com/photos/1034664/pexels-photo-1034664.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    likes: 120,
    reposts: 30,
    comments: 45
};

const EventDetails = () => {
    const { eventId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const handleSave = () => {
        console.log('Event details saved!');
        toggleEditModal();
    };

    const handleDelete = () => {
        console.log('Event deleted!');
        toggleDeleteModal();
    };

    return (
        <div className="min-h-auto w-full bg-[#001229] text-white flex flex-col items-center px-4 py-8 overflow-y-auto">
            <div className="w-full bg-gray-800 text-gray-200 rounded-lg shadow-lg">
                {/* Event Image Section */}
                <div className="relative">
                    <img
                        src={mockEventDetails.image}
                        alt={mockEventDetails.title}
                        className="w-full h-72 object-cover rounded-t-lg"
                    />
                </div>
                <div className="p-6">
                    <h2 className="text-4xl font-bold mb-3">{mockEventDetails.title}</h2>
                    <p className="text-lg text-gray-400 mb-5">{mockEventDetails.description}</p>

                    <div className="space-y-3">
                        <div className="text-lg font-semibold">
                            <span className="text-gray-400">Date:</span> {mockEventDetails.date}
                        </div>
                        <div className="text-lg font-semibold">
                            <span className="text-gray-400">Time:</span> {mockEventDetails.time}
                        </div>
                        <div className="text-lg font-semibold">
                            <span className="text-gray-400">Location:</span> {mockEventDetails.location}
                        </div>
                        <div className="text-lg font-semibold">
                            <span className="text-gray-400">Participants:</span> {mockEventDetails.participants}
                        </div>
                    </div>

                    {/* Social Interaction Section */}
                    <div className="bg-gray-900 p-4 rounded-b-lg flex justify-around text-gray-300 mt-4">
                        <div className="flex items-center space-x-2">
                            <FaHeart className="text-red-500" />
                            <span>{mockEventDetails.likes} Likes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaRetweet className="text-green-500" />
                            <span>{mockEventDetails.reposts} Reposts</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaComment className="text-blue-500" />
                            <span>{mockEventDetails.comments} Comments</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaShare className="text-orange-500" />
                            <span>10 Shares</span>
                        </div>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="mt-6 flex space-x-4">
                        <button
                            className="bg-gray-700 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-600 transition-colors"
                            onClick={toggleEditModal}
                        >
                            Edit Event
                        </button>
                        <button
                            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors"
                            onClick={toggleDeleteModal}
                        >
                            Delete Event
                        </button>

                        {/* Button for downloading PDF report */}
                        <button
                            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-md"
                            onClick={() => {}}
                        >
                            <FaFilePdf className="text-xl" /> {/* PDF Icon */}
                            <span>Download PDF Report</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals for Edit and Delete */}
            {isEditModalOpen && (
                <EditEventModal
                    eventDetails={mockEventDetails}
                    toggleModal={toggleEditModal}
                    handleSave={handleSave}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteEventModal
                    eventDetails={mockEventDetails}
                    toggleModal={toggleDeleteModal}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default EventDetails;
