import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onsubmit }) => {
  const navigate=useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    id: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [signup, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // State to toggle Terms and Conditions
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signup) {
      if (!inputs.name || !inputs.phoneNumber || !inputs.id) {
        showToast('Please fill in all required fields for signup.', 'error');
        return;
      }

      if (!agreedToTerms) {
        showToast('You must agree to the Terms and Conditions to sign up.', 'error');
        return;
      }
    }

    if (!inputs.email || !inputs.password) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Call onsubmit prop
    onsubmit({ inputs, signup });
    // showToast(`Successfully ${signup ? 'signed up' : 'logged in'}!`, 'success');
  };

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast.info(message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-sm mx-auto text-gray-200 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
        {signup ? 'Signup' : 'Login'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {signup && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={inputs.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                ID
              </label>
              <input
                type="text"
                name="id"
                value={inputs.id}
                onChange={handleChange}
                placeholder="Enter your domain ID"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                required
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {signup && (
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="text-blue-400 hover:underline"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
            {showTerms && (
              <div className="mt-2 p-2 w-[270px] bg-gray-700 rounded-lg text-sm text-gray-300">
                <p>
                  We are not liable for any damages, including indirect or
                  consequential losses, arising from the use of our services.
                </p>
              </div>
            )}
          </div>
        )}

<button className=' p-1 text-red-500 underline hover:text-blue-950' onClick={()=>navigate('/forgetpassword')}>ForgetPassword</button>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {signup ? 'Signup' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setSignup(!signup)}
        className="mt-4 py-2 px-4 bg-purple-800 text-purple-100 font-semibold rounded-lg shadow-lg text-center text-sm hover:bg-purple-700 hover:shadow-xl hover:text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        {signup
          ? 'Already have an account? Login here.'
          : "Don't have an account? Signup here."}
      </button>
    </div>
  );
};

export default AuthForm;
