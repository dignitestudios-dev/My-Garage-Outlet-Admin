import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Loader from "../global/Loader";
import { toast } from "react-toastify";

const ItemsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const navigate = useNavigate();
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/item/viewAllItems?search=&time=${dateFilter}&page=${page}&limit=12`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllItems(res?.data?.data);
      setFilteredItems(res?.data?.data);
      setPagination(res?.data?.pagination);
    } catch (error) {
      console.log("Error while fetching items >>>", error?.response?.data);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, dateFilter]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.creatorName.toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
  };

  const toggleSelectItem = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleBulkDelete = () => {
    const remainingItems = allItems.filter(
      (item) => !selectedItems.has(item.itemID)
    );
    setFilteredItems(remainingItems);
    setSelectedItems(new Set());
    setShowModal(false);
  };

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Items</h2>
        <div className="relative w-full md:w-1/5 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 bg-opacity-5 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <CiSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Date Filters */}
      <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
        {[
          "all",
          "recently created",
          "this week",
          "last month",
          "this year",
        ].map((filterValue) => (
          <button
            key={filterValue}
            onClick={() => setDateFilter(filterValue)}
            className={`px-4 py-2 text-sm ${
              dateFilter === filterValue
                ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white"
                : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"
            } rounded-md w-full sm:w-auto`}
          >
            {filterValue === "all"
              ? "All"
              : filterValue === "recently created"
              ? "Recent"
              : filterValue
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Delete Selected Items Button */}
      {selectedItems.size > 0 && (
        <div className="mb-4 flex justify-end items-center">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center bg-gray-800 bg-opacity-50 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl py-2 px-4 text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-300"
          >
            <MdDelete size={18} />
            <span className="ml-2">Delete Selected</span>
          </button>
        </div>
      )}

      {/* Items Grid */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredItems?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems?.map((item) => (
                <motion.div
                  key={item?.itemID}
                  className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg shadow-lg p-4 flex flex-col items-center text-center relative hover:scale-105 transform transition-all duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-40 w-full bg-gray-200 rounded-lg mb-4">
                    <img
                      src={`${item?.picture}`}
                      alt={`${item?.title}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>

                  <div className="text-lg font-semibold text-white mb-1">
                    {item?.title}
                  </div>
                  <div className="text-sm text-white mb-2">
                    Seller: {item?.creatorName}
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={() => navigate(`/item-details/${item?.itemID}`)}
                      className="px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => toggleSelectItem(item?.itemID)}
                      className={`p-2 rounded-lg shadow-md transition-colors duration-300 ${
                        selectedItems.has(item?.itemID)
                          ? "bg-gray-700 text-white"
                          : "hover:bg-gray-700 text-white"
                      }`}
                    >
                      {selectedItems.has(item?.itemID) ? (
                        <FaCheckCircle size={20} />
                      ) : (
                        <FaCheck size={20} />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full py-4 text-center">
              <h2 className="text-gray-400">No Items Found</h2>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={
            pagination?.totalPages === 1 || pagination?.currentPage === 1
          }
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
            pagination?.totalPages === 1 ||
            pagination?.totalPages === pagination?.currentPage
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
        onConfirmDelete={handleBulkDelete}
      />
    </motion.div>
  );
};

export default ItemsTable;
