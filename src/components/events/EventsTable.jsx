import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const EventsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/event/viewAllEvents?time=${dateFilter}&page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data?.data);
      setFilteredEvents(res?.data?.data);
      setPagination(res?.data?.pagination);
    } catch (error) {
      console.log("Error fetching events:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage, searchTerm, dateFilter]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = filteredEvents.filter(
      (event) =>
        event?.title.toLowerCase().includes(term) ||
        event?.creatorName.toLowerCase().includes(term)
    );
    setFilteredEvents(filtered);
  };

  const handleConfirmDelete = () => {
    const remainingEvents = filteredEvents.filter(
      (event) => !selectedEvents.has(event.id)
    );
    setFilteredEvents(remainingEvents);
    setShowModal(false);
    setSelectedEvents(new Set());
  };

  const toggleSelectEvent = (id) => {
    setSelectedEvents((prevSelected) => {
      const newSelectedEvents = new Set(prevSelected);
      if (newSelectedEvents.has(id)) {
        newSelectedEvents.delete(id);
      } else {
        newSelectedEvents.add(id);
      }
      return newSelectedEvents;
    });
  };

  return (
    <motion.div className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          Events Management
        </h2>
        <div className="relative w-full sm:w-1/5 mt-4 sm:mt-0">
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

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
        {["all", "recentEvents", "lastMonth", "thisWeek", "thisYear"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-4 py-2 mb-2 rounded-lg transition-colors duration-300 ${
                activeFilter === filter
                  ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white"
                  : "bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-700 text-white hover:bg-gray-800"
              }`}
            >
              {filter === "recentEvents" && "Recently Created"}
              {filter === "lastMonth" && "Last Month"}
              {filter === "thisWeek" && "This Week"}
              {filter === "thisYear" && "This Year"}
              {filter === "all" && "All"}
            </button>
          )
        )}
      </div>

      {selectedEvents.size > 0 && (
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

      {/* Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredEvents?.map((event) => (
          <motion.div
            key={event?.eventID}
            className="bg-gray-900 bg-opacity-50 border border-gray-700 p-6 rounded-lg shadow-lg relative hover:scale-105 transform transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-48 overflow-hidden rounded-lg shadow-md">
              <img
                src={event?.picture}
                alt={event?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between mt-4 text-white">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{event?.title}</h3>
                <p className="text-sm">{event?.creatorName}</p>
                <p className="text-sm">{event?.joinedCount} Participants</p>
                <p className="text-sm">{event?.date}</p>
              </div>
              <div className="flex flex-col items-end">
                <p
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    event?.isEnded
                      ? "bg-green-600 text-green-100"
                      : "bg-gray-600 text-gray-100"
                  }`}
                >
                  {event?.isEnded ? "Completed" : "Upcoming"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => navigate(`/event-details/${event?.eventID}`)}
                className="px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition"
              >
                View Details
              </button>
              <button
                onClick={() => toggleSelectEvent(event.eventID)}
                className={`p-2 rounded-lg shadow-md transition-colors duration-300 ${
                  selectedEvents.has(event.eventID)
                    ? "text-white black bg-gray-700"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                {selectedEvents.has(event.eventID) ? (
                  <FaCheckCircle size={20} />
                ) : (
                  <FaCheck size={20} />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={pagination?.currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 disabled:bg-gray-700 transition"
        >
          Previous
        </button>
        <div className="text-white">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={pagination?.currentPage === pagination?.totalPages}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 disabled:bg-gray-700 transition"
        >
          Next
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </motion.div>
  );
};

export default EventsTable;
