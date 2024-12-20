import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditUserModal from "../../components/users/EditUserModal";
import DeleteUserModal from "../../components/users/DeleteUserModal";
import SuspendUserModal from "../../components/users/SuspendUserModal";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import Loader from "../../components/global/Loader";
import { toast } from "react-toastify";

const UsersInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventFilter, setEventFilter] = useState("all");
  const [isEventsActive, setIsEventsActive] = useState(true);
  const [suspensionReason, setSuspensionReason] = useState("");

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suspending, setSuspending] = useState(false);

  const fetchUser = async () => {
    console.log("fetch user called");
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/user/viewUserDetails/${id}?eventType=${eventFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(res?.data?.data);
    } catch (error) {
      console.log("err while fetching user >>>", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [eventFilter]);

  const DateFormat = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return <Loader />;
  }

  const toggleSuspendModal = () => {
    setIsSuspendModalOpen(!isSuspendModalOpen);
  };

  const handleSuspend = async () => {
    const token = Cookies.get("token");
    setSuspending(true);
    const url = userDetails?.isLocked
      ? `${BASE_URL}/admin/user/toggleLockUserAccount/${id}/false`
      : `${BASE_URL}/admin/user/toggleLockUserAccount/${id}/true`;

    const params = userDetails?.isLocked
      ? { suspensionReason }
      : { suspensionReason };

    try {
      const res = await axios.post(url, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res?.data?.message);
      fetchUser();

      if (!userDetails?.isLocked) {
        toggleSuspendModal();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.error("Error suspending user:", err);
      toggleSuspendModal();
    } finally {
      setSuspending(false);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const handleDelete = () => {
    toggleDeleteModal();
  };

  const handleSave = () => {
    toggleModal();
  };

  const goToEventDetails = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  const goToItemDetails = (itemId) => {
    navigate(`/item-details/1`);
  };

  const handleEventFilterChange = (e) => {
    setEventFilter(e.target.value);
  };

  return (
    <div className="w-full h-full bg-[#001229] p-8 text-white overflow-auto">
      {/* User Info Card */}
      <div className="bg-[#1E2A38] p-8 rounded-xl shadow-2xl hover:shadow-2xl transition-all mb-6 w-full mx-auto">
        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#EF1C68]">
            <img
              src={userDetails?.profilePicture}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-[#EF1C68] mb-2">
              {userDetails?.name ? userDetails?.name : "N/A"}
            </h2>
            <p className="text-sm mb-2 text-[#A6A6A6]">
              Connections {userDetails?.connections}
            </p>
            <div className="flex items-center mb-2 text-[#A6A6A6]">
              <FaPhoneAlt className="mr-2 text-[#EF1C68]" />
              <span>{userDetails?.phone ? userDetails?.phone : "N/A"}</span>
            </div>
            <div className="flex items-center mb-2 text-[#A6A6A6]">
              <FaEnvelope className="mr-2 text-[#EF1C68]" />
              <span>{userDetails?.email ? userDetails?.email : "N/A"}</span>
            </div>
            <div className="flex items-center mb-2 text-[#A6A6A6]">
              <FaMapMarkerAlt className="mr-2 text-[#EF1C68]" />
              <span>{userDetails?.address ? userDetails?.address : "N/A"}</span>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                className="bg-red-600 text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-red-800 transition"
                onClick={() =>
                  userDetails?.isLocked ? handleSuspend() : toggleSuspendModal()
                }
              >
                {userDetails?.isLocked ? "Unsuspend" : "Suspend"}
                {/* Suspend */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Events & Items - Left aligned */}
      <div className="flex mb-6">
        <button
          className={`px-6 py-2 text-sm font-semibold rounded-full mr-4 ${
            isEventsActive ? "bg-[#EF1C68]" : "bg-[#2E3C55]"
          } text-white`}
          onClick={() => setIsEventsActive(true)}
        >
          Events
        </button>
        <button
          className={`px-6 py-2 text-sm font-semibold rounded-full ${
            !isEventsActive ? "bg-[#EF1C68]" : "bg-[#2E3C55]"
          } text-white`}
          onClick={() => setIsEventsActive(false)}
        >
          Items
        </button>
      </div>

      {/* Conditional Rendering of Event or Item Tables */}
      {isEventsActive ? (
        <div className="bg-[#1E2A38] rounded-xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Event History</h3>
            <select
              className="bg-[#2E3C55] text-white px-4 py-2 rounded-full"
              value={eventFilter}
              onChange={handleEventFilterChange}
            >
              <option value="all" selected>
                All
              </option>
              <option value="joined">Joined</option>
              <option value="maybe">Maybe</option>
              <option value="creator">Created</option>
            </select>
          </div>

          {userDetails?.events?.length > 0 ? (
            <table className="w-full text-white table-auto border-collapse">
              <thead className="text-sm text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left">Event Name</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userDetails?.events?.map((event) => (
                  <tr key={event.id} className="hover:bg-[#2C3E56]">
                    <td className="px-6 py-4">{event?.title}</td>
                    <td className="px-6 py-4">{event?.date}</td>
                    <td className="px-6 py-4">
                      {DateFormat() > event?.date ? "Completed" : "Upcoming"}
                    </td>
                    <td className="px-6 py-4">{event?.type}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-[#EF1C68] hover:text-[#E01C56] transition"
                        onClick={() => goToEventDetails(event?.eventID)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <h2>No Events Created Yet</h2>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#1E2A38] rounded-xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Items Listed</h3>
          {userDetails?.items?.length > 0 ? (
            <table className="w-full text-white table-auto border-collapse">
              <thead className="text-sm text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left">Item Name</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userDetails?.items?.map((item) => (
                  <tr key={item.itemID} className="hover:bg-[#2C3E56]">
                    <td className="px-6 py-4">{item?.title}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-[#EF1C68] hover:text-[#E01C56] transition"
                        onClick={() => goToItemDetails(item.itemID)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <h2>No Items Found</h2>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {isModalOpen && (
        <EditUserModal
          user={user}
          toggleModal={toggleModal}
          handleSave={handleSave}
        />
      )}
      {isSuspendModalOpen && (
        <SuspendUserModal
          toggleSuspendModal={toggleSuspendModal}
          handleSuspend={handleSuspend}
          suspendLoading={suspending}
          suspensionReason={suspensionReason}
          setSuspensionReason={setSuspensionReason}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteUserModal
          toggleDeleteModal={toggleDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UsersInfo;
