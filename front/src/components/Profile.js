import React, { useEffect, useState } from "react";
import { getUser } from "./ApI/Api";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser(userId);
        setCurrentUser(res.newuser);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleApproveRequest = async (request, index) => {
    try {
      const response = await axios.post(`/user/approve-request/${userId}`, {
        requestId: request._id,
      });

      if (response.status === 200) {
        showNotification("Request approved successfully!", "success");
        const updatedUser = await getUser(userId);
        setCurrentUser(updatedUser.newuser);
      }
    } catch (error) {
      console.error(error);
      showNotification("Failed to approve request.", "error");
    }
  };

  const handleRejectRequest = async (index) => {
    try {
      const response = await axios.delete(`/user/remove-request/${userId}`, {
        data: { index },
      });

      if (response.status === 200) {
        showNotification("Request rejected successfully!", "success");
        const updatedUser = await getUser(userId);
        setCurrentUser(updatedUser.newuser);
      }
    } catch (error) {
      console.error(error);
      showNotification("Failed to reject request.", "error");
    }
  };

  const handleDeleteAccess = async (index, count) => {
    try {
      const response = await axios.delete(`/user/remove-accessed-by/${userId}`, {
        data: { index, count },
      });

      if (response.status === 200) {
        showNotification("Access removed successfully!", "success");
        const updatedUser = await getUser(userId);
        setCurrentUser(updatedUser.newuser);
      }
    } catch (error) {
      console.error(error);
      showNotification("Failed to remove access.", "error");
    }
  };

  const handleResetParcels = async () => {
    try {
      const response = await axios.put(`/user/reset-parcels/${userId}`);

      if (response.status === 200) {
        showNotification("All parcels reset successfully!", "success");
        const updatedUser = await getUser(userId);
        setCurrentUser(updatedUser.newuser);
      }
    } catch (error) {
      console.error(error);
      showNotification("Failed to reset parcels.", "error");
    }
  };

  if (loading) {
    return <div className="text-center text-sm">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-900 min-h-screen py-6 text-gray-200">
      {notification && (
        <div
          className={`fixed top-3 right-3 px-4 py-2 text-sm rounded shadow-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {currentUser ? (
        <div className="bg-gray-800 rounded-lg p-4 w-full max-w-xs">
          <h1 className="text-xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
            User Profile
          </h1>
          <div className="text-sm mt-4">
            <p>
              <span className="font-semibold text-gray-400">Name:</span>{" "}
              <span className="text-teal-400">{currentUser.name}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Email:</span>{" "}
              <span className="text-teal-400">{currentUser.email}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">ID:</span>{" "}
              <span className="text-teal-400">{currentUser.id}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">
                Available Services:
              </span>{" "}
              <span className="text-teal-400">{currentUser.serviceCount}</span>
            </p>
            <button
              onClick={() => navigate("/update-password")}
              className="mt-2 bg-stone-50 text-xs px-3 py-1 rounded text-black hover:underline"
            >
              Update Password
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-base text-purple-400">
              Orders List
            </h3>
            {currentUser.accessedBy.length > 0 ? (
              currentUser.accessedBy.map((access, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-3 rounded mt-2 text-sm"
                >
                  <p>
                    <span className="font-semibold text-gray-300">Name:</span>{" "}
                    {access.user?.name || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Email:</span>{" "}
                    {access.user?.email || "No Email"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Count:</span>{" "}
                    {access.count}
                  </p>
                  <button
                    onClick={() => handleDeleteAccess(index, access.count)}
                    className="mt-2 bg-red-500 text-xs px-3 py-1 rounded hover:bg-red-600"
                  >
                    <DeleteIcon className="mr-1" fontSize="small" />
                    Remove Access
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No Orders</p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-base text-yellow-400">
              Pending Requests
            </h3>
            {currentUser.orderRequest.length > 0 ? (
              currentUser.orderRequest.map((request, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-3 rounded mt-2 text-sm"
                >
                  <p>
                    <span className="font-semibold text-gray-300">
                      Requested By:
                    </span>{" "}
                    {request.requestedBy?.name || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Parcels:</span>{" "}
                    {request.serviceCount || "0"}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleApproveRequest(request, index)}
                      className="bg-green-500 text-xs px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectRequest(index)}
                      className="bg-red-500 text-xs px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No pending requests</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <div className="mt-6">
        <button
          onClick={handleResetParcels}
          className="bg-blue-600 text-xs px-4 py-2 rounded hover:bg-blue-700"
        >
          Reset Parcels
        </button>
      </div>
    </div>
  );
};

export default Profile;
