import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditUserModal from '../../components/users/EditUserModal';
import DeleteUserModal from '../../components/users/DeleteUserModal';
import SuspendUserModal from '../../components/users/SuspendUserModal';

const mockEventHistory = [
    { id: 'E001', name: 'Boat Racing', date: '2024-09-12', participants: 'John, Alice, Bob', status: 'Joined' },
    { id: 'E002', name: 'Sea Adventure', date: '2024-08-15', participants: 'Mary, Sam', status: 'Maybe' },
    { id: 'E003', name: 'Fishing Trip', date: '2024-07-05', participants: 'Alice, Mike', status: 'Created' },
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
    const [eventFilter, setEventFilter] = useState('All'); // State for event filter
    const [isEventsActive, setIsEventsActive] = useState(true); // State for toggling between Events and Items

    const user = {
        id: userId,
        name: 'Jack Lucas',
        email: 'jack@example.com',
        role: 'Lister',
        status: 'Active',
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

    // Function to navigate to event details
    const goToEventDetails = (eventId) => {
        navigate(`/event-details`);
    };

    // Function to navigate to item details
    const goToItemDetails = (itemId) => {
        navigate(`/item-details`);
    };

    // Handle the filter change
    const handleEventFilterChange = (e) => {
        setEventFilter(e.target.value);
    };

    // Filter events based on the selected filter
    const filteredEvents = mockEventHistory.filter((event) => {
        if (eventFilter === 'All') return true;
        return event.status === eventFilter;
    });

    return (
        <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-[#001229] overflow-auto">
            <div className="w-full h-auto text-white p-8">
                <div className="flex flex-col items-center justify-start w-full lg:px-16 space-y-8">
                    {/* User Info Card */}
                    <div className="w-full bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors p-6 shadow-lg">
                        <div className="flex items-start space-x-6 mt-2">
                            <div className="w-24 h-24 rounded-full overflow-hidden mt-2">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 mb-4">
                                <h2 className="text-2xl font-bold ">{user.name}</h2>
                                <p className="mb-4">Connections 14</p>
                                <div className="flex space-x-4">
                                    <button
                                        className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
                                        onClick={toggleModal}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
                                        onClick={toggleSuspendModal}
                                    >
                                        Suspend
                                    </button>
                                    <button
                                        className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
                                        onClick={toggleDeleteModal}
                                    >
                                        Delete
                                    </button>
                                    {/* Download PDF Report Button */}
                                    <button
                                        className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors"
                                        onClick={() => {}}
                                    >
                                        Download PDF Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-8">
                        <div className="flex space-x-4 mb-4">
                            {/* Toggle Button for Events and Items */}
                            <button
                                className={`px-6 py-2 rounded-md text-white ${
                                    isEventsActive ? 'bg-[#EF1C68]' : 'bg-gray-700'
                                }`}
                                onClick={() => setIsEventsActive(true)}
                            >
                                Events
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md text-white ${
                                    !isEventsActive ? 'bg-[#EF1C68]' : 'bg-gray-700'
                                }`}
                                onClick={() => setIsEventsActive(false)}
                            >
                                Items
                            </button>
                        </div>

                        {/* Conditional Rendering of Tables */}
                        {isEventsActive ? (
                            <div className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors p-6 shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold mt-2">Event History</h3>
                                    {/* Event Filter Dropdown */}
                                    <div className="ml-auto">
                                        <select
                                            className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md"
                                            value={eventFilter}
                                            onChange={handleEventFilterChange}
                                        >
                                            <option value="All">All</option>
                                            <option value="Joined">Joined</option>
                                            <option value="Maybe">Maybe</option>
                                            <option value="Created">Created</option>
                                        </select>
                                    </div>
                                </div>

                                <table className="table-auto w-full mb-6 text-gray-300 border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Event Name</th>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Date</th>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Participants</th>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEvents.map((event) => (
                                            <tr key={event.id}>
                                                <td className="px-4 py-2 border-b border-gray-700">{event.name}</td>
                                                <td className="px-4 py-2 border-b border-gray-700">{event.date}</td>
                                                <td className="px-4 py-2 border-b border-gray-700">{event.participants}</td>
                                                <td className="px-4 py-2 border-b border-gray-700">
                                                    <button className="text-blue-500" onClick={() => goToEventDetails(event.id)}>
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4 mt-2">Items Listed</h3>
                                <table className="table-auto w-full mb-6 text-gray-300 border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Item Name</th>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Price</th>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Sold</th>
                                            <th className="px-4 py-2 text-left border-b border-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockItemList.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2 border-b border-gray-700">{item.name}</td>
                                                <td className="px-4 py-2 border-b border-gray-700">{item.price}</td>
                                                <td className="px-4 py-2 border-b border-gray-700">{item.sold ? 'Sold' : 'Available'}</td>
                                                <td className="px-4 py-2 border-b border-gray-700">
                                                    <button className="text-blue-500" onClick={() => goToItemDetails(item.id)}>
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && <EditUserModal user={user} toggleModal={toggleModal} handleSave={handleSave} />}
            {isSuspendModalOpen && <SuspendUserModal toggleSuspendModal={toggleSuspendModal} handleSuspend={handleSuspend} />}
            {isDeleteModalOpen && <DeleteUserModal toggleDeleteModal={toggleDeleteModal} handleDelete={handleDelete} />}
        </div>
    );
};

export default UsersInfo;
