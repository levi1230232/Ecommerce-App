import React from 'react'
import Layout from '../components/Layout/Layout'

const Contact = () => {
  return (
    <>
      <Layout>
        <div className='container mx-auto py-10'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-14">
            <div>
              <img src="/image/contact.jpeg" alt="contact" className="w-full rounded-lg" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800 mb-4">
                Contact Us
              </div>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae commodo ligula. Quisque ultricies
                urna et nisl pharetra, sit amet rhoncus ligula fringilla. Nullam lobortis tempus ipsum, nec efficitur ex
                bibendum et. Proin ut diam in purus efficitur blandit id id mauris. Phasellus euismod nulla ac libero
                fermentum malesuada. Curabitur ut pulvinar metus. Nunc vitae mauris suscipit, finibus nisi vel,
                tincidunt nunc.
              </p>
              <p className="text-gray-600 mb-4">
                Address: 123 ABC Street, XYZ City
              </p>
              <p className="text-gray-600 mb-4">
                Phone: +123 456 789
              </p>
              <p className="text-gray-600">
                Email: info@example.com
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Contact