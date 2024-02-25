import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    short_description: '',
    long_description: '',
    rating_count: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.post(
        'http://localhost:8080/product/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      console.log('Product created successfully:', response.data);
      toast.success('Product created successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating product:', error);
      toast.error('An error occurred while creating the product. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block">Product Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mt-2" required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="price" className="block">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mt-2" required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="image" className="block">Image URL:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mt-2" required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="short_description" className="block">Short Description:</label>
          <input type="text" id="short_description" name="short_description" value={formData.short_description} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="long_description" className="block">Long Description:</label>
          <textarea id="long_description" name="long_description" value={formData.long_description} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="rating_count" className="block">Rating Count:</label>
          <input type="number" id="rating_count" name="rating_count" value={formData.rating_count} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;
