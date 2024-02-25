import React from 'react'
import Layout from '../components/Layout/Layout'
import Sidebar from '../components/Sidebar'
import Products from '../components/Product'

const Home = () => {
  return (
    <div className='bg-gray-200'>
        <Layout>
          <Sidebar/>
          <Products/>
        </Layout>
    </div>
  )
}

export default Home