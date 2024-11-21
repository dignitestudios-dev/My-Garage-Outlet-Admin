import React from "react";
import AuthInput from "../../components/onboarding/AuthInput";

const ChangePassword = ({ userData, handleInputChange }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-white mb-4">Change Password</h1>

      <div>
        <label className="text-white text-sm mb-2">New Password</label>
        <AuthInput
          name="newPassword"
          value={userData.newPassword}
          onChange={handleInputChange}
          placeholder="Enter New Password"
          type="password"
        />
      </div>

      <div>
        <label className="text-white text-sm mb-2">Confirm New Password</label>
        <AuthInput
          name="repeatPassword"
          value={userData.repeatPassword}
          onChange={handleInputChange}
          placeholder="Confirm New Password"
          type="password"
        />
      </div>
    </div>
  );
};

export default ChangePassword;
