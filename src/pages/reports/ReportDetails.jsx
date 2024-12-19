import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaUser,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
import DeleteReportModal from "../../components/reports/DeleteReportModal";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../../components/global/Loader";

const mockReportDetails = {
  id: "R001",
  reportType: "User", // Can be 'User', 'Event', or 'Item'
  reporterName: "John Doe",
  reporterEmail: "john.doe@example.com",
  reason: "Inappropriate content",
  // status: 'Pending', // Could be 'Pending', 'Resolved', 'Rejected'
  dateReported: "2024-11-10",
  reportedUsername: "jane_doe", // Mock username for the reported user
};

const ReportDetails = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [reportDetails, setReportDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(location?.state?.report);
  const token = Cookies.get("token");

  const fetchReportDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/report/viewReportDetails/${location?.state?.report?.type}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("report details >>>", res?.data?.data);
      setReportDetails(res?.data?.data);
    } catch (error) {
      // console.log("err while fetching report details >>>", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportDetails();
  }, []);

  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const handleDelete = () => {
    console.log("Report deleted!");
    toggleDeleteModal();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-full w-full bg-[#001229] text-white flex flex-col items-center px-6 py-10 overflow-y-auto">
      <div className="w-full max-w-4xl bg-gray-800 text-gray-200 rounded-lg shadow-lg">
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Report Details
          </h2>
          <p className="text-lg text-gray-400">{`Report Type: ${reportDetails?.entityType}`}</p>

          <div className="space-y-6 mt-4">
            <div className="text-lg text-gray-300">
              <strong className="text-gray-500">Reported By:</strong>{" "}
              {reportDetails?.reporterName}
            </div>

            <div className="flex items-center justify-between space-x-4 text-lg text-gray-300">
              <div>
                <strong className="text-gray-500">Reported User:</strong>{" "}
                {reportDetails?.reportedUserName}
              </div>
              {/* View Button as Link */}
              <Link
                to={
                  reportDetails?.entityType === "user"
                    ? `/user-info/${reportDetails.entityID}`
                    : `/event-details/${mockReportDetails.id}`
                }
                className="flex items-center text-blue-500 hover:text-blue-700 font-semibold"
              >
                <FaEye className="mr-2" />
                View
              </Link>
            </div>

            <div className="text-lg text-gray-300">
              <strong className="text-gray-500">Reason:</strong>{" "}
              {reportDetails?.reason}
            </div>

            <div className="text-lg text-gray-300">
              <strong className="text-gray-500">Date Reported:</strong>{" "}
              {reportDetails?.date}
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg flex justify-between items-center text-gray-300">
            <div className="flex items-center space-x-2">
              <FaUser className="text-blue-500" />
              <span>{reportDetails?.reporterName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaExclamationTriangle className="text-yellow-500" />
              <span>{reportDetails?.reason}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-purple-500" />
              <span>{reportDetails?.date}</span>
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
