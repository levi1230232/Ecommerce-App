import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = () => {
  const { categoryId } = useParams(); 
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/category/categories');
        setCategories(response.data.categories);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError('An error occurred while fetching categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId && categories.length > 0) {
      const selected = categories.find(category => category.id === parseInt(selectedCategoryId));
      setSelectedCategory(selected);
      setCategoryName(selected.name);
    }
  }, [selectedCategoryId, categories]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleUpdateCategory = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.put(
        `http://localhost:8080/category/updateCategory/${selectedCategoryId}`,
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      console.log('Category updated successfully:', response.data);
      toast.success('Category updated successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating category:', error);
      toast.error('An error occurred while updating the category. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Category</h2>
      <div className="mt-4">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
          value={selectedCategoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="categoryName" className="block">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
        />
      </div>
      <button
        onClick={handleUpdateCategory}
        disabled={isLoading || !selectedCategoryId}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 ${isLoading || !selectedCategoryId ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Updating...' : 'Update Category'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default UpdateCategory;
