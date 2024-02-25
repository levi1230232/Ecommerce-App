import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const handleProductChange = (productId) => {
    const selected = products.find(product => product.id === parseInt(productId));
    setSelectedProduct(selected);
  };

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.delete(
        `http://localhost:8080/product/products/${selectedProduct.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      toast.success('Product deleted successfully');
      // Optionally, update products list after deletion
    } catch (error) {
      setIsLoading(false);
      console.error('Error deleting product:', error);
      toast.error('An error occurred while deleting the product. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
      <div className="mt-4">
        <label htmlFor="product">Select Product:</label>
        <select
          id="product"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
          onChange={(e) => handleProductChange(e.target.value)}
        >
          <option value="">Select a product</option>
          {products && products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleDeleteProduct}
        disabled={isLoading || !selectedProduct}
        className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 ${isLoading || !selectedProduct ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Deleting...' : 'Delete Product'}
      </button>
      <ToastContainer />
    </div>
  );
};

export default DeleteProduct;
