import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
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

const DashboardItemsTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; 
  const navigate = useNavigate();

  const totalPages = Math.ceil(eventData.length / itemsPerPage);

  const currentItems = eventData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleViewDetails = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };

  const handleSeeAll = () => {
    navigate("/items"); 
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

        <button
          onClick={handleSeeAll}
          className="ml-auto px-4 py-2 bg-[#EF1C68] text-white text-sm font-semibold rounded-full hover:bg-[#EF1C68] transition-colors"
        >
          See All
        </button>
      </div>

      <motion.div
         className="relative flex overflow-x-auto gap-8 pb-6 flex-nowrap hide-scrollbar lg:w-[1150px]"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.2 }}
         drag="x" 
         dragConstraints={{ left: 0, right: 0 }} 
         dragElastic={0.1} 
      >
        {currentItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-[#1A293D] shadow-lg rounded-xl p-4 w-64 flex-shrink-0 relative transform transition-all duration-300 hover:scale-105 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-40 w-full bg-gray-200 rounded-lg mb-4">
              <img
                src={`${item.image}`}
                alt={`${item.name}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            <div className="text-lg font-semibold text-white mb-1">{item.name}</div>
            <div className="text-sm text-white mb-2">Seller: {item.sellerName}</div>
            <div className="text-2xl font-bold text-white mb-4">{item.price}</div>

            <button
              onClick={() => handleViewDetails(item.id)}
              className="px-4 py-2 bg-[#EF1C68] text-white font-semibold rounded-full hover:bg-[#EF1C68] transition"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </motion.div>

      
    </motion.div>
  );
};

export default DashboardItemsTable;
