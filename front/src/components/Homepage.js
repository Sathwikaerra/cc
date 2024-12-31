import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTruck, FaSignInAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./style.css";
import { getActiveUsers, getRequestUsers } from "./ApI/Api";
import axios from "axios";

function HomePage() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [requestUsers, setRequestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
  
  const isUserLoggedIn = useSelector((state) => state.user.isloggedIn);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const activeRes = await getActiveUsers();
        setActiveUsers(activeRes?.users || []);
        const requestRes = await getRequestUsers();

        setRequestUsers(requestRes?.users || []);
        const response = await axios.get("/user/allusers");
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data. Please try again later.");
      } finally {

        setLoading(false);
      }
    };

    fetchUsers();
  }, [isUserLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section with Background Image */}
      <section
        className="relative h-[225px] sm:h-[360px] w-full flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/hm.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative mt-[-70px] text-center text-white bg-opacity-30 p-3rounded-md">
          <h1 className="text-xl sm:text-3xl font-bold opacity-90">"Integrating Ourselves"</h1>
          <p className="text-xs mt-1 sm:text-md opacity-80">From the Student,By the Student,For the Student</p>
        </div>
      </section>

      {!isUserLoggedIn ? (
        <div className="flex justify-center items-center md:h-[450px] h-[380px] bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
          <div className="bg-blue-500 flex justify-center items-center flex-col text-white rounded-lg p-3 max-w-md w-[225px] text-center shadow-lg">
            <p className="text-[15px] font-semibold mb-3">Please Login to Continue</p>
            <Link to="/auth">
              <button className="flex items-center justify-center bg-white text-blue-500 py-2 px-3 rounded-full shadow-md hover:bg-blue-100 transition duration-300">
                <FaSignInAlt className="mr-2" />
                Login
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <main className="flex-1 flex-col p-7">
          <h2 className="text-lg sm:text-xl font-semibold text-white text-center">
            Welcome to Campus Connect!
          </h2>
          {loading ? (
            <div className="flex justify-center mt-3">
              <p className="text-gray-500">Loading user data...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center mt-3">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div>
                  {/* <marquee className="text-white text-[20px]">{users?.length || 25} users using our services</marquee> */}

            <div className="flex justify-center gap-3 mt-3">
      <div className="bg-blue-500 text-white rounded-lg px-3 py-1.5 shadow-md">
                <p className="font-semibold">
                  Outside Users: {activeUsers.length > 0 ? activeUsers.length : "0"}
                </p>
              </div>
              <div className="bg-orange-500 text-white rounded-lg px-3 py-1.5 shadow-md">
                <p className="font-semibold">
                  Waiting Users: {requestUsers.length > 0 ? requestUsers.length : "0"}
                </p>
              </div>
            </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-7  p-4 flex items-center justify-center flex-col gap-3">
            <Link
              to="/Services"
              className="relative  flex justify-center items-center p-3 w-[270px] bg-green-600 rounded-3xl flex justify-start items-center gap-6 text-white font-bold shadow-lg text-center transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#c58048] hover:to-[#d88a3c]"
            >
              <FaShoppingCart className="text-xl" />
              On Campus
            </Link>
            <Link
              to="/update-status"
              className="relative flex justify-center items-center p-3 w-[270px] bg-green-600 rounded-3xl flex justify-start items-center gap-6 text-white font-bold shadow-lg text-center transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#b56a2b] hover:to-[#d88a3c]"
            >
              <FaTruck className="text-xl" />
              Off Campus
            </Link>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 relative bottom-0 text-white p-2 text-center">

        <p className="text-sm">&copy; 2024 GBH S-(322) Campus Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
