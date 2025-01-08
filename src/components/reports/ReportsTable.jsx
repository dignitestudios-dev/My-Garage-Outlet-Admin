import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import Loader from "../global/Loader";

const ReportsTable = () => {
  const [selectedReports, setSelectedReports] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState("all");
  const [filteredReports, setFilteredReports] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/report/viewAllReports?type=${reportType}&search=&page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFilteredReports(res?.data?.data);
      setPagination(res?.data?.pagination);
    } catch (error) {
      console.log("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [reportType, page]);

  const toggleSelectReport = (reportId) => {
    const newSelectedReports = new Set(selectedReports);
    if (newSelectedReports.has(reportId)) {
      newSelectedReports.delete(reportId);
    } else {
      newSelectedReports.add(reportId);
    }
    setSelectedReports(newSelectedReports);
  };

  const toggleSelectAll = () => {
    if (selectedReports.size === filteredReports.length) {
      setSelectedReports(new Set());
    } else {
      const allReportIds = filteredReports.map((report) => report?.reportID);
      setSelectedReports(new Set(allReportIds));
    }
  };

  const handleEdit = (reportId, reportDetails) => {
    navigate(`/report-details/${reportId}`, {
      state: { report: reportDetails },
    });
  };

  const handleDelete = async (reportId) => {
    setDeleting(true);
    try {
      await axios.delete(
        `${BASE_URL}/admin/report/deleteSingleReport/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReports();
      toast.success("Report deleted successfully");
    } catch (error) {
      toast.error("Error deleting report");
      console.log("Error deleting report:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    const reportIdsToDelete = Array.from(selectedReports);
    setDeleting(true);
    try {
      await axios.post(
        `${BASE_URL}/admin/report/deleteMultipleReports`,
        { reportIDs: reportIdsToDelete },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReports();
      setSelectedReports(new Set());
      setShowModal(false);
      toast.success("Reports deleted successfully");
    } catch (error) {
      toast.error("Error deleting reports");
      console.log("Error deleting reports:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteReports = async () => {
    if (selectedReports.size === 1) {
      await handleDelete(Array.from(selectedReports)[0]);
      setShowModal(false);
    } else {
      await handleBulkDelete();
      setShowModal(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Filter input */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-100">Reports</h2>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl w-md p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="all" className="bg-gray-800 text-white">
              All Types
            </option>
            <option value="user" className="bg-gray-800 text-white">
              User
            </option>
            <option value="event" className="bg-gray-800 text-white">
              Event
            </option>
            <option value="item" className="bg-gray-800 text-white">
              Item
            </option>
            <option value="comment" className="bg-gray-800 text-white">
              Reported Comments
            </option>
          </select>
        </div>
      </div>

      {/* Delete Button for selected reports */}
      {selectedReports.size > 0 && (
        <div className="mb-4 flex justify-end items-center">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center bg-gray-800 bg-opacity-50 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl py-2 px-4 text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-300"
          >
            <MdDelete size={20} />
            <span className="ml-2">Delete Selected</span>
          </button>
        </div>
      )}

      {/* Reports Table */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredReports?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedReports.size == filteredReports.length}
                        onChange={toggleSelectAll}
                        className="form-checkbox text-blue-600"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Report Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Edit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {filteredReports?.map((report) => (
                    <motion.tr
                      key={report?.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <input
                          type="checkbox"
                          checked={selectedReports.has(report?.reportID)}
                          onChange={() => toggleSelectReport(report?.reportID)}
                          className="form-checkbox text-blue-600"
                        /> */}
                        <input
                          type="checkbox"
                          checked={selectedReports.has(report?.reportID)}
                          onChange={() => toggleSelectReport(report?.reportID)}
                          className="form-checkbox text-blue-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {report?.type === "comment"
                          ? "Comment"
                          : report?.type === "user"
                          ? "User"
                          : "Event"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {report?.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {report?.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          className="text-white mr-2"
                          onClick={() => handleEdit(report?.reportID, report)}
                        >
                          <AiFillEdit size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full py-10">
              <h2 className="text-center text-sm text-gray-400">
                No Reports Found
              </h2>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={pagination?.currentPage <= 1}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-white">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={
            pagination?.currentPage === pagination?.totalPages ||
            pagination?.totalPages === 0
          }
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirmDelete={handleDeleteReports}
        deleting={deleting}
      />
    </motion.div>
  );
};

export default ReportsTable;
