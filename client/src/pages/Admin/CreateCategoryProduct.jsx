import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product/products');
        setProducts(response.data.product);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

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

  const handleAddCategoryToProduct = async () => {
    try {
      if (!selectedProduct || !selectedCategory) {
        throw new Error('Please select both product and category');
      }
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.post(
        'http://localhost:8080/products_categories/add',
        {
          productId: selectedProduct,
          categoryId: selectedCategory
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      console.log('Category added to product successfully:', response.data);
      toast.success('Category added to product successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Error adding category to product:', error);
      toast.error(error.message || 'An error occurred while adding category to product. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Category to Product</h2>
      <div className="mt-4">
        <label htmlFor="product">Select Product:</label>
        <select id="product" className="w-full border border-gray-300 rounded px-3 py-2 mt-2" onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="category">Select Category:</label>
        <select id="category" className="w-full border border-gray-300 rounded px-3 py-2 mt-2" onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddCategoryToProduct}
        disabled={isLoading || !selectedProduct || !selectedCategory}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 ${isLoading || !selectedProduct || !selectedCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Adding...' : 'Add Category to Product'}
      </button>
      <ToastContainer />
    </div>
  );
};

export default CategoryProduct;
