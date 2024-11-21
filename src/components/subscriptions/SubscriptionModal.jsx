import { useState } from "react";

const SubscriptionModal = ({ subscription, onSave, onClose }) => {
  const [newFeatures, setNewFeatures] = useState(subscription.features.join(","));

  const handleSave = () => {
    const updatedSubscription = {
      ...subscription,
      features: newFeatures.split(","),
    };
    onSave(updatedSubscription);
  };

  return (
    <div className="fixed inset-0 mt-12 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-96">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Edit Subscription Plan</h3>
        <div className="mb-4">
          <label className="text-gray-300">Subscription Name</label>
          <input
            type="text"
            className="bg-gray-800 py-2 hover:bg-gray-900 border border-gray-700 transition-colors px-4 text-gray-300 w-full mt-2 p-2 rounded"
            value={subscription.name}
            onChange={(e) => onSave({ ...subscription, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300">Price</label>
          <input
            type="number"
            className="bg-gray-800 py-2 hover:bg-gray-900 border border-gray-700 transition-colors px-4 text-gray-300 w-full mt-2 p-2 rounded"
            value={subscription.price}
            onChange={(e) => onSave({ ...subscription, price: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300">Duration (Months)</label>
          <input
            type="number"
            className="bg-gray-800 py-2 hover:bg-gray-900 border border-gray-700 transition-colors px-4 text-gray-300 w-full mt-2 p-2 rounded"
            value={subscription.months}
            onChange={(e) => onSave({ ...subscription, months: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300">Features</label>
          <textarea
            className="bg-gray-800 py-2 hover:bg-gray-900 border border-gray-700 transition-colors px-4 text-gray-300 w-full mt-2 p-2 rounded"
            value={newFeatures}
            onChange={(e) => setNewFeatures(e.target.value)}
            placeholder="Enter features separated by commas"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gray-800 text-gray-200  py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors px-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-gray-800 text-gray-200  py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors px-4"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
