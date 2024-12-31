import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { currentAdmin } = useSelector((state) => state.admin);
  
  const [users, setUsers] = useState([]);
  const [isUsersVisible, setIsUsersVisible] = useState(false);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/allusers"); // Your API endpoint to get all users
        setUsers(response.data.users);
      } catch (error) {
        toast.error("Failed to fetch users!");
      }
    };

    fetchUsers();
  }, [currentAdmin]);

  const toggleUsersVisibility = () => {
    setIsUsersVisible(!isUsersVisible);
  };

  return (
    <div className="flex mt-10 justify-center items-center gap-2 flex-col px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white">Campus Connect</h1>
      <img className="w-[50px] sm:w-[60px] mb-4" src="/CC2.jpg" alt="Campus Connect Logo" />

      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Admin Profile</h2>

        {/* Admin Information */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-sm">Name</label>
          <p className="text-lg text-gray-200 font-medium bg-gradient-to-r from-gray-700 to-gray-600 p-2 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
            {currentAdmin.name}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-sm">Email</label>
          <p className="text-lg text-gray-200 font-medium bg-gradient-to-r from-gray-700 to-gray-600 p-2 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
            {currentAdmin.email}
          </p>
        </div>

        {/* Toggle Button for Users */}
        <button
          onClick={toggleUsersVisibility}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isUsersVisible ? "Hide Users" : "View All Users"}
        </button>

        {/* Users List (toggle visibility) */}
        {isUsersVisible && (
          <div className="bg-gray-700 rounded-lg p-4 mt-4 space-y-4">
            <h3 className="text-xl text-gray-200 mb-4">Users List</h3>
            {users.length === 0 ? (
              <p className="text-gray-400">No users found.</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="bg-gray-600 p-4 sm:p-6 rounded-md hover:bg-gray-500 transition duration-300 ease-in-out transform hover:scale-105">
                  {/* Name Section */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-200 font-medium text-sm sm:text-base">Name:</p>
                    <span className="text-gray-400 text-sm sm:text-base">{user.name}</span>
                  </div>

                  {/* Email Section */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-200 font-medium text-sm sm:text-base">Email:</p>
                    <span className="text-gray-400 text-sm sm:text-base">{user.email}</span>
                  </div>

                  {/* Mobile Section */}
                  <div className="flex items-center justify-between">
                    <p className="text-gray-200 font-medium text-sm sm:text-base">Mobile:</p>
                    <span className="text-gray-400 text-sm sm:text-base">{user.phoneNumber}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
