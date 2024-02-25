import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders/all');
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          throw new Error('Error fetching orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  const handleOrderChange = (orderId) => {
    const selected = orders.find(order => order.id === parseInt(orderId));
    setSelectedOrder(selected);
    setOrderStatus(selected.status);
  };

  const handleUpdateOrder = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.put(
        `http://localhost:8080/orders/${selectedOrder.id}`,
        {
          status: orderStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      toast.success('Order status updated successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating order status:', error);
      toast.error('An error occurred while updating the order status. Please try again.');
    }
  };

  const statusOptions = ['Processing', 'Shipping', 'Completed'];

  const formatOrderDescription = (description) => {
    return description.split('\n').map((item, index) => {
      return <p key={index}>{item}</p>;
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Order Status</h2>
      <div className="mt-4">
        <label htmlFor="order">Select Order:</label>
        <select id="order" className="w-full border border-gray-300 rounded px-3 py-2 mt-2" onChange={(e) => handleOrderChange(e.target.value)}
        >
          <option value="">Select an order</option>
          {orders && orders.map(order => (
            <option key={order.id} value={order.id}>{order.id}</option>
          ))}
        </select>
      </div>
      {selectedOrder && (
        <>
          <div className="mt-4">
            <p><strong>Order Description:</strong> {formatOrderDescription(selectedOrder.description)}</p>
            <p><strong>Order Date:</strong> {selectedOrder.order_placed_time}</p>
          </div>
          <div className="mt-4">
            <label htmlFor="orderStatus">Order Status:</label>
            <select id="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </>
      )}
      <button
        onClick={handleUpdateOrder}
        disabled={isLoading || !selectedOrder}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 ${isLoading || !selectedOrder ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Updating...' : 'Update Order Status'}
      </button>
      <ToastContainer />
    </div>
  );
};

export default UpdateOrder;
