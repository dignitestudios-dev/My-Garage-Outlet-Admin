import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    connections: 120,
    subscriber: "Subscribed",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    connections: 95,
    subscriber: "Not Subscribed",
    status: "Active",
  },
  {
    id: 11,
    name: "Bob Johnson",
    email: "bob@example.com",
    connections: 50,
    subscriber: "Subscribed",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    connections: 80,
    subscriber: "Not Subscribed",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    connections: 110,
    subscriber: "Subscribed",
    status: "Active",
  },
  {
    id: 6,
    name: "Eve White",
    email: "eve@example.com",
    connections: 85,
    subscriber: "Subscribed",
    status: "Active",
  },
  {
    id: 7,
    name: "Tom Black",
    email: "tom@example.com",
    connections: 65,
    subscriber: "Not Subscribed",
    status: "Inactive",
  },
  {
    id: 14,
    name: "Laura Green",
    email: "laura@example.com",
    connections: 75,
    subscriber: "Subscribed",
    status: "Active",
  },
  {
    id: 19,
    name: "Mike Blue",
    email: "mike@example.com",
    connections: 120,
    subscriber: "Not Subscribed",
    status: "Active",
  },
  {
    id: 12,
    name: "Sophia Gray",
    email: "sophia@example.com",
    connections: 100,
    subscriber: "Subscribed",
    status: "Active",
  },
];

const DashboardUsers = ({ homeData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 8;
  const usersPerPageMobile = 1;
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null); // Reference for the scroll container

  const currentUsers = userData.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  const handleEdit = (userId) => {
    navigate(`/user-info/${userId}`);
  };

  const handleSeeAll = () => {
    navigate("/users");
  };

  // Function to handle mouse drag scroll
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
      className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-100">Users</h2>
        </div>
        <button
          onClick={handleSeeAll}
          className="ml-auto px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 text-white text-sm font-semibold rounded-full transition-colors"
        >
          See All
        </button>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="relative flex gap-8 pb-6 flex-nowrap overflow-x-auto hide-scrollbar lg:w-[1150px] w-full"
        onMouseDown={handleMouseDown} // Listen for mouse down to initiate drag
      >
        {homeData &&
          homeData?.users?.map((user) => (
            <div
              key={user.userID}
              className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 shadow-lg rounded-xl p-4 w-64 sm:w-72 md:w-1/4 xl:w-1/5 flex-shrink-0 relative transform transition-all duration-300 text-center items-center"
            >
              <div className="h-20 w-20 bg-gray-500 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={user?.profilePicture}
                  alt={`${user.name}'s avatar`}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="text-lg font-semibold text-gray-100">
                {user.name}
              </div>
              {/* <div className="text-sm text-gray-400">{user.email}</div> */}
              <div className="mt-1 text-sm text-gray-300">
                {user.connectionsCount} Connections
              </div>

              <div className="mt-4 flex items-center justify-center space-x-2">
                <span
                  className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                    user.isSubscriptionPaid
                      ? "bg-green-700 text-green-100"
                      : "bg-red-700 text-red-100"
                  }`}
                >
                  {user.isSubscriptionPaid ? "Subscribed" : "Unsubscribed"}
                </span>
              </div>

              <button
                onClick={() => handleEdit(user.userID)}
                className="mt-4 px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition text-sm"
              >
                View Details
              </button>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default DashboardUsers;
