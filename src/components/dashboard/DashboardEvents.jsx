import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardEvents = ({ homeData }) => {
  const navigate = useNavigate();

  const DateFormat = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const scrollContainerRef = useRef(null);

  const handleViewDetails = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  const handleSeeAll = () => {
    navigate("/events");
  };

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const scrollLeft = scrollContainerRef.current.scrollLeft;

    const onMouseMove = (moveEvent) => {
      const distance = moveEvent.clientX - startX;
      scrollContainerRef.current.scrollLeft = scrollLeft - distance;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
          className="ml-auto px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 text-white text-sm font-semibold transition-colors"
        >
          See All
        </button>
      </div>

      {/* Horizontal Card Slider */}
      <motion.div
        ref={scrollContainerRef}
        className="relative flex gap-8 pb-6 flex-nowrap hide-scrollbar overflow-x-auto lg:w-[1150px] w-full"
        onMouseDown={handleMouseDown} // Listen for mouse down to initiate drag
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {homeData &&
          homeData?.events.map((event) => (
            <motion.div
              key={event.eventID}
              className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 shadow-lg rounded-xl p-4 w-64 flex-shrink-0 relative transform transition-all duration-300 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Event Image at the left */}
              <div className="h-40 w-full rounded-t-xl overflow-hidden mb-4">
                <img
                  src={event?.picture}
                  alt={`Image for ${event.name}`}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Event Info */}
              <div className="text-lg font-semibold text-gray-100">
                {event?.title}
              </div>
              <div className="text-sm text-gray-400">{event?.creatorName}</div>
              <div className="mt-1 text-sm text-gray-300">
                {event?.participants} Participants
              </div>
              <div className="mt-1 text-sm text-gray-300">{event?.date}</div>

              {/* Event Status */}
              <div className="mt-4 flex items-center justify-center space-x-2">
                <span
                  className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                    DateFormat() > event?.date
                      ? "bg-green-700 text-green-100"
                      : "bg-gray-600 text-gray-100"
                  }`}
                >
                  {DateFormat() > event?.date ? "Completed" : "Upcoming"}
                </span>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(event.eventID)}
                className="mt-4 px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition text-sm"
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
