  import { useState } from "react";
  import { motion } from "framer-motion";
  import { CiSearch } from "react-icons/ci";
  import { MdDelete } from "react-icons/md";
  import { FaEye, FaCheck, FaCheckCircle } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import DeleteConfirmationModal from "./DeleteConfirmationModal";

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


  const EventsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEvents, setFilteredEvents] = useState(eventData);
    const [selectedEvents, setSelectedEvents] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState("all");
    const itemsPerPage = 20;
    const navigate = useNavigate();

    const filterByDateRange = (range) => {
      const now = new Date();
      let filtered;

      switch (range) {
        case "recent":
          filtered = eventData.filter(event => {
            const eventDate = new Date(event.createdAt);
            return (now - eventDate) <= 24 * 60 * 60 * 1000;
          });
          break;
        case "last-month":
          filtered = eventData.filter(event => {
            const eventDate = new Date(event.createdAt);
            return (now.getFullYear() === eventDate.getFullYear() &&
              now.getMonth() === eventDate.getMonth());
          });
          break;
        case "this-week":
          filtered = eventData.filter(event => {
            const eventDate = new Date(event.createdAt);
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); 
            return eventDate >= startOfWeek;
          });
          break;
        case "this-year":
          filtered = eventData.filter(event => {
            const eventDate = new Date(event.createdAt);
            return eventDate.getFullYear() === now.getFullYear();
          });
          break;
        case "all":
        default:
          filtered = eventData; 
      }

      setFilteredEvents(filtered);
      setCurrentPage(1);
      setActiveFilter(range); // Update active filter
    };

    const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      const filtered = eventData.filter(
        (event) =>
          event.name.toLowerCase().includes(term) || event.email.toLowerCase().includes(term)
      );
      setFilteredEvents(filtered);
      setCurrentPage(1); 
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      }
    };

    const handleConfirmDelete = () => {
      const remainingEvents = eventData.filter(event => !selectedEvents.has(event.id));
      setFilteredEvents(remainingEvents);  // Update the filtered events after deletion
      setShowModal(false);  // Close the modal
      setSelectedEvents(new Set());  // Reset the selection state
    };
    

    const toggleSelectEvent = (id) => {
      setSelectedEvents((prevSelected) => {
        const newSelectedEvents = new Set(prevSelected);
        if (newSelectedEvents.has(id)) {
          newSelectedEvents.delete(id);  // Unselect the event if already selected
        } else {
          newSelectedEvents.add(id);  // Select the event
        }
        return newSelectedEvents;
      });
    };
    
    return (
      <motion.div className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Events Management</h2>
          <div className="relative w-full sm:w-1/5 mt-4 sm:mt-0">
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
        {["all", "recent", "last-month", "this-week", "this-year"].map((filter) => (
          <button
            key={filter}
            onClick={() => filterByDateRange(filter)}
            className={`px-4 py-2 mb-2 rounded-lg transition-colors duration-300 ${
              activeFilter === filter ? "bg-gradient-to-r from-[#EF1C68] text-white" : "bg-gray-800 text-white hover:bg-gradient-to-r from-[#EF1C68]"
            }`}
          >
            {filter === "recent" && "Recently Created"}
            {filter === "last-month" && "Last Month"}
            {filter === "this-week" && "This Week"}
            {filter === "this-year" && "This Year"}
            {filter === "all" && "All Events"}
          </button>
        ))}
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


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentEvents.map((event) => (
           <motion.div
           key={event.id}
           className="bg-[#1A293D] p-6 rounded-lg shadow-lg relative hover:scale-105 transform transition-all duration-300"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.3 }}
         >
           <div className="w-full h-48 overflow-hidden rounded-lg shadow-md">
             <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
           </div>
         
           <div className="flex justify-between mt-4 text-white">
             <div className="flex flex-col">
               <h3 className="text-xl font-semibold">{event.name}</h3>
               <p className="text-sm">{event.email}</p>
               <p className="text-sm">{event.participants} Participants</p>
               <p className="text-sm">{event.date}</p>
             </div>
             <div className="flex flex-col items-end">
               <p
                 className={`px-3 py-1 text-xs font-semibold rounded-full ${event.status === "Upcoming" ? "bg-green-600 text-green-100" : "bg-gray-600 text-gray-100"}`}
               >
                 {event.status}
               </p>
             </div>
           </div>
         
           <div className="flex items-center justify-between mt-4">
             <button
               onClick={() => navigate(`/event-details/${event.id}`)}
               className="px-4 py-2 bg-[#EF1C68] text-white font-semibold rounded-full hover:bg-[#EF1C68] transition"
             >
               View Details
             </button>
             <button
               onClick={() => toggleSelectEvent(event.id)}  // Toggles event selection
               className={`p-2 rounded-lg shadow-md transition-colors duration-300 ${selectedEvents.has(event.id) ? "text-[#EF1C68] bg-blue-200 hover:bg-blue-300" : "text-gray-300 hover:bg-gray-700"}`}
             >
               {selectedEvents.has(event.id) ? <FaCheckCircle size={20} /> : <FaCheck size={20} />}
             </button>
           </div>
         </motion.div>
         
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 disabled:bg-gray-600 transition"
          >
            Previous
          </button>
          <div className="text-white">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 disabled:bg-gray-600 transition"
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
