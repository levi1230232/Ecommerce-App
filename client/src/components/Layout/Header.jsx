import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { FaCartShopping } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigateTo = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8080/auth/userinfo', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsLoggedIn(true);
          if (response.data.user.role === 1) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false); 
    toast.success('Logged out successfully');
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigateTo('/cart'); 
    } else {
      navigateTo('/login');
    }
  };

  return (
    <>
      <nav>
        <div className="bg-green-400 w-full h-20 border-b-2">
          <div className="flex justify-between items-center w-full h-20">
            <div className="text-white font-bold text-xl font-serif flex flex-row items-center mr-3">
              <FaCartShopping className="mx-3 size-7" />
              Ecommerce App
            </div>
            <div className="flex-grow">
            </div>
            <div className="text-white">
              <BsCart4 className="ml-3 size-7 cursor-pointer" onClick={handleCartClick} />
            </div>
            <div className="text-white ml-5">
              {isLoggedIn ? (
                <div className="flex items-center ml-2">
                  {isAdmin && (
                    <NavLink to="/dashboard">
                      <button className="mr-3 px-5 py-3 rounded-lg bg-yellow-500">Dashboard</button>
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className="mr-3 px-5 py-3 rounded-lg bg-red-700">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <NavLink to="/login">
                    <button className="mr-3 px-5 py-3 rounded-lg bg-green-700">Sign In</button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="mr-3 px-5 py-3 rounded-lg bg-blue-900">Sign up</button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
