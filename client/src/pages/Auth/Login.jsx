import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/auth/login`, formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className='h-screen flex justify-center items-center h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 '>
      <Toaster />
      <form onSubmit={handleSubmit} className='w-96 p-8 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email' id='email' name='email' value={formData.email} onChange={handleChange} required className='mt-1 p-2 border rounded-lg w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} required className='mt-1 p-2 border rounded-lg w-full'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account? <Link to='/register' className="text-blue-500">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
