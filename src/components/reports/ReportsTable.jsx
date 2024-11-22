import { useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal component

const reportData = [
  { id: 1, type: "User", name: "John Doe", email: "john@example.com", reason: "Inappropriate profile content", date: "12 Nov" },
  { id: 2, type: "Event", name: "Boat Racing", email: "jane@example.com", reason: "Offensive event description", date: "4 Dec" },
  { id: 3, type: "Item", name: "Bob Johnson", email: "bob@example.com", reason: "Harassment", date: "10 Dec" },
  { id: 4, type: "Event", name: "Beach Party", email: "alice@example.com", reason: "Violates community guidelines", date: "17 Dec" },
  { id: 5, type: "Item", name: "Charlie Wilson", email: "charlie@example.com", reason: "Spam activity", date: "18 Dec" },
  { id: 6, type: "Reported Comment", name: "Anna Smith", email: "anna@example.com", reason: "Offensive comment on post #123", date: "19 Nov" },
  { id: 7, type: "Reported Comment", name: "Mark Lee", email: "mark@example.com", reason: "Hateful comment about community event", date: "25 Nov" },
  { id: 8, type: "Reported Comment", name: "Sarah Brown", email: "sarah@example.com", reason: "Spammy comment promoting fake product", date: "30 Nov" },
];

const ReportsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(""); 
  const [filteredReports, setFilteredReports] = useState(reportData);
  const [selectedReports, setSelectedReports] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 20; 
  const navigate = useNavigate();

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
      const allReportIds = filteredReports.map((report) => report.id);
      setSelectedReports(new Set(allReportIds));
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = reportData.filter(
      (report) =>
        report.name.toLowerCase().includes(term) ||
        report.email.toLowerCase().includes(term) ||
        report.reason.toLowerCase().includes(term)
    );
    setFilteredReports(filtered);
    setCurrentPage(1); 
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    filterReports(e.target.value);
  };

  const filterReports = (type) => {
    let filtered = reportData;

    // Apply type filter (User, Item, Event, Reported Comment)
    if (type && type !== "Reported Comment") {
      filtered = filtered.filter((report) => report.type === type);
    }

    // Apply filter for "Reported Comment"
    if (type === "Reported Comment") {
      filtered = filtered.filter((report) => report.type === "Reported Comment");
    }

    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to the first page after filter change
  };

  // Handle editing
  const handleEdit = (reportId) => {
    navigate(`/report-details`);
  };

  const handleBulkDelete = () => {
    const remainingReports = reportData.filter((report) => !selectedReports.has(report.id));
    setFilteredReports(remainingReports);
    setSelectedReports(new Set());
    setShowModal(false); 
  };

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage); 
  const currentItems = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); 

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-100">Reports</h2>

          <select
            value={filterType}
            onChange={handleFilterChange}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl w-md p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="" className="bg-gray-800 text-white">All Types</option>
            <option value="User" className="bg-gray-800 text-white">User</option>
            <option value="Event" className="bg-gray-800 text-white">Event</option>
            <option value="Item" className="bg-gray-800 text-white">Item</option>
            <option value="Reported Comment" className="bg-gray-800 text-white">Reported Comments</option>
          </select>
        </div>

        <div className="relative ml-auto w-1/5">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 bg-opacity-50 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <CiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedReports.size === filteredReports.length}
                  onChange={toggleSelectAll}
                  className="form-checkbox text-blue-600"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Report Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Edit</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {currentItems.map((report) => (
              <motion.tr
                key={report.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedReports.has(report.id)}
                    onChange={() => toggleSelectReport(report.id)}
                    className="form-checkbox text-blue-600"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-white mr-2"
                    onClick={() => handleEdit(report.id)}
                  >
                    <AiFillEdit size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirmDelete={handleBulkDelete}
      />
    </motion.div>
  );
};

export default ReportsTable;
