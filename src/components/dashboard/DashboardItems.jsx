import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const eventData = [
  {
    id: 1,
    name: "Leather keychains custom",
    price: "299$",
    participants: "10",
    sellerName: "Seller A",
    sellerEmail: "sellerA@example.com",
    createdAt: "2024-10-01",
    image:
      "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Leather Phone Case
  },
  {
    id: 2,
    name: "Vintage leather bag",
    price: "499$",
    participants: "20",
    sellerName: "Seller B",
    sellerEmail: "sellerB@example.com",
    createdAt: "2024-11-01",
    image:
      "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Leather Phone Case
  },
  {
    id: 3,
    name: "Handmade leather wallet",
    price: "199$",
    participants: "30",
    sellerName: "Seller C",
    sellerEmail: "sellerC@example.com",
    createdAt: "2024-09-15",
    image:
      "https://images.pexels.com/photos/3159948/pexels-photo-3159948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Leather Wallet
  },
  {
    id: 4,
    name: "Personalized leather belt",
    price: "349$",
    participants: "40",
    sellerName: "Seller D",
    sellerEmail: "sellerD@example.com",
    createdAt: "2024-07-20",
    image:
      "https://images.pexels.com/photos/3159949/pexels-photo-3159949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Leather Belt
  },
  {
    id: 5,
    name: "Leather phone case",
    price: "149$",
    participants: "50",
    sellerName: "Seller E",
    sellerEmail: "sellerE@example.com",
    createdAt: "2024-10-05",
    image:
      "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Leather Phone Case
  },
];

const DashboardItemsTable = ({ homeData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const totalPages = Math.ceil(eventData.length / itemsPerPage);
  const currentItems = eventData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleViewDetails = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };

  const handleSeeAll = () => {
    navigate("/items");
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Items </h2>

        <button
          onClick={handleSeeAll}
          className="ml-auto px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 text-white text-sm font-semibold rounded-full"
        >
          See All
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative flex gap-8 pb-6 flex-nowrap overflow-x-auto hide-scrollbar lg:w-[1150px] w-full"
        onMouseDown={handleMouseDown} // Listen for mouse down to initiate drag
      >
        {" "}
        {homeData &&
          homeData?.items?.map((item) => (
            <div
              key={item.itemID}
              className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 shadow-lg rounded-xl p-4 w-64 flex-shrink-0 relative text-center"
            >
              <div className="h-40 w-full bg-gray-200 rounded-lg mb-4">
                <img
                  src={item?.picture}
                  alt={item?.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>

              <div className="text-lg font-semibold text-white mb-1">
                {item?.title}
              </div>
              <div className="text-sm text-white mb-2">
                Seller: {item?.creatorName}
              </div>
              {/* <div className="text-2xl font-bold text-white mb-4">{item.price}</div> */}

              <button
                onClick={() => handleViewDetails(item.itemID)}
                className="px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition"
              >
                View Details
              </button>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default DashboardItemsTable;
