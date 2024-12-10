import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaExclamationTriangle, FaCalendarAlt, FaEye } from 'react-icons/fa';
import DeleteReportModal from '../../components/reports/DeleteReportModal';

const mockReportDetails = {
    id: 'R001',
    reportType: 'User', // Can be 'User', 'Event', or 'Item'
    reporterName: 'John Doe',
    reporterEmail: 'john.doe@example.com',
    reason: 'Inappropriate content',
    // status: 'Pending', // Could be 'Pending', 'Resolved', 'Rejected'
    dateReported: '2024-11-10',
    reportedUsername: 'jane_doe', // Mock username for the reported user
};

const ReportDetails = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const handleDelete = () => {
        console.log('Report deleted!');
        toggleDeleteModal();
    };

    return (
        <div className="h-full w-full bg-[#001229] text-white flex flex-col items-center px-6 py-10 overflow-y-auto">
            <div className="w-full max-w-4xl bg-gray-800 text-gray-200 rounded-lg shadow-lg">
                <div className="p-8 space-y-6">
                    <h2 className="text-3xl font-semibold text-white mb-4">Report Details</h2>
                    <p className="text-lg text-gray-400">{`Report Type: ${mockReportDetails.reportType}`}</p>

                    <div className="space-y-6 mt-4">
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Reported By:</strong> {mockReportDetails.reporterName} 
                        </div>

                        <div className="flex items-center justify-between space-x-4 text-lg text-gray-300">
                            <div>
                                <strong className="text-gray-500">Reported User:</strong> {mockReportDetails.reportedUsername}
                            </div>
                            {/* View Button as Link */}
                            <Link
                                to={mockReportDetails.reportType === 'User' ? `/user-info/${mockReportDetails.reportedUsername}` : `/event-details/${mockReportDetails.id}`}
                                className="flex items-center text-blue-500 hover:text-blue-700 font-semibold"
                            >
                                <FaEye className="mr-2" />
                                View
                            </Link>
                        </div>

                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Reason:</strong> {mockReportDetails.reason}
                        </div>
                        {/* <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Status:</strong> 
                            <span className={`font-semibold ${mockReportDetails.status === 'Resolved' ? 'text-green-500' : mockReportDetails.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                                {mockReportDetails.status}
                            </span>
                        </div> */}
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Date Reported:</strong> {mockReportDetails.dateReported}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg flex justify-between items-center text-gray-300">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <span>jane_doe</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaExclamationTriangle className="text-yellow-500" />
                            <span>{mockReportDetails.reason}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-purple-500" />
                            <span>{mockReportDetails.dateReported}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-start space-x-6">
                        {/* Delete Reported Content Button */}
                        <button
                            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                            onClick={toggleDeleteModal}
                        >
                            Delete Reported Content
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isDeleteModalOpen && (
                <DeleteReportModal
                    eventDetails={mockReportDetails}
                    toggleModal={toggleDeleteModal}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default ReportDetails;
