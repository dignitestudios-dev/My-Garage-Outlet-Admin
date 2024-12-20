import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

import NotificationTable from "../../components/notifications/NotificationTable";
import NotificationModal from "../../components/notifications/NotificationModal";
import { BASE_URL } from "../../api/api";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const NotificationsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    audience: "",
  });
  const [customField, setCustomField] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/notification/viewSentNotifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setData(res?.data);
    } catch (error) {
      console.log("err while fetching notifications >>", error);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Enter notification title");
      return;
    }
    if (!message) {
      toast.error("Enter notification message");
      return;
    }
    if (!userType) {
      toast.error("Please select audience");
      return;
    }
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/notification/createAndSendNotification?userType=${userType}`,
        {
          title,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Notification created:", response?.data);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchNotifications();
        setShowModal(!showModal);
      }
    } catch (err) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotification = async (id) => {
    const token = Cookies.get("token");
    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/notification/deleteNotification/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res?.data?.message);
      fetchNotifications();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#001229] w-full overflow-auto">
      <main className="flex-1 overflow-auto p-6">
        <motion.button
          onClick={() => setShowModal(true)}
          className="mb-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 text-white px-5 py-3 flex items-center hover:bg-gray-900 transition-colors ml-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 16px rgba(255, 255, 255, 0.2)",
            transition: { duration: 0.3 },
          }}
        >
          <FaPaperPlane className="mr-2 text-[#EF1C68]" />
          Create Notification
        </motion.button>

        <NotificationTable
          data={data}
          handleDeleteNotification={handleDeleteNotification}
        />

        {showModal && (
          <NotificationModal
            showModal={showModal}
            setShowModal={setShowModal}
            // handleSendNotification={handleSendNotification}
            newNotification={newNotification}
            setNewNotification={setNewNotification}
            customField={customField}
            setCustomField={setCustomField}
            title={title}
            setTitle={setTitle}
            message={message}
            setMessage={setMessage}
            userType={userType}
            setUserType={setUserType}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};

export default NotificationsPage;
