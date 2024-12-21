import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRetweet, FaComment, FaFilePdf } from "react-icons/fa"; // Added PDF icon
import EditItemModal from "../../components/items/EditItemModal";
import DeleteItemModal from "../../components/items/DeleteItemModal";
import { FaShare } from "react-icons/fa";
import {
  useDeleteItemMutation,
  useFetchItemQuery,
} from "../../features/itemSlice/itemSlice";
import { GlobalContext } from "../../contexts/GlobalContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/api";
import axios from "axios";
import Cookies from "js-cookie";

const mockItemDetails = {
  id: "E001",
  title: "Item Title",
  description: "Placeholder Item Description",
  images: [
    "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1695634/pexels-photo-1695634.jpeg",
    "https://images.pexels.com/photos/2131757/pexels-photo-2131757.jpeg",
  ],
  geolocation: { lat: 25.7617, lon: -80.1918 }, // Miami coordinates
  city: "Miami",
  zipcode: "33101",
  likes: 120,
  reposts: 30,
  comments: 45,
};

const ItemDetails = () => {
  const { id } = useParams();

  const { navigate } = useContext(GlobalContext);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [isDeletingItem, setIsDeleting] = useState(false);

  const fetchItemsDetails = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/item/viewItemDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventDetails(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemsDetails();
  }, []);

  const handleSave = () => {
    console.log("Item details saved!");
    toggleEditModal();
  };

  const handleDelete = async (reason) => {
    const token = Cookies.get("token");
    setIsDeleting(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/item/deleteSingleItem/${id}`,
        {
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res?.data?.message);
      toggleDeleteModal();
      navigate("/items");
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error(
        err?.response?.data?.message || "An error occurred while deleting item"
      );
      toggleDeleteModal();
    } finally {
      setIsDeleting(false);
    }
  };

  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % mockItemDetails.images.length
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + mockItemDetails.images.length) %
        mockItemDetails.images.length
    );
  };

  return (
    <div className="h-auto w-full bg-[#001229] text-white flex flex-col items-center px-4 py-8 overflow-y-auto">
      <div className="w-full bg-gray-800 text-gray-200 rounded-lg shadow-lg">
        {/* Item Image Carousel Section */}
        <div className="relative w-full">
          <div className="relative w-full h-72">
            <img
              src={eventDetails?.picture}
              alt={eventDetails?.title}
              className="w-full h-full object-contain rounded-t-lg"
            />
          </div>

          {/* Carousel Controls */}
          <button
            onClick={goToPreviousImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          >
            &#8249;
          </button>
          <button
            onClick={goToNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          >
            &#8250;
          </button>
        </div>

        {/* Item Details Section */}
        <div className="p-6 space-y-6 ">
          <h2 className="text-3xl md:text-4xl font-semibold text-white ">
            {eventDetails?.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            {eventDetails?.description}
          </p>

          <div className="space-y-4">
            {/* Location, City, and Zipcode */}
            <div className="text-lg text-gray-300">
              <strong className="text-gray-500">Location:</strong>{" "}
              {eventDetails?.city}
            </div>
            <div className="text-lg text-gray-300">
              <strong className="text-gray-500">Geolocation:</strong>{" "}
              {eventDetails?.address}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center text-gray-300">
            <div className="flex items-center space-x-2">
              <FaHeart className="text-red-500" />
              <span>{eventDetails?.likeCount} Likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRetweet className="text-green-500" />
              <span>{eventDetails?.repostCount} Reposts</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaComment className="text-blue-500" />
              <span>{eventDetails?.commentCount} Comments</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaShare className="text-orange-500" />
              <span>{eventDetails?.shareCount} Shares</span>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="mt-6 flex justify-start space-x-6">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md"
              onClick={toggleDeleteModal}
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>

      {/* Modals for Edit and Delete */}
      {isEditModalOpen && (
        <EditItemModal
          itemDetails={mockItemDetails}
          toggleModal={toggleEditModal}
          handleSave={handleSave}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteItemModal
          itemDetails={mockItemDetails}
          toggleModal={toggleDeleteModal}
          handleDelete={handleDelete}
          isDeletingItem={isDeletingItem}
        />
      )}
    </div>
  );
};

export default ItemDetails;
