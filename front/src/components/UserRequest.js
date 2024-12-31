import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from './ApI/Api';

const ToggleRequestStatus = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const userId = localStorage.getItem("UserId");

  // Fetch current user data when component mounts or userId changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(userId); // Assuming getUser is the API function to fetch user data
        setCurrentUser(res.newuser); // Set the fetched user data
        setIsActive(res.newuser.request); // Set the initial active status
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // Function to handle the toggle of active status
  const handleToggleStatus = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Make the API call to update the active status
      const response = await axios.put("/user/update-request", {
        id: userId,
        RequestStatus: !isActive,
      });

      if (response.status === 200) {
        setIsActive(!isActive); // Update the status on success
        setSuccessMessage("User status updated successfully!");
      }
    } catch (err) {
      setError("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <p>Loading user data...</p>; // Show loading text while fetching user data
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-xl font-semibold mb-4">User Status</h2>

      <div className="flex items-center gap-4">
        <p className={`font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </p>
        <button
          onClick={handleToggleStatus}
          className={`px-6 py-2 rounded-full text-white font-semibold ${
            isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : isActive ? "Deactivate" : "Activate"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
};

export default ToggleRequestStatus;
