import { useState } from "react";
import { motion } from "framer-motion";

const Settings = () => {
  const [username, setUsername] = useState("admin_user"); 
  const [email, setEmail] = useState("admin@example.com"); 
  const [password, setPassword] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null); 
  const [previewPic, setPreviewPic] = useState(null); 
  
  // Simulating a current profile image URL (you can replace this with real data)
  const currentProfilePic = "https://i.pravatar.cc/?img=12"; 

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    
    // Create a preview for the image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Save the new details (you can call an API here)
    console.log("Settings saved:", { username, email, password, profilePic });
    alert("Settings updated successfully");
  };

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 backdrop-blur-md p-6 h-auto w-full flex flex-col overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-6">Account Settings</h2>

      <div className="flex items-center mb-6">
        <div className="mr-6">
          {previewPic ? (
            <img src={previewPic} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <img src={currentProfilePic} alt="Current Profile" className="w-24 h-24 rounded-full object-cover" />
          )}
        </div>

        <div>
          <p className="text-xl font-semibold text-gray-100 ">{username}</p>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSaveChanges}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-100">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mt-2 text-gray-100 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700"
            placeholder="Enter new username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-100">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 text-gray-100 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700"
            placeholder="Enter new email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-100">Current Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 text-gray-100 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700"
            placeholder="Enter current password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-100">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mt-2 text-gray-100 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-100">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            onChange={handleProfilePicChange}
            className="w-full mt-2"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="bg-[#EF1C68] text-white px-6 py-2 rounded-md mt-4"
        >
          Save Changes
        </button>
      </form>
    </motion.div>
  );
};

export default Settings;
