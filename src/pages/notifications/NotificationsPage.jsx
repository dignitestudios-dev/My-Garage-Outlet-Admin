import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

import NotificationTable from '../../components/notifications/NotificationTable';
import NotificationModal from '../../components/notifications/NotificationModal';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'Maintenance', message: 'System maintenance scheduled for tonight.' },
    { id: 2, type: 'success', title: 'New Features', message: 'New features have been added to your dashboard.' },
    { id: 3, type: 'warning', title: 'Subscription', message: 'Your subscription has been renewed.' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newNotification, setNewNotification] = useState({ title: '', message: '', audience: 'all' });
  const [notificationType, setNotificationType] = useState('info'); 
  const [customField, setCustomField] = useState('');

  const handleSendNotification = () => {
    if (newNotification.title.trim() && newNotification.message.trim()) {
      setNotifications([
        ...notifications,
        { 
          id: Date.now(), 
          type: notificationType, 
          title: newNotification.title, 
          message: newNotification.message, 
          audience: newNotification.audience, 
          customField: customField || null
        }
      ]);
      setNewNotification({ title: '', message: '', audience: 'all' });
      setCustomField('');
      setShowModal(false);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className='flex flex-col h-screen bg-[#001229] w-full overflow-auto'>
      <main className='flex-1 overflow-auto p-6'>
      <motion.button
  onClick={() => setShowModal(true)}
  className='mb-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 text-white px-5 py-3 flex items-center hover:bg-gray-900 transition-colors ml-auto'
  initial={{ x: "100%" }} 
  animate={{ x: 0 }} 
  transition={{ duration: 0.5, type: "spring", stiffness: 100 }} 
  whileHover={{
    scale: 1.05,
    boxShadow: "0px 4px 16px rgba(255, 255, 255, 0.2)",
    transition: { duration: 0.3 },
  }}
>
  <FaPaperPlane className='mr-2 text-[#EF1C68]' />
  Create Notification
</motion.button>


        <NotificationTable notifications={notifications} handleDeleteNotification={handleDeleteNotification} />

        {showModal && (
          <NotificationModal
            showModal={showModal}
            setShowModal={setShowModal}
            handleSendNotification={handleSendNotification}
            newNotification={newNotification}
            setNewNotification={setNewNotification}
            customField={customField}
            setCustomField={setCustomField}
          />
        )}
      </main>
    </div>
  );
};

export default NotificationsPage;
