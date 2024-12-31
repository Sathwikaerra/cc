import React, { useState } from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/reducers';
import { toast } from 'react-toastify';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});

  // Utility function to show messages
  const showMessage = (text, type) => {
    if (type === 'success') {
      toast.success(text);
    } else {
      toast.error(text);
    }
  };

  // Handle OTP Verification
  const handleOTPSubmit = async () => {
    try {
      const response = await axios.post(`/verify-otp`, { email, otp });
      if (response.status === 200) {
        showMessage('OTP Verified Successfully!', 'success');

        // Login the user after successful OTP verification
        dispatch(userActions.login());
        dispatch(userActions.loginSuccess(userData));

        localStorage.setItem('UserName', userData.name);
        localStorage.setItem('UserId', userData._id);
        localStorage.setItem('UserEmail', userData.email);

        navigate('/');
      } else {
        showMessage('Invalid OTP. Please try again.', 'error');
      }
    } catch (err) {
      showMessage('Failed to verify OTP. Please try again.', 'error');
    }
  };

  // Handle OTP Sending and User Signup
  const handleSendOtp = async (inputs) => {
    try {
      const saveResponse = await axios.post(`/user/signup`, inputs);

      if (saveResponse.status === 200) {
        // Save user data and send OTP
        setUserData(saveResponse.data.newUser);
        setEmail(inputs.email);

        const otpResponse = await axios.post(`/send-otp`, { email: inputs.email });
        if (otpResponse.status === 200) {
          setOtpSent(true);
          showMessage('OTP sent successfully!', 'success');
        } else {
          showMessage('Failed to send OTP. Please try again.', 'error');
        }
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          showMessage(data.message || 'Email already exists.', 'error');
        } else if (status === 401) {
          showMessage(data.message || 'ID already exists.', 'error');
        } else {
          showMessage(data.message || 'An unexpected error occurred.', 'error');
        }
      } else {
        showMessage('Network error. Please check your connection.', 'error');
      }
    }
  };

  // Handle Login
  const handleLogin = async (inputs) => {
    try {
      const response = await axios.post(`/user/login`, {
        password: inputs.password,
        email: inputs.email,
      });

      if (response.status === 200) {
        dispatch(userActions.login());
        dispatch(userActions.loginSuccess(response.data.newUser));

        localStorage.setItem('UserName', response.data.newUser.name);
        localStorage.setItem('UserId', response.data.newUser._id);
        localStorage.setItem('UserEmail', response.data.newUser.email);

        navigate('/');
        showMessage('User logged in successfully!', 'success');
      } else {
        showMessage('Invalid Credentials', 'error');
      }
    } catch (err) {
      showMessage('Invalid Credentials', 'error');
    }
  };

  // Handle Form Submission
  const handleAuthSubmit = (data) => {
    if (data.signup) {
      handleSendOtp(data.inputs);
    } else {
      handleLogin(data.inputs);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col mt-16">
        {otpSent ? (
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <button
              onClick={handleOTPSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <AuthForm onsubmit={handleAuthSubmit} />
        )}
      </div>
    </div>
  );
};

export default Auth;
