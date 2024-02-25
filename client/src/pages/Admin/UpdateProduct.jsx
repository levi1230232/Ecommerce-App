import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productShortDescription, setProductShortDescription] = useState('');
  const [productLongDescription, setProductLongDescription] = useState('');
  const [productRatingCount, setProductRatingCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setProductName(selected.name);
    setProductPrice(selected.price);
    setProductImage(selected.image);
    setProductShortDescription(selected.short_description);
    setProductLongDescription(selected.long_description);
    setProductRatingCount(selected.rating_count);
  };

  const handleUpdateProduct = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.put(
        `http://localhost:8080/product/products/${selectedProduct.id}`,
        {
          name: productName,
          price: productPrice,
          image: productImage,
          short_description: productShortDescription,
          long_description: productLongDescription,
          rating_count: productRatingCount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      console.log('Product updated successfully:', response.data);
      toast.success('Product updated successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating product:', error);
      toast.error('An error occurred while updating the product. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
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
      {selectedProduct && (
        <>
          <div className="mt-4">
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"/>
          </div>
          <div className="mt-4">
            <label htmlFor="productPrice">Product Price:</label>
            <input type="text" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"/>
          </div>
          <div className="mt-4">
            <label htmlFor="productImage">Product Image:</label>
            <input type="text" id="productImage" value={productImage} onChange={(e) => setProductImage(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"/>
          </div>
          <div className="mt-4">
            <label htmlFor="productShortDescription">Product Short Description:</label>
            <input type="text" id="productShortDescription" value={productShortDescription} onChange={(e) => setProductShortDescription(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="productLongDescription">Product Long Description:</label>
            <textarea id="productLongDescription" value={productLongDescription} onChange={(e) => setProductLongDescription(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"/>
          </div>
          <div className="mt-4">
            <label htmlFor="productRatingCount">Product Rating Count:</label>
            <input type="number" id="productRatingCount" value={productRatingCount} onChange={(e) => setProductRatingCount(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"/>
          </div>
        </>
      )}
      <button
        onClick={handleUpdateProduct}
        disabled={isLoading || !selectedProduct}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 ${isLoading || !selectedProduct ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Updating...' : 'Update Product'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
