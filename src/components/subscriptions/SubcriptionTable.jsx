import { useState } from "react";
import { motion } from "framer-motion";
import SubscriptionModal from "./SubscriptionModal"; // Import the modal component

// Sample subscription data
const subscriptionData = [
  { id: 1, name: "Free", price: "0", months: 1, features: ["Access to basic features"] },
  { id: 2, name: "Paid", price: "9.99", months: 12, features: ["Access to all features", "Priority support"] },
];

const SubscriptionTable = () => {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState(subscriptionData);
  const [editingSubscription, setEditingSubscription] = useState(null);

  const handleEdit = (subscriptionId) => {
    const subscription = subscriptionData.find((sub) => sub.id === subscriptionId);
    setEditingSubscription(subscription);
  };

  const handleSaveEdit = (updatedSubscription) => {
    const updatedSubscriptions = subscriptionData.map((sub) =>
      sub.id === updatedSubscription.id ? updatedSubscription : sub
    );
    setFilteredSubscriptions(updatedSubscriptions);
    setEditingSubscription(null); // Close the modal after saving
  };

  const handleCloseModal = () => {
    setEditingSubscription(null); // Close the modal without saving
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 h-auto w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Subscription Management</h2>
      </div>

      <div className="flex space-x-6">
        <div className="bg-gray-800 hover:bg-gradient-to-r from-[#EF1C68] to-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg hover:text-white font-semibold text-gray-100">Free Plan</h3>
            <button
              className="bg-gray-800  bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-2 border border-gray-700"
              onClick={() => handleEdit(1)} 
            >
              Edit Plan
            </button>
          </div>
          <div className="text-sm text-white">Price: ${subscriptionData[0].price}</div>
          <div className="text-sm text-white">Duration: {subscriptionData[0].months} months</div>
          <div className="mt-4">
            <strong className="text-white">Features:</strong>
            <ul className="text-white">
              {subscriptionData[0].features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 hover:bg-gradient-to-r from-[#EF1C68] to-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Paid Plan</h3>
            <button
              className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-2 border border-gray-700"
              onClick={() => handleEdit(2)} // Edit Paid Plan
            >
              Edit Plan
            </button>
          </div>
          <div className="text-sm text-white">Price: ${subscriptionData[1].price}</div>
          <div className="text-sm text-white">Duration: {subscriptionData[1].months} months</div>
          <div className="mt-4">
            <strong className="text-white">Features:</strong>
            <ul className="text-white">
              {subscriptionData[1].features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {editingSubscription && (
        <SubscriptionModal
          subscription={editingSubscription}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
        />
      )}
    </motion.div>
  );
};

export default SubscriptionTable;
