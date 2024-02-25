import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import Layout from '../components/Layout/Layout';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 
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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cart_products/cart_items', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            user_id: userId
          }
        });
        setCartItems(response.data.cartItems);
        console.log(response.data.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId, token]);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/cart_products/remove/${productId}`, {
        params: {
          user_id: userId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(cartItems.filter(item => item.product_id !== productId));
      console.log('Product removed from cart:', productId);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.product_price.replace(/[^0-9,-]+/g, '').replace(',', '.')) * item.quantity, 0);


  const handleCheckout = async () => {
    try {
      const cartItemDescriptions = cartItems.map(item => `${item.product_name}: ${item.quantity}`);
      const description = cartItemDescriptions.join('\n');
      await axios.post(`http://localhost:8080/orders/create`, {
      total_cost: totalAmount,
      description: description
    }, {
      params: {
        user_id: userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      await axios.delete(`http://localhost:8080/cart_products/checkout`, {
        params: {
          user_id: userId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/history');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product_id} className="flex items-center justify-between border-b border-gray-300 py-4">
              <div className="flex items-center">
                <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <div className="font-semibold text-lg">{item.product_name}</div>
                  <div className="text-gray-600 text-sm">Quantity: {item.quantity}</div>
                  <div className="text-gray-600 text-sm">Price: {parseFloat(item.product_price.replace(/[^0-9,-]+/g, '').replace(',', '.'))}đ</div>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.product_id)} className="text-red-500">X</button>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-lg">Total Quantity: {totalQuantity}</div>
            <div className="font-semibold text-lg">Total Amount: {totalAmount.toFixed(2)} đ</div>
        </div>
        
          <div className='flex justify-between items-center'>
            <Link to="/" className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back to Home</Link>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
          <div className='flex justify-between items-center'>
            <Link to="/history" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Purchase History
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
