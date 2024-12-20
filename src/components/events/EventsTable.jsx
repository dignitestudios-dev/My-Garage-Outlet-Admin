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
import moment from "moment";
import Loader from "../global/Loader";

const EventsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const DateFormat = () => {
    const formattedDate = moment().format("YYYY-MM-DD");

    return formattedDate;
  };

  const fetchEvents = async () => {
    const token = Cookies.get("token");
    setLoading(true);

    try {
      const res = await axios.get(
        `${BASE_URL}/admin/event/viewAllEvents?search=&page=${currentPage}&limit=10`,
        {
          // params: {
          //   time: dateFilter,
          //   page: currentPage,
          //   limit: 10,
          //   search: searchTerm,
          // },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFilteredEvents(res?.data?.data);
      setPagination(res?.data?.pagination);
    } catch (error) {
      console.error("Error fetching events:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage, searchTerm, dateFilter]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = filteredEvents.filter(
        (event) =>
          event?.title.toLowerCase().includes(searchTerm) ||
          event?.creatorName.toLowerCase().includes(searchTerm)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(filteredEvents);
    }
  }, [searchTerm, filteredEvents]);

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
            onChange={(e) => setSearchTerm(e.target.value)}
            // onChange={handleSearch}
          />
          <CiSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
        {["all", "recently joined", "last month", "this week", "this year"].map(
          (filterValue) => (
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
                : filterValue === "recently joined"
                ? "Recent"
                : filterValue
                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
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
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredEvents?.length > 0 ? (
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
                      <p className="text-sm">
                        {event?.joinedCount} Participants
                      </p>
                      <p className="text-sm">
                        {DateFormat() > event?.date ? "Completed" : "Upcoming"}
                      </p>
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
                      onClick={() =>
                        navigate(`/event-details/${event?.eventID}`)
                      }
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
          ) : (
            <div className="w-full py-4 text-center">
              <h2 className="text-gray-300">No Events</h2>
            </div>
          )}
        </>
      )}

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
