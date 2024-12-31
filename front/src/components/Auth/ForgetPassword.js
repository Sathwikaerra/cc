import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // This imports the default styles for Toastify
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState('');

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/forgot-password', { email });
      if (response.status === 200) {
        setResetToken(response.data.resetToken); // Store the reset token
        toast.success('Enter the OTP and verify');
        
        // Send OTP
        const sendOtp = await axios.post('/send-otp', { email });
        if (sendOtp.status === 200) {
          setIsOtp(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  // Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/reset-password', {
        resetToken,
        email,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('Password has been reset successfully!');
        navigate('/auth');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post('/verify-otp', { email, otp });
      if (res.status === 200) {
        setIsOtp(false);
        setIsReset(true);
        toast.success('OTP verified successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Wrong OTP.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800">
      <form
        onSubmit={isReset ? handleResetPassword : handleForgotPassword}
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-lg rounded-lg p-8 w-80"
      >
        <h2 className="text-2xl text-white font-bold mb-6">
          {isReset ? 'Reset Password' : 'Forgot Password'}
        </h2>

        {/* Email input (only shown in Forgot Password) */}
        {!isReset && (
          <div className="mb-4">
            <label className="block text-white mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        )}

        {/* OTP input (only shown after forgot password is submitted) */}
        {isOtp && (
          <div className="mb-4">
            <label className="block text-white mb-2">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* New Password input (only shown in Reset Password) */}
        {isReset && (
          <div className="mb-4">
            <label className="block text-white mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        )}

        {/* Submit Button */}
        {!isOtp &&
         <button
         type="submit"
         disabled={loading}
         className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
       >
         {loading ? (isReset ? 'Resetting...' : 'Sending...') : isReset ? 'Reset Password' : 'Send Reset Link'}
       </button>
        }
       
      </form>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ForgotPassword;
