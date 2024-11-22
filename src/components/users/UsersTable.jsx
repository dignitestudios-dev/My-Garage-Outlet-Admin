import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

// Sample data
const userData = [
  { id: 1, name: "John Doe", email: "john@example.com", subscriber: "Yes", status: "Active", joinDate: "2024-10-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", subscriber: "No", status: "Active", joinDate: "2024-09-15" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", subscriber: "Yes", status: "Inactive", joinDate: "2024-08-20" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", subscriber: "No", status: "Active", joinDate: "2024-07-10" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", subscriber: "Yes", status: "Active", joinDate: "2024-11-05" },
  // More sample users...
];

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userData);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [filter, setFilter] = useState("all"); // Filter state ("all", "recent", "last-month", "this-week", "this-year")
  const itemsPerPage = 20; // Display 20 items per page
  const navigate = useNavigate();

  const toggleSelectUser = (userId) => {
    const newSelectedUsers = new Set(selectedUsers);
    if (newSelectedUsers.has(userId)) {
      newSelectedUsers.delete(userId);
    } else {
      newSelectedUsers.add(userId);
    }
    setSelectedUsers(newSelectedUsers);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      const allUserIds = filteredUsers.map(user => user.id);
      setSelectedUsers(new Set(allUserIds));
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = userData.filter(
      (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleEdit = (userId) => {
    navigate(`/user-info`);
  };

  const handleBulkDelete = () => {
    const remainingUsers = userData.filter(user => !selectedUsers.has(user.id));
    setFilteredUsers(remainingUsers);
    setSelectedUsers(new Set());
    setShowModal(false); // Close modal after deletion
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  // Filter logic based on the selected filter
  const filterUsers = () => {
    let filtered = userData;

    // Filter by date
    if (filter === "recent") {
      filtered = filtered.filter(user => {
        const today = new Date();
        const joinDate = new Date(user.joinDate);
        return joinDate > today.setDate(today.getDate() - 7); // Last 7 days
      });
    } else if (filter === "last-month") {
      filtered = filtered.filter(user => {
        const today = new Date();
        const joinDate = new Date(user.joinDate);
        return joinDate > today.setMonth(today.getMonth() - 1); // Last month
      });
    } else if (filter === "this-week") {
      filtered = filtered.filter(user => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of this week
        const joinDate = new Date(user.joinDate);
        return joinDate >= startOfWeek;
      });
    } else if (filter === "this-year") {
      filtered = filtered.filter(user => {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1); // Start of this year
        const joinDate = new Date(user.joinDate);
        return joinDate >= startOfYear;
      });
    }

    return filtered;
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage); // Calculate total pages
  const currentItems = filterUsers().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Get items for current page

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4 sm:mb-0">Users</h2>
        <div className="relative w-full sm:w-1/5">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 bg-opacity-50 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <CiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
  <button 
    onClick={() => handleFilterChange("all")} 
    className={`px-4 py-2 text-sm ${filter === "all" ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white" : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"} rounded-md w-full sm:w-auto`}>
    All
  </button>
  <button 
    onClick={() => handleFilterChange("recent")} 
    className={`px-4 py-2 text-sm ${filter === "recent" ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white" : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"} rounded-md w-full sm:w-auto`}>
    Recently Joined
  </button>
  <button 
    onClick={() => handleFilterChange("last-month")} 
    className={`px-4 py-2 text-sm ${filter === "last-month" ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white" : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"} rounded-md w-full sm:w-auto`}>
    Last Month
  </button>
  <button 
    onClick={() => handleFilterChange("this-week")} 
    className={`px-4 py-2 text-sm ${filter === "this-week" ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white" : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"} rounded-md w-full sm:w-auto`}>
    This Week
  </button>
  <button 
    onClick={() => handleFilterChange("this-year")} 
    className={`px-4 py-2 text-sm ${filter === "this-year" ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white" : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"} rounded-md w-full sm:w-auto`}>
    This Year
  </button>
</div>


      {selectedUsers.size > 0 && (
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
                  checked={selectedUsers.size === filteredUsers.length}
                  onChange={toggleSelectAll}
                  className="form-checkbox text-blue-600"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Subscriber
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {currentItems.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                    className="form-checkbox text-blue-600"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">{user.name}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.subscriber === "Yes" ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"
                  }`}>
                    {user.subscriber}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === "Active" ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"
                  }`}>
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-white mr-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    <AiFillEdit size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Include the modal here */}
      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirmDelete={handleBulkDelete}
      />
    </motion.div>
  );
};

export default UsersTable;
