import { useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { FaCheck, FaCheckCircle, FaTrashAlt } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

// Sample event data (with price and seller information added)
const eventData = [
  { 
    id: 1, 
    name: "Leather keychains custom", 
    price: "299$", 
    participants: "10", 
    sellerName: "Seller A", 
    sellerEmail: "sellerA@example.com", 
    createdAt: "2024-10-01",
    image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  // Leather Phone Case
  },
  { 
    id: 2, 
    name: "Vintage leather bag", 
    price: "499$", 
    participants: "20", 
    sellerName: "Seller B", 
    sellerEmail: "sellerB@example.com", 
    createdAt: "2024-11-01",
    image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  // Leather Phone Case
  },
  { 
    id: 3, 
    name: "Handmade leather wallet", 
    price: "199$", 
    participants: "30", 
    sellerName: "Seller C", 
    sellerEmail: "sellerC@example.com", 
    createdAt: "2024-09-15",
    image: "https://images.pexels.com/photos/3159948/pexels-photo-3159948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  // Leather Wallet
  },
  { 
    id: 4, 
    name: "Personalized leather belt", 
    price: "349$", 
    participants: "40", 
    sellerName: "Seller D", 
    sellerEmail: "sellerD@example.com", 
    createdAt: "2024-07-20",
    image: "https://images.pexels.com/photos/3159949/pexels-photo-3159949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  // Leather Belt
  },
  { 
    id: 5, 
    name: "Leather phone case", 
    price: "149$", 
    participants: "50", 
    sellerName: "Seller E", 
    sellerEmail: "sellerE@example.com", 
    createdAt: "2024-10-05",
    image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  // Leather Phone Case
  },
];



const ItemsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(eventData);
  const [selectedItems, setSelectedItems] = useState(new Set()); // Track selected items
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 20; // Display 20 items per page
  const [dateFilter, setDateFilter] = useState("all"); // Current date filter
  const navigate = useNavigate();

  // Handle individual item selection
  const toggleSelectItem = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = eventData.filter(
      (item) =>
        item.name.toLowerCase().includes(term) || item.sellerEmail.toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Handle view item details
  const handleViewDetails = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    const remainingItems = eventData.filter((item) => !selectedItems.has(item.id));
    setFilteredItems(remainingItems);
    setSelectedItems(new Set());
    setShowModal(false); // Close modal after deletion
  };

  const filterByDateRange = (range) => {
    setDateFilter(range);
    const now = new Date();
    let filtered = [...eventData];

    switch (range) {
      case "thisWeek":
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); 
        filtered = eventData.filter((item) => new Date(item.createdAt) >= startOfWeek);
        break;
      case "lastMonth":
        const startOfLastMonth = new Date(now.setMonth(now.getMonth() - 1));
        filtered = eventData.filter((item) => new Date(item.createdAt) >= startOfLastMonth);
        break;
      case "thisYear":
        const startOfYear = new Date(now.setMonth(0, 1)); 
        filtered = eventData.filter((item) => new Date(item.createdAt) >= startOfYear);
        break;
      case "recentlyCreated":
        filtered = eventData.filter((item) => new Date(item.createdAt) >= new Date(now.setDate(now.getDate() - 7))); 
        break;
      case "all":
      default:
        break; 
    }

    setFilteredItems(filtered);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage); 
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); 

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
        <h2 className="text-xl font-semibold text-gray-100">ITEMS</h2>
        <div className="relative w-full md:w-1/5 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 bg-opacity-5 border border-gray-700 backdrop-blur-md shadow-lg rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <CiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
        <button
          onClick={() => filterByDateRange("all")}
          className={`px-4 py-2 rounded-lg ${dateFilter === "all" ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white" : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"}`}
        >
          All Items
        </button>
        <button
          onClick={() => filterByDateRange("recentlyCreated")}
          className={`px-4 py-2 rounded-lg ${dateFilter === "recentlyCreated" ? "bg-gradient-to-r from-[#EF1C68] to-gray-900 text-white" : "bg-gray-800 text-white hover:bg-gradient-to-r from-[#EF1C68]"}`}
        >
          Recently Created
        </button>
        <button
          onClick={() => filterByDateRange("lastMonth")}
          className={`px-4 py-2 rounded-lg ${dateFilter === "lastMonth" ? "bg-gradient-to-r from-[#EF1C68] to-gray-900 text-white" : "bg-gray-800 text-white hover:bg-gradient-to-r from-[#EF1C68]"}`}
        >
          Last Month
        </button>
        <button
          onClick={() => filterByDateRange("thisWeek")}
          className={`px-4 py-2 rounded-lg ${dateFilter === "thisWeek" ? "bg-gradient-to-r from-[#EF1C68] to-gray-900 text-white" : "bg-gray-800 text-white hover:bg-gradient-to-r from-[#EF1C68]"}`}
        >
          This Week
        </button>
        <button
          onClick={() => filterByDateRange("thisYear")}
          className={`px-4 py-2 rounded-lg ${dateFilter === "thisYear" ? "bg-gradient-to-r from-[#EF1C68] to-gray-900 text-white" : "bg-gray-800 text-white hover:bg-gradient-to-r from-[#EF1C68]"}`}
        >
          This Year
        </button>
      </div>


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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-40 w-full bg-gray-200 rounded-lg mb-4">
              <img
                src={`${item.image}`}
                // alt={`${item.name}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            <div className="text-lg font-semibold text-white mb-1">{item.name}</div>
            <div className="text-sm text-white mb-2">Seller: {item.sellerName}</div>
            <div className="text-2xl font-bold text-white mb-4">{item.price}</div>

            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => handleViewDetails(item.id)}
                className="px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 text-white font-semibold rounded-md hover:bg-[#EF1C68] transition"
                >
                View Details
              </button>

              <button
                onClick={() => toggleSelectItem(item.id)}
                className={`p-2 rounded-lg shadow-md transition-colors duration-300 ${
                  selectedItems.has(item.id)
                    ? "text-[#EF1C68] bg-blue-200 hover:bg-blue-300"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {selectedItems.has(item.id) ? (
                  <FaCheckCircle size={20} />
                ) : (
                  <FaCheck size={20} />
                )}
              </button>
            </div>
          </motion.div>
        ))}
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

export default ItemsTable;
