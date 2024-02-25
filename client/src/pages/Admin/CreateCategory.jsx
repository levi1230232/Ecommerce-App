import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCategory = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.post(
        'http://localhost:8080/category/createCategory',
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      setCategoryName('');
      toast.success('Category created successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating category:', error);
      const errorMessage = error.response ? error.response.data.error : 'An error occurred while creating the category. Please try again.';
      toast.error(errorMessage); 
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
      <div className="mt-4">
        <label htmlFor="categoryName" className="block font-semibold mb-2">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button onClick={handleCreateCategory} disabled={isLoading || !categoryName.trim()}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${isLoading || !categoryName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating...' : 'Create Category'}
        </button>
        <button onClick={() => navigate('/dashboard')} className="text-blue-500 hover:underline">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateCategory;
