import { motion } from 'framer-motion';
import { useState } from 'react';

const NotificationModal = ({ showModal, setShowModal, handleSendNotification, newNotification, setNewNotification, customField, setCustomField }) => {

  return (
    <motion.div
      className='fixed inset-0 flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 max-w-md w-full bg-opacity-98'
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className='text-2xl font-semibold mb-4 text-white'>Create Notification</h2>
        <input
          type='text'
          className='w-full p-3 mb-3 border border-gray-600 rounded-lg bg-gray-700 text-white'
          value={newNotification.title}
          onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
          placeholder='Enter notification title'
        />
        <textarea
          className='w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white'
          rows='4'
          value={newNotification.message}
          onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
          placeholder='Enter notification message'
        />
        <div className='mt-4'>
          <label htmlFor='audience' className='block text-white mb-2'>
            Select Audience
          </label>
          <select
            id='audience'
            className='w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
            value={newNotification.audience}
            onChange={(e) => setNewNotification({ ...newNotification, audience: e.target.value })}
          >
            <option value='all'>All Users</option>
            <option value='location'>Specific Location</option>
            <option value='event'>Event Updates</option>
            <option value='promotion'>Promotions</option>
          </select>
        </div>

        {/* Custom Field */}
        {newNotification.audience === 'location' && (
          <div className='mb-4'>
            <input
              type='text'
              className='w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='Enter location name'
              value={customField}
              onChange={(e) => setCustomField(e.target.value)}
            />
          </div>
        )}
        {newNotification.audience === 'event' && (
          <div className='mb-4'>
            <input
              type='text'
              className='w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='Enter event details'
              value={customField}
              onChange={(e) => setCustomField(e.target.value)}
            />
          </div>
        )}
        {newNotification.audience === 'promotion' && (
          <div className='mb-4'>
            <input
              type='text'
              className='w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='Enter promotion details'
              value={customField}
              onChange={(e) => setCustomField(e.target.value)}
            />
          </div>
        )}

        <div className='mt-4 flex gap-4'>
          <button
            onClick={handleSendNotification}
            className='bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors'
          >
            Send
          </button>
          <button
            onClick={() => setShowModal(false)}
            className='bg-gray-800 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-900 border border-gray-700 transition-colors'
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationModal;
