import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <>
      <Layout>
      <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:order-2">
              <img src="/image/about.jpeg" alt="about" className="w-full rounded-lg" />
            </div>
            <div className="md:order-1">
              <div className="text-lg font-semibold text-gray-800 my-12">
                About Us
              </div>
              <p className="text-gray-600 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae commodo ligula. Quisque ultricies
                urna et nisl pharetra, sit amet rhoncus ligula fringilla. Nullam lobortis tempus ipsum, nec efficitur ex
                bibendum et. Proin ut diam in purus efficitur blandit id id mauris. Phasellus euismod nulla ac libero
                fermentum malesuada. Curabitur ut pulvinar metus. Nunc vitae mauris suscipit, finibus nisi vel,
                tincidunt nunc. Nam vitae nulla ultricies, ullamcorper odio at, volutpat quam. Donec ut risus ut justo
                rhoncus congue vel non felis. Fusce quis ante vel mauris sollicitudin scelerisque.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default About