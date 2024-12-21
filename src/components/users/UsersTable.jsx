import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import Loader from "../global/Loader";

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");

  const fetchUsers = async () => {
    const token = Cookies.get("token");
    setLoading(true);

    try {
      const res = await axios.get(
        `${BASE_URL}/admin/user/viewAllUsers?search=&time=${dateFilter}&page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFilteredUsers(res?.data?.data);
      setPagination(res?.data?.pagination);
    } catch (error) {
      console.log("err while fetching users >>>", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, dateFilter, searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(filteredUsers);
    }
  }, [searchTerm, filteredUsers]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(
        filteredUsers.filter((user) =>
          user.name.toLowerCase().includes(searchTerm)
        )
      );
    }
  }, [searchTerm, filteredUsers]);

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
      const allUserIds = filteredUsers.map((user) => user.userID);
      setSelectedUsers(new Set(allUserIds));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleEdit = (userId) => {
    navigate(`/user-info/${userId}`);
  };

  const handleDelete = async () => {
    const token = Cookies.get("token");
    try {
      await axios.delete(
        `${BASE_URL}/admin/user/deleteSingleUser/${
          Array.from(selectedUsers)[0]
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User deleted successfully");
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      console.log("Error deleting user", error?.response?.data);
      toast.error("An error occurred while deleting user");
    }
  };

  const handleBulkDelete = async () => {
    const token = Cookies.get("token");
    const userIdsToDelete = Array.from(selectedUsers);

    try {
      await axios.post(
        `${BASE_URL}/admin/user/deleteMultipleUsers`,
        { userIDs: userIdsToDelete },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
      setSelectedUsers(new Set());
      setShowModal(false);
      toast.success("Users deleted succesfully");
    } catch (error) {
      console.log("Error deleting users", error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteUsers = async () => {
    if (Array.from(selectedUsers)?.length > 1) {
      await handleBulkDelete();
    } else {
      await handleDelete();
    }
  };

  const cancelDelete = () => {
    setSelectedUsers(new Set());
    setShowModal(false);
  };

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Filter and Search UI */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4 sm:mb-0">
          Users
        </h2>
        <div className="relative w-full sm:w-1/5">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 bg-opacity-50 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <CiSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
        {["all", "recently joined", "last month", "this week", "this year"].map(
          (filterValue) => (
            <button
              key={filterValue}
              onClick={() => setDateFilter(filterValue)}
              className={`px-4 py-2 text-sm ${
                dateFilter === filterValue
                  ? "bg-gray-600 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white"
                  : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"
              } rounded-md w-full sm:w-auto`}
            >
              {filterValue === "all"
                ? "All"
                : filterValue === "recently joined"
                ? "Recent"
                : filterValue
                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
            </button>
          )
        )}
      </div>

      {/* Show delete button if at least one user is selected */}
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

      {/* Users Table */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredUsers?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedUsers?.size === filteredUsers?.length}
                        onChange={toggleSelectAll}
                        className="form-checkbox text-blue-600"
                      />
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Subscriber
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Account Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Edit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {filteredUsers?.map((user) => (
                    <motion.tr
                      key={user.userID}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user?.userID)}
                          onChange={() => toggleSelectUser(user?.userID)}
                          className="form-checkbox text-blue-600"
                        />
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              src={user?.profilePicture}
                              alt={user?.name}
                              className="h-10 w-10 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">
                              {user?.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user?.isSubscriptionPaid
                              ? "bg-green-800 text-green-100"
                              : "bg-red-800 text-red-100"
                          }`}
                        >
                          {user?.isSubscriptionPaid
                            ? "Subscribed"
                            : "Unsubscribed"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user?.isLocked
                              ? "bg-red-800 text-red-100"
                              : "bg-green-800 text-green-100"
                          }`}
                        >
                          {user?.isLocked ? "Suspended" : "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          className="text-white mr-2"
                          onClick={() => handleEdit(user?.userID)}
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
            <div className="w-full py-4">
              <h2>No Users</h2>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={pagination?.currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-white">
          Page {pagination?.currentPage} of{" "}
          {pagination?.totalPages === 0
            ? pagination?.totalPages + 1
            : pagination?.totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={pagination?.currentPage === pagination?.totalPages}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for confirming bulk delete */}
      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={cancelDelete}
        onConfirmDelete={handleDeleteUsers}
      />
    </motion.div>
  );
};

export default UsersTable;
