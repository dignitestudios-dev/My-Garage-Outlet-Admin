import { motion } from 'framer-motion';
import { FaTrash, FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const notificationIcons = {
  info: <FaInfoCircle className='text-blue-500' />,
  warning: <FaExclamationTriangle className='text-yellow-500' />,
  success: <FaCheckCircle className='text-green-500' />,
};

const NotificationTable = ({ notifications, handleDeleteNotification }) => {
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg  border border-gray-700 p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4 text-white'>Sent Notifications</h2>
      {notifications.length === 0 ? (
        <p className='text-gray-400'>No notifications sent yet.</p>
      ) : (
        <ul className='space-y-2'>
          {notifications.map((notification) => (
            <motion.li
              key={notification.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className='flex items-center bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 hover:bg-gray-900 transition-colors'
            >
              {notificationIcons[notification.type]}
              <div className='ml-3'>
                <h3 className='text-lg font-bold text-gray-200'>{notification.title}</h3>
                <p className='text-gray-400'>{notification.message}</p>
                {notification.audience && (
                  <p className='text-gray-400 text-sm mt-2'>Audience: {notification.audience}</p>
                )}
                {notification.customField && (
                  <p className='text-gray-400 text-sm mt-2'>Details: {notification.customField}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteNotification(notification.id)}
                className='ml-auto text-red-400 hover:text-red-300 transition-colors'
              >
                <FaTrash />
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationTable;
