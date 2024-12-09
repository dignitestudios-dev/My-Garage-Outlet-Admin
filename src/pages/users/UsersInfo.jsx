import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditUserModal from '../../components/users/EditUserModal';
import DeleteUserModal from '../../components/users/DeleteUserModal';
import SuspendUserModal from '../../components/users/SuspendUserModal';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const mockEventHistory = [
    { id: 'E001', name: 'Boat Racing', date: '2024-09-12', participants: 'Joined', status: 'Joined' },
    { id: 'E002', name: 'Sea Adventure', date: '2024-08-15', participants: 'Maybe', status: 'Maybe' },
    { id: 'E003', name: 'Fishing Trip', date: '2024-07-05', participants: 'Joined', status: 'Created' },
];

const mockItemList = [
    { id: 'I001', name: 'Luxury Yacht', price: '$5000', sold: false },
    { id: 'I002', name: 'Jet Ski', price: '$1500', sold: true },
    { id: 'I003', name: 'Speed Boat', price: '$3000', sold: false },
];

const UsersInfo = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventFilter, setEventFilter] = useState('All');
    const [isEventsActive, setIsEventsActive] = useState(true);

    const user = {
        id: userId,
        name: 'Jack Lucas',
        email: 'jack@example.com',
        status: 'Active',
        phone: '+1234567890',
        address: 'North Street London',
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleSuspendModal = () => setIsSuspendModalOpen(!isSuspendModalOpen);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const handleSuspend = () => {
        console.log('User suspended');
        toggleSuspendModal();
    };

    const handleDelete = () => {
        console.log('User deleted');
        toggleDeleteModal();
    };

    const handleSave = () => {
        toggleModal();
    };

    const goToEventDetails = (eventId) => {
        navigate(`/event-details/1`);
    };

    const goToItemDetails = (itemId) => {
        navigate(`/item-details`);
    };

    const handleEventFilterChange = (e) => {
        setEventFilter(e.target.value);
    };

    const filteredEvents = mockEventHistory.filter((event) => {
        if (eventFilter === 'All') return true;
        return event.status === eventFilter;
    });

    return (
        <div className="w-full h-full bg-[#001229] p-8 text-white overflow-auto">
            {/* User Info Card */}
            <div className="bg-[#1E2A38] p-8 rounded-xl shadow-2xl hover:shadow-2xl transition-all mb-6 w-full mx-auto">
                <div className="flex items-center space-x-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#EF1C68]">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-4xl font-semibold text-[#EF1C68] mb-2">{user.name}</h2>
                        <p className="text-sm mb-2 text-[#A6A6A6]">Connections 14</p>
                        <div className="flex items-center mb-2 text-[#A6A6A6]">
                            <FaPhoneAlt className="mr-2 text-[#EF1C68]" />
                            <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center mb-2 text-[#A6A6A6]">
                            <FaEnvelope className="mr-2 text-[#EF1C68]" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center mb-2 text-[#A6A6A6]">
                            <FaMapMarkerAlt className="mr-2 text-[#EF1C68]" />
                            <span>{user.address}</span>
                        </div>


                        <div className="mt-4 flex space-x-4">
                            <button
                                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-800 transition"
                                onClick={toggleSuspendModal}
                            >
                                Suspend
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs for Events & Items - Left aligned */}
            <div className="flex mb-6">
                <button
                    className={`px-6 py-2 text-xl rounded-full mr-4 ${isEventsActive ? 'bg-[#EF1C68]' : 'bg-[#2E3C55]'} text-white`}
                    onClick={() => setIsEventsActive(true)}
                >
                    Events
                </button>
                <button
                    className={`px-6 py-2 text-xl rounded-full ${!isEventsActive ? 'bg-[#EF1C68]' : 'bg-[#2E3C55]'} text-white`}
                    onClick={() => setIsEventsActive(false)}
                >
                    Items
                </button>
            </div>

            {/* Conditional Rendering of Event or Item Tables */}
            {isEventsActive ? (
                <div className="bg-[#1E2A38] rounded-xl shadow-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold">Event History</h3>
                        <select
                            className="bg-[#2E3C55] text-white px-4 py-2 rounded-full"
                            value={eventFilter}
                            onChange={handleEventFilterChange}
                        >
                            <option value="All">All</option>
                            <option value="Joined">Joined</option>
                            <option value="Maybe">Maybe</option>
                            <option value="Created">Created</option>
                        </select>
                    </div>

                    <table className="w-full text-white table-auto border-collapse">
                        <thead className="text-sm text-gray-400">
                            <tr>
                                <th className="px-6 py-3 text-left">Event Name</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-[#2C3E56]">
                                    <td className="px-6 py-4">{event.name}</td>
                                    <td className="px-6 py-4">{event.date}</td>
                                    <td className="px-6 py-4">{event.status}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="text-[#EF1C68] hover:text-[#E01C56] transition"
                                            onClick={() => goToEventDetails(event.id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-[#1E2A38] rounded-xl shadow-xl p-6 mb-8">
                    <h3 className="text-2xl font-semibold mb-6">Items Listed</h3>
                    <table className="w-full text-white table-auto border-collapse">
                        <thead className="text-sm text-gray-400">
                            <tr>
                                <th className="px-6 py-3 text-left">Item Name</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockItemList.map((item) => (
                                <tr key={item.id} className="hover:bg-[#2C3E56]">
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="text-[#EF1C68] hover:text-[#E01C56] transition"
                                            onClick={() => goToItemDetails(item.id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modals */}
            {isModalOpen && <EditUserModal user={user} toggleModal={toggleModal} handleSave={handleSave} />}
            {isSuspendModalOpen && <SuspendUserModal toggleSuspendModal={toggleSuspendModal} handleSuspend={handleSuspend} />}
            {isDeleteModalOpen && <DeleteUserModal toggleDeleteModal={toggleDeleteModal} handleDelete={handleDelete} />}
        </div>
    );
};

export default UsersInfo;
