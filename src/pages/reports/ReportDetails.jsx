import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaExclamationTriangle, FaCalendarAlt } from 'react-icons/fa';
// import EditReportModal from './EditReportModal';
import DeleteReportModal from '../../components/reports/DeleteReportModal';
const mockReportDetails = {
    id: 'R001',
    reportType: 'User', // Can be 'User', 'Event', or 'Item'
    reporterName: 'John Doe',
    reporterEmail: 'john.doe@example.com',
    reason: 'Inappropriate content',
    status: 'Pending', // Could be 'Pending', 'Resolved', 'Rejected'
    dateReported: '2024-11-10',
};

const ReportDetails = () => {
    const { reportId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const handleSave = (updatedReason) => {
        console.log('Report reason updated to:', updatedReason);
        toggleEditModal();
    };

    const handleDelete = () => {
        console.log('Report deleted!');
        toggleDeleteModal();
    };

    return (
        <div className="h-full w-full bg-[#001229] text-white flex flex-col items-center px-4 py-8 overflow-y-auto">
            <div className="w-full bg-gray-800 text-gray-200 rounded-lg shadow-lg">
                <div className="p-6 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white">Report #{mockReportDetails.id}</h2>
                    <p className="text-lg md:text-xl text-gray-400">{`Report Type: ${mockReportDetails.reportType}`}</p>

                    <div className="space-y-4">
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Reported By:</strong> {mockReportDetails.reporterName} ({mockReportDetails.reporterEmail})
                        </div>
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Reason:</strong> {mockReportDetails.reason}
                        </div>
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Status: </strong>
                            <span className={`font-semibold ${mockReportDetails.status === 'Resolved' ? 'text-green-500' : mockReportDetails.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                                {mockReportDetails.status}
                            </span>
                        </div>
                        <div className="text-lg text-gray-300">
                            <strong className="text-gray-500">Date Reported:</strong> {mockReportDetails.dateReported}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center text-gray-300">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <span>{mockReportDetails.reporterName}</span>
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
                         {/* Delete Button */}
                         <button
                            className="bg-gray-700 text-gray-200 px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                            // onClick={toggleEditModal}
                        >
                            View Reported Event
                                                    </button>
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
            {/* {isEditModalOpen && (
                <EditReportModal
                    eventDetails={mockReportDetails}
                    toggleModal={toggleEditModal}
                    handleSave={handleSave}
                />
            )} */}
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
