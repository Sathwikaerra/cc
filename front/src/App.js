// src/App.js
import React, { useEffect } from 'react';
import './App.css'; // Optional: for global styles

import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"  // Updated imports
import HomePage from './components/Homepage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import {userActions } from './store/reducers'
import ForgetPassword from './components/Auth/ForgetPassword'

import Auth from './components/Auth/Auth';
import { ToastContainer, toast } from 'react-toastify';
import Profile from './components/Profile';
import ToggleActiveStatus from './components/UpdateStatus'
import ActiveUsers from './components/ActiveUsers'; 
import ToggleRequestStatus from './components/UserRequest'
import Ordering from './components/Ordering'
import RequestUsers from './components/RequestUsers'
import UpdatePassword from './components/UpdatePassword';
import AdminLogin from './components/Auth/AdminLogin';
import AdminProfile from './components/AdminProfile';
import AdminNavbar from './components/AdminNavbar';




function App() {
  const dispatch=useDispatch()
  const isUserLoggedIn=useSelector((state)=>state.user.isloggedIn);
  const isAdminLoggedIn=useSelector((state)=>state.admin.isloggedIn);

  useEffect(()=>{
    if(localStorage.getItem("userId"))
      {
        dispatch(userActions.login())
        
      }

  },[dispatch])
  return (
    
    <div className="App  bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      <ToastContainer/>
      {isAdminLoggedIn?<AdminNavbar/> :<Navbar/>}
    
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/About' element={<AboutPage/>}/>
        <Route path='/Services' element={<ServicesPage/>}/> 
        {isUserLoggedIn && <Route path='/Contact' element={<ContactPage/>}/>   }
        {!isUserLoggedIn && !isAdminLoggedIn && <Route path='/forgetpassword' element={<ForgetPassword/>}/>}   
        
        {isUserLoggedIn && <Route path='/profile' element={<Profile/>}/>} 
        {isUserLoggedIn && <Route path='/update-status' element={<ToggleActiveStatus/>}/>}
        {isUserLoggedIn && <Route path='/orders' element={<ActiveUsers/>}/>}
        {isUserLoggedIn && <Route path='/orders/:userId' element={<Ordering/>}/>}
        {isUserLoggedIn && <Route path='/requests' element={<ToggleRequestStatus/>}/>}
        {isUserLoggedIn && <Route path='/requestusers' element={<RequestUsers/>}/>}
        {isUserLoggedIn && <Route path='/update-password' element={<UpdatePassword/>}/>}
        {
          //secretRoute .....
         !isUserLoggedIn && !isAdminLoggedIn && <Route path='/admin-login' element={<AdminLogin/>}/> 
        }
        {
          isAdminLoggedIn && <Route path='/admin/dashboard' element={<AdminProfile/>}/>
        }
        {
          !isAdminLoggedIn && !isUserLoggedIn &&  <Route path="*" element={<Navigate to="/" replace />} />

        }

        

{       !isUserLoggedIn &&  <Route path='/auth' element={<Auth/>}/>
}      </Routes>
    </div>
  );
}

export default App;
