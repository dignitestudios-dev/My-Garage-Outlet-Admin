import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditEventModal from "../../components/events/EditEventModal";
import DeleteEventModal from "../../components/events/DeleteEventModal";
import {
  FaHeart,
  FaRetweet,
  FaComment,
  FaShare,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/api";
import EventParticipants from "./EventParticipants";
import Loader from "../../components/global/Loader";

const mockEventDetails = {
  id: "E001",
  title: "Event Title",
  description:
    "An exciting boat racing event in the open sea. Experience the thrill and speed!",
  date: "2024-09-12",
  time: "10:00 AM - 2:00 PM",
  location: "Miami, Florida",
  participants: [
    {
      name: "John Doe",
      email: "john@example.com",
      status: "joined",
      id: "P001",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Alice Smith",
      email: "alice@example.com",
      status: "maybe",
      id: "P002",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "joined",
      id: "P003",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ],
  images: [
    "https://images.pexels.com/photos/1034664/pexels-photo-1034664.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1034670/pexels-photo-1034670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1034673/pexels-photo-1034673.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ],
  likes: 120,
  reposts: 30,
  comments: 45,
};

const EventDetails = () => {
  const { id } = useParams();
  const { navigate } = useContext(GlobalContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("eventDetails");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [event, setEvent] = useState(null);
  const [deletionReason, setDeletionReason] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFetchEvent = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/event/viewEventDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("eventdata >>", res?.data?.data);
      setEvent(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchEvent();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleSave = () => {
    toggleEditModal();
  };

  const handleDelete = async () => {
    const token = Cookies.get("token");
    setDeleting(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/event/deleteSingleEvent/${id}`,
        { reason: deletionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("event deleted >>>", res?.data);

      if (res?.data?.success) {
        console.log("Event successfully deleted!");
        toast.success("Event deleted");
        toggleDeleteModal();
        navigate("/");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Something went wrong");
      toggleDeleteModal();
    } finally {
      setDeleting(false);
    }
  };

  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % mockEventDetails.images.length
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + mockEventDetails.images.length) %
        mockEventDetails.images.length
    );
  };

  return (
    <div className="h-full w-full bg-[#001229] text-white flex flex-col items-center px-4 py-8 overflow-y-auto">
      <div className="w-full bg-[#001229] text-gray-200 rounded-lg shadow-lg">
        {/* Carousel Section */}
        <div className="relative w-full mb-6">
          <img
            src={event?.picture}
            alt={`Event Image ${currentImageIndex + 1}`}
            className="w-full h-72 object-contain object-center rounded-t-lg"
          />
          {/* Navigation Buttons */}
          <button
            onClick={goToPreviousImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          >
            &#60;
          </button>
          <button
            onClick={goToNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          >
            &#62;
          </button>
        </div>

        {/* Tabs Section */}
        <div className="flex border-b border-gray-700 w-full justify-around mb-6 pb-5">
          <button
            className={`py-3 px-6 w-full rounded-full text-lg font-semibold ${
              activeTab === "eventDetails"
                ? "bg-[#EF1C68] text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("eventDetails")}
          >
            Event Details
          </button>
          <button
            className={`py-3 px-6 w-full rounded-full text-lg font-semibold ${
              activeTab === "participants"
                ? "bg-[#EF1C68] text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("participants")}
          >
            Participants
          </button>
        </div>

        {/* Participants Tab */}
        {activeTab === "participants" ? (
          <EventParticipants
            filteredParticipants={event?.participants}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            {/* Event Title and Description */}
            <h2 className="text-5xl font-bold text-[#EF1C68] mb-4">
              {event?.title}
            </h2>
            <p className="text-lg text-gray-400 mb-6">{event?.description}</p>

            {/* Event Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-3">
                  <FaCalendarAlt className="text-[#EF1C68] text-xl" />
                  <h3 className="text-xl font-semibold text-gray-300">Date:</h3>
                </div>
                <p className="text-gray-400 text-lg">{event?.date}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-3">
                  <FaClock className="text-[#EF1C68] text-xl" />
                  <h3 className="text-xl font-semibold text-gray-300">Time:</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  {event?.startTime} - {event?.endTime}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-3">
                  <FaMapMarkerAlt className="text-[#EF1C68] text-xl" />
                  <h3 className="text-xl font-semibold text-gray-300">
                    Location:
                  </h3>
                </div>
                <p className="text-gray-400 text-lg">{event?.city}</p>
              </div>
            </div>

            {/* Participants Section */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <FaUsers className="text-[#EF1C68] text-xl" />
                <h3 className="text-xl font-semibold text-gray-300">
                  Participants:
                </h3>
              </div>
              <p className="text-gray-400  text-lg">
                {event?.participants?.length} Participants
              </p>
            </div>

            {/* Social Interaction Section */}
            <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center text-gray-300">
              <div className="flex items-center space-x-2">
                <FaHeart className="text-red-500" />
                <span>{event?.likeCount} Likes</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaRetweet className="text-green-500" />
                <span>{event?.repostCount} Reposts</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaComment className="text-blue-500" />
                <span>{event?.commentCount} Comments</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaShare className="text-orange-500" />
                <span>{event?.shareCount} Shares</span>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                onClick={toggleDeleteModal}
              >
                Delete Event
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals for Edit and Delete */}
      {isEditModalOpen && (
        <EditEventModal
          eventDetails={mockEventDetails}
          onSave={handleSave}
          onClose={toggleEditModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteEventModal
          eventDetails={event}
          onDelete={handleDelete}
          onClose={toggleDeleteModal}
          isDeletingEvent={deleting}
          deletionReason={deletionReason}
          setDeletionReason={setDeletionReason}
        />
      )}
    </div>
  );
};

export default EventDetails;
