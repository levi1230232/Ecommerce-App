import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import toast từ react-hot-toast
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const res = await axios.post(`http://localhost:8080/auth/register`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    }
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className='h-screen flex justify-center items-center h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 '>
      <Toaster /> 
      <form onSubmit={handleSubmit} className='w-96 p-8 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required className='mt-1 p-2 border rounded-lg w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} required className='mt-1 p-2 border rounded-lg w-full'
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
