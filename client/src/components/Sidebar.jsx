import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category/categories');
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error('Response data does not contain categories array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-700 text-white flex flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold mx-4 py-4">Categories</h2>
      <ul className="flex flex-row mx-4 space-x-4 flex-grow text-center">
        {categories.map((category) => (
          <li key={category.id} className="p-3 w-full bg-blue-500 rounded ">
            <Link to={`/products_categories/${category.id}`} className="block hover:text-gray-300">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
