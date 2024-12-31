import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const services = [
  {
    title: 'Food Delivery',
    description:
      "Our Campus Food Delivery Service is run by students, for students. We help each other by delivering meals from out-of-campus restaurants directly. Fast, reliable, and student-powered—order and support your peers today!",
    icon: '🍔',
    image: 'https://png.pngtree.com/png-clipart/20241117/original/pngtree-cartoon-boy-delivering-food-png-image_17150282.png', // Replace this with the actual image URL
  },
  // Additional services can go here
];

const ServicesPage = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isloggedIn);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-900">
      {/* Centered "Our Services" heading */}
      <div className="container mx-auto px-3 py-10 text-center">
        <h1 className="text-2xl font-semibold text-white mb-8">
          Our Services
        </h1>
      </div>

      {/* Centered container for GIF and food delivery service */}
      <div className="container mx-auto px-3 py-10 flex justify-center items-center space-x-8">
        {/* GIF section */}
        <div className="flex-1">
          <img
            src="https://media0.giphy.com/media/JVsitQAP1MvAMv2cQV/giphy.gif?cid=6c09b9521b8mxy03aqqv3k3iy6ydt4b1gd4yu22yiluth67a&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="GIF"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Food Delivery service */}
        <div onClick={() => navigate('/orders')} className="flex-1 p-5 rounded-3xl flex flex-col justify-center items-center font-semibold text-center transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-400 hover:shadow-xl outline-1 outline-gray-200 bg-slate-300 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-gray-100">
          <h3 className="text-xl text-black font-medium mb-3 text-shadow-md">
            {services[0].title}
          </h3>
          <img
            src={services[0].image}
            alt={services[0].title}
            className="w-[120px] h-[120px] rounded-full shadow-md mb-3"
          />
        </div>
      </div>

      {/* Caution note */}
      <div className="container mx-auto px-3 py-2.5 bg-yellow-100 text-black text-center shadow-md mb-13">
        <p className="text-lg font-bold">
          ⚠️ Caution: Each food parcel will incur a delivery charge of ₹10.
        </p>
      </div>

      {/* Keep a request button */}
      <div className="mt-[60px] p-4 text-center">
        <p className='text-cyan-400 m-2  flex justify-center items-center gap-3'>
          <div className='w-[15px] h-[9px]  rounded-full bg-red-700'></div>
          <span className='text-[10px]'>If You want to be notified by Outside users, make a Pre-request</span>
        </p>
        {isUserLoggedIn && (
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4.5 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
            onClick={() => navigate('/requests')}
          >
            Keep a Request
          </button>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
