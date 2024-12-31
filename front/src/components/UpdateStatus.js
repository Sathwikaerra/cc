import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUser, getRequestUsers } from './ApI/Api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToggleActiveStatus = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestUsers, setRequestUsers] = useState([]);
  const [isUsersVisible, setIsUsersVisible] = useState(false);
  const [emailSending, setEmailSending] = useState(null);

  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(userId);
        setCurrentUser(res.newuser);
        setIsActive(res.newuser.active);

        const requestRes = await getRequestUsers();
        const filteredUsers = requestRes.users.filter((user) => user._id !== userId);
        setRequestUsers(filteredUsers);
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleToggleStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put("/user/update-status", {
        id: userId,
        activeStatus: !isActive,
      });

      if (response.status === 200) {
        setIsActive(!isActive);
        toast.success("User status updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUsers = () => {
    setIsUsersVisible(!isUsersVisible);
  };

  const handleSendEmail = async (user) => {
    setEmailSending(user._id);
    try {
      const response = await axios.post("/user/Alert/send-email", {
        email: user.email,
        subject: "Food Parcel Notification",
        message: `Hello ${user.name}, someone is trying to bring you a food parcel. Please check.`,
      });

      if (response.status === 200) {
        toast.success(`Email sent to ${user.name} successfully!`);
      } else {
        toast.error(`Failed to send email to ${user.name}.`);
      }
    } catch (err) {
      toast.error(`Failed to send email to ${user.name}.`);
    } finally {
      setEmailSending(null);
    }
  };

  if (!currentUser) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex  flex-col justify-center items-center gap-6 items-center mt-6">
      <h2 className="text-xl text-yellow-100 font-semibold mb-4">User Status</h2>

      <div className="flex items-center gap-4">
        <p className={`font-medium ${isActive ? "text-green-600" : "text-red-600"}`}>
          {isActive ? "Active" : "Inactive"}
        </p>
        <button
          onClick={handleToggleStatus}
          className={`px-6 py-2 rounded-full text-white font-semibold ${
            isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : isActive ? "Deactivate" : "Activate"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleToggleUsers}
        className="mt-4 px-6 py-2 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600"
      >
        {isUsersVisible ? "Hide Waiting Users" : "Show Waiting Users"}
      </button>

      {isUsersVisible && (
        <div className="mt-4">
          {requestUsers.length === 0 ? (
            <div>No Waiting Users</div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4">
              {requestUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between bg-yellow-100 p-3 rounded-lg w-[300px]"
                >
                  <p>{user.name}</p>
                  <button
                    onClick={() => handleSendEmail(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={emailSending === user._id}
                  >
                    {emailSending === user._id ? "Sending..." : "Notify"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Toastify container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ToggleActiveStatus;
