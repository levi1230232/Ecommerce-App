import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from './pages/Policy,';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import ProductDescription from './pages/ProductDescription';
import FilterByCategory from './pages/FilterByCategory';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Dashboard from './pages/Admin/Dashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import UpdateCategory from './pages/Admin/UpdateCategory';
import DeleteCategory from './pages/Admin/DeleteCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import DeleteProduct from './pages/Admin/DeleteProduct';
import UpdateOrder from './pages/Admin/UpdateOrder';
import CreateCategoryProduct from './pages/Admin/CreateCategoryProduct';


const App = () => {
  return (
    <>
      <Routes> 
        <Route path='/' element={<Home/>}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/products/:id" element={<ProductDescription/>}/>
        <Route path="/products_categories/:categoryId" element={<FilterByCategory/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/categories/create" element={<CreateCategory/>} />
        <Route path="/categories/update" element={<UpdateCategory/>} />
        <Route path="/categories/delete" element={<DeleteCategory/>} />
        <Route path="/products/create" element={<CreateProduct/>} />
        <Route path="/products/update" element={<UpdateProduct/>} />
        <Route path="/products/delete" element={<DeleteProduct/>} />
        <Route path="/orders/update" element={<UpdateOrder/>} />
        <Route path="/category_product/create" element={<CreateCategoryProduct/>} />

      </Routes>
    </>
  )
}

export default App