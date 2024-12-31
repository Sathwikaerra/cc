import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ordering = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const currentUserId = localStorage.getItem("UserId");

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBars, setSelectedBars] = useState([]);
  const [confirmedBars, setConfirmedBars] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(false); // Request pending state
  const [isRequesting, setIsRequesting] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch user details by ID
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/user/${userId}`);
      setUser(res.data.newuser);
    } catch (err) {
      toast.error("Failed to fetch user details.");
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle service selection confirmation
  const handleConfirmSelection = async () => {
    try {
      setIsRequesting(true);
      // Send OTP to the user
      await axios.post(`/user/send-otp/${userId}`, {
        email: user.email,
        id: currentUserId,
      });

      const selectedCount = selectedBars.length;

      // Send the service request
      await axios.put(`/user/set-order-request/${userId}`, {
        requestedBy: currentUserId,
        serviceCount: selectedCount,
        status: "pending",
      });

      // Show success toast
      toast.success("Request has been sent. Confirmation will be sent to your email.", {
        style: { backgroundColor: "green", color: "white" }, // Set green background for success
        autoClose: 3000, // Auto close after 3 seconds
        closeOnClick: true, // Allow to close on click
      });

      setConfirmedBars(selectedBars);
      setPendingRequest(true); // Set requestPending to true after sending request
      setSelectedBars([]); // Clear selected bars

      // Navigate to the home page after a delay to allow the toast to show
      setTimeout(() => {
        navigate("/"); // Redirect to the home page
      }, 3000); // Delay the navigation to allow the toast to show
    } catch (err) {
      toast.error("Failed to send request.");
      setError("Failed to send request. Please try again.");
    } finally {
      setIsRequesting(false);
      setShowModal(false); // Close modal after sending request
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-sm">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-6 w-[300px] bg-yellow-50 text-gray-800 shadow-2xl rounded-xl p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">User Details</h1>
      {user ? (
        <div>
          <p className="mb-2 text-sm font-bold">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2 text-sm font-bold">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2 text-sm font-bold">
            <strong>Current Service Count:</strong> {user.serviceCount}
          </p>

          <div className="mb-4">
            {/* <label
              htmlFor="serviceCount"
              className="block mb-1 text-lg font-bold text-gray-700"
            >
              Select Service Count (0 to {user.serviceCount}):
            </label> */}
            <div className="flex justify-center items-center gap-2">
              {[...Array(user.serviceCount)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!confirmedBars.includes(index) && !selectedBars.includes(index)) {
                      setSelectedBars((prev) => [...prev, index]);
                    }
                  }}
                  className={`w-8 h-8 cursor-pointer rounded-full transform transition duration-300 ${
                    confirmedBars.includes(index)
                      ? "bg-red-500"
                      : selectedBars.includes(index)
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } hover:scale-105 hover:shadow-2xl`}
                ></div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)} // Show confirmation modal
            className={`w-full py-2 px-5 ${
              user.serviceCount === 0
                ? "bg-gray-300"
                : "bg-gradient-to-r from-blue-400 to-blue-600"
            } text-white text-md font-semibold rounded-lg shadow-lg hover:opacity-90  transition duration-300`}
            disabled={user.serviceCount === 0 || isRequesting}
          >
            {isRequesting ? "Requesting..." : user.serviceCount === 0 ? "Limit Reached" : "Request Service"}
          </button>

          {pendingRequest && (
            <div className="mt-4 bg-yellow-200 text-yellow-800 p-4 rounded-md shadow-md flex flex-col items-center justify-center">
              <p className="text-sm font-bold text-center">
                Your request is pending approval.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>No user found.</div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm">
            <h2 className="text-lg font-bold mb-3">Confirm Service Selection</h2>
            <p className="mb-4">Are you sure you want to select the services?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)} // Close modal on cancel
                className="px-3 py-1.5 bg-gray-300 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSelection} // Confirm and send request
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeOnClick />
    </div>
  );
};

export default Ordering;
