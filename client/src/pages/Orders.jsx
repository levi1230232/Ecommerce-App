import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/orders/getAll?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    if (userId) {
      fetchOrders();
    }
  }, [userId, token]);
  

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id} className="border-b border-gray-300 py-4">
              <div className="text-sm">Order Placed Time: {order.order_placed_time}</div>
              <div className="text-sm">Status: {order.status}</div>
              <div className="text-sm">Total Cost: {order.total_cost}</div>
              <div className="text-sm">Description:</div>
              <ul className="list-disc ml-6">
                {order.description.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className='flex justify-between items-center'>
          <Link to="/" className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back to Home</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
