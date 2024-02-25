import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(response.data.user.id);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleAddToCart = async (productId) => {
    try {
      if (!userId) {
        toast.error('Please login to add items to cart.');
        return;
      }
      
      await axios.post(
        'http://localhost:8080/cart_products/add', 
        { user_id: userId, product_id: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Product added to cart successfully.');
      console.log('Product added to cart:', productId);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-12">
        {product ? (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
            </div>
            <div className='mt-20'>
              <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
              <div className="text-gray-700 mb-4">{product.long_description}</div>
              <div className="flex justify-between items-center">
              <div className="text-gray-800 font-bold">{product.price}</div>
              <div className="text-gray-600">{product.rating_count} ratings</div>
              </div>
              <button onClick={() => handleAddToCart(product.id)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="mt-8">
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDescription;
