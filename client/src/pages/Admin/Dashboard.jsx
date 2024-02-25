import React from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Product from './../../components/Product';

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="mt-4 flex flex-wrap">
          <NavLink to="/categories/create">
            <button className="mr-4 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              Create Category
            </button>
          </NavLink>
          <NavLink to="/products/create">
            <button className="mr-4 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              Create Product
            </button>
          </NavLink>
          <NavLink to="/category_product/create">
            <button className="mr-4 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              Add Category To Product
            </button>
          </NavLink>
        </div>
        <div className="mt-8 flex flex-wrap">
          <NavLink to="/categories/update">
            <button className="mr-4 mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50">
              Update Category
            </button>
          </NavLink>
          <NavLink to="/products/update">
            <button className="mr-4 mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50">
              Update Product
            </button>
          </NavLink>
          <NavLink to="/orders/update">
            <button className="mr-4 mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50">
              Update Order
            </button>
          </NavLink>
        </div>
        <div className="mt-8 flex flex-wrap">
          <NavLink to="/categories/delete">
            <button className="mr-4 mb-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50">
              Delete Category
            </button>
          </NavLink>
          <NavLink to="/products/delete">
            <button className="mr-4 mb-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50">
              Delete Product
            </button>
          </NavLink>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
