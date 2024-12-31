import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {adminActions} from '../../store/reducers'

const AdminLogin = () => {
    const dispatch=useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  // To navigate after login

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/admin/login", { email, password });

      // If login is successful
      if (response.status === 200) {
        toast.success("Login successful");

        // Store the token and adminId in localStorage for future requests
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminId", response.data.adminId);
        localStorage.setItem("adminName", response.data.user.name);

        dispatch(adminActions.login());
        dispatch(adminActions.loginSuccess(response.data.user))
        

        // Redirect to the admin dashboard or another protected route
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mx-auto w-[300px] items-center mt-[50px] bg-gray-800">
      <div className="bg-gray-700 p-4 rounded-lg shadow-md text-gray-200 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-gray-200"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 text-white px-4 py-2 rounded ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
