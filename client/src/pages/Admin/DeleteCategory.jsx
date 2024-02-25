import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
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

  const handleDeleteCategory = async (categoryId) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.delete(
        `http://localhost:8080/category/deleteCategory/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      console.log('Category deleted successfully:', response.data);
      setCategories(categories.filter(category => category.id !== categoryId));
      toast.success('Category deleted successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Error deleting category:', error);
      toast.error('An error occurred while deleting the category. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Delete Category</h2>
      {isLoading && <p>Loading categories...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {categories.map(category => (
        <div key={category.id} className="flex items-center justify-between border-b py-2">
          <span>{category.name}</span>
          <button
            onClick={() => handleDeleteCategory(category.id)}
            className="text-red-500 hover:text-red-600"
          >
            &#10006;
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default DeleteCategory;
