import React, { useState } from "react";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";

const EventParticipants = ({
  searchQuery,
  setSearchQuery,
  filteredParticipants,
}) => {
  const [activeStatusTab, setActiveStatusTab] = useState("joined");
  return (
    <div className="w-full bg-[#001229] text-gray-200 p-6 rounded-lg shadow-md">
      {/* Status Tabs for Joined/Maybe */}
      <div className="flex justify-start mb-4 space-x-4">
        <button
          disabled={filteredParticipants?.length == 0}
          className={`flex items-center rounded-full py-2 px-4 text-sm font-semibold disabled:bg-gray-800 disabled:text-gray-400 ${
            activeStatusTab === "joined"
              ? "bg-[#EF1C68] text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
          onClick={() => setActiveStatusTab("joined")}
        >
          Joined
        </button>
        <button
          disabled={filteredParticipants?.length == 0}
          className={`flex items-center rounded-full py-2py-1 px-4 text-sm font-semibold disabled:bg-gray-800 disabled:text-gray-400 ${
            activeStatusTab === "maybe"
              ? "bg-[#EF1C68] text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
          onClick={() => setActiveStatusTab("maybe")}
        >
          Maybe
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search participants by name or email..."
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#EF1C68]"
          value={searchQuery}
          disabled={
            filteredParticipants == undefined ||
            filteredParticipants?.length == 0
          }
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Participant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredParticipants?.length > 0 ? (
          filteredParticipants?.map((participant) => (
            <div
              key={participant.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={participant.profilePic}
                  alt={participant.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{participant.name}</h3>
                  <p className="text-sm text-gray-400">{participant.email}</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center space-x-2">
                {participant.status === "joined" ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaQuestionCircle className="text-yellow-500" />
                )}
                <span className="text-sm text-gray-400">
                  {participant.status === "joined" ? "Joined" : "Maybe"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No participants found</p>
        )}
      </div>
    </div>
  );
};

export default EventParticipants;
