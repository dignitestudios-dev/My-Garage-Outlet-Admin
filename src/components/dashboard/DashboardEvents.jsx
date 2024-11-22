import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Sample event data
const eventData = [
  { 
      id: 1, 
      name: "New Event", 
      email: "john@example.com", 
      participants: "10", 
      date: "2024-11-12", 
      createdAt: "2024-10-15", 
      status: "Upcoming", 
      image: "https://images.pexels.com/photos/1181401/pexels-photo-1181401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  { 
      id: 2, 
      name: "New Event 1", 
      email: "jane@example.com", 
      participants: "20", 
      date: "2024-12-04", 
      createdAt: "2024-11-05", 
      status: "Completed", 
      image: "https://images.pexels.com/photos/1034664/pexels-photo-1034664.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  { 
      id: 3, 
      name: "New Event 2", 
      email: "bob@example.com", 
      participants: "30", 
      date: "2024-12-10", 
      createdAt: "2024-11-10", 
      status: "Upcoming", 
      image: "https://images.pexels.com/photos/3199829/pexels-photo-3199829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  { 
      id: 4, 
      name: "New Event 3", 
      email: "alice@example.com", 
      participants: "40", 
      date: "2024-12-15", 
      createdAt: "2024-11-11", 
      status: "Upcoming", 
      image: "https://images.pexels.com/photos/1300467/pexels-photo-1300467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  { 
      id: 5, 
      name: "New Event 4", 
      email: "eve@example.com", 
      participants: "25", 
      date: "2024-12-20", 
      createdAt: "2024-11-14", 
      status: "Upcoming", 
      image: "https://images.pexels.com/photos/2161601/pexels-photo-2161601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  { 
      id: 6, 
      name: "New Event 5", 
      email: "mike@example.com", 
      participants: "50", 
      date: "2024-12-25", 
      createdAt: "2024-11-18", 
      status: "Upcoming", 
      image: "https://images.pexels.com/photos/1081074/pexels-photo-1081074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
];

const DashboardEvents = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 8; 
  const navigate = useNavigate();

  const totalPages = Math.ceil(eventData.length / eventsPerPage);

  const currentEvents = eventData.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage);

  const handleViewDetails = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  const handleSeeAll = () => {
    navigate("/events");
  };

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-auto flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header with Events Heading and See All Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">Events</h2>

        {/* Moving See All Button to the right of the header */}
        <button
          onClick={handleSeeAll}
          className="ml-auto px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 text-white text-sm font-semibold rounded-full transition-colors"
        >
          See All
        </button>
      </div>

      {/* Horizontal Card Slider */}
      <motion.div
         className="relative flex gap-8 pb-6 flex-nowrap hide-scrollbar overflow-x-auto lg:w-[1150px]"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.2 }}
      >
        {currentEvents.map((event) => (
          <motion.div
            key={event.id}
            className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 shadow-lg rounded-xl p-4 w-64 flex-shrink-0 relative transform transition-all duration-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Event Image at the left */}
            <div className="h-40 w-full rounded-t-xl overflow-hidden mb-4">
              <img
                src={event.image}
                alt={`Image for ${event.name}`}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Event Info */}
            <div className="text-lg font-semibold text-gray-100">{event.name}</div>
            <div className="text-sm text-gray-400">{event.email}</div>
            <div className="mt-1 text-sm text-gray-300">{event.participants} Participants</div>
            <div className="mt-1 text-sm text-gray-300">{event.date}</div>

            {/* Event Status */}
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span
                className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                  event.status === "Upcoming" ? "bg-green-700 text-green-100" : "bg-gray-600 text-gray-100"
                }`}
              >
                {event.status}
              </span>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => handleViewDetails(event.id)}
              className="mt-4 px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DashboardEvents;
