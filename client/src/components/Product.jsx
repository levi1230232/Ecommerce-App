import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');

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
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product/products');
        setProducts(response.data.product);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [userId]);

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
    <div className="grid grid-cols-4 gap-5 m-4">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="p-4 bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] min-h-96">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <div className="text-gray-900 font-bold text-lg mb-2">{product.name}</div>
              <div className="text-gray-700">{product.short_description}</div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-800 font-bold">{product.price}</div>
                <div className="text-gray-600">{product.rating_count} ratings</div>
              </div>
            </Link>
            <button onClick={() => handleAddToCart(product.id)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-700">No products available</div>
      )}
    </div>
  );
};

export default Product;
