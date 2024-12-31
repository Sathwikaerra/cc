import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserAlt } from "react-icons/fa";
import { userActions } from '../store/reducers';
import CC2 from './CC2.jpg';


const Navbar = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isloggedIn);
  const isAdminLoggedIn=useSelector((state)=>state.admin.isloggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null); // Reference for mobile menu
  const mobileMenuToggleRef = useRef(null); // Reference for mobile menu toggle button

  // Function to toggle the menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logout = () => {
    dispatch(userActions.logout());
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) && 
        !mobileMenuToggleRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close menu if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup on component unmount
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 shadow-md">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-controls="navbar"
          className="text-white md:hidden flex items-center space-x-2"
          onClick={toggleMenu}
          ref={mobileMenuToggleRef} // Assign the ref to the toggle button
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-white flex text-[15px] justify-center items-center gap-3 text-3xl font-semibold tracking-wide">
          <img src={CC2} className='w-[25px] h-[25px]' />Campus Connect
        </h1>
        {isUserLoggedIn &&  <li className='md:hidden list-none '>
              <Link
                to="/profile"
                className="text-white mx-auto  text-sm font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                <FaUserAlt className="inline-block mr-2 text-lg" />
              </Link>
            </li> }
       

        {/* Links */}
        {isUserLoggedIn ? (
          <ul id="navbar" className={`flex space-x-8 hidden md:flex flex-row`}>
            <li>
              <Link
                to="/"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                <FaUserAlt className="inline-block mr-2 text-md" /> Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={() => logout()}
                to="/"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul id="navbar" className={`flex space-x-8 hidden md:flex flex-row`}>
            <li>
              <Link
                to="/"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                Services
              </Link>
            </li>
            {/* <li>
              <Link
                to="/contact"
                className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
              >
                Contact
              </Link>
            </li> */}
          </ul>
        )}
        
      </div>

      {/* Mobile Menu (new div container) */}
      {isUserLoggedIn ? isMenuOpen && (
        <div className="md:hidden bg-gray-800 mt-[60px] w-[200px] h-[250px] bg-opacity-80 absolute inset-0 items-center z-10" ref={mobileMenuRef}>
          <ul className="space-y-4 text-left text-white p-2 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Contact
              </Link>
            </li>
            {/* <li>
              <Link
                to="/profile"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Profile
              </Link>
            </li> */}
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => { setIsMenuOpen(false); logout(); }} // Close menu on click
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : isMenuOpen && (
        <div className="md:hidden bg-gray-800 mt-[60px] w-[200px] h-[300px] bg-opacity-80 absolute inset-0 items-center z-10" ref={mobileMenuRef}>
          <ul className="space-y-4 text-left text-white p-2 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Services
              </Link>
            </li>
            {/* <li>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
