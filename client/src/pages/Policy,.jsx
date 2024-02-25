import React from 'react';
import Layout from '../components/Layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
        <div className="container mx-auto py-10">
          <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla ante eget arcu suscipit, et eleifend eros varius. 
              Nulla facilisi. Sed ultricies felis id tortor tempus, vitae fermentum nisl tincidunt. 
            </p>
            <p className="text-gray-600 mb-4">
              Duis id sodales turpis, vitae convallis leo. Pellentesque vitae ullamcorper ex. 
              Integer auctor velit sit amet elit placerat, ut tincidunt metus malesuada. 
            </p>
            <p className="text-gray-600 mb-4">
              Nam aliquam, metus non viverra tempor, nibh velit lacinia mauris, vel pharetra neque orci vel mi. 
              Aenean ut enim non augue mollis commodo nec a diam. 
            </p>
            <p className="text-gray-600 mb-4">
              Sed elementum, dui sed dignissim pretium, odio nisi efficitur enim, a gravida magna urna vel turpis. 
              Duis hendrerit ipsum purus, eu viverra sem dapibus sed. 
            </p>
          </div>
        </div>
    </Layout>
  );
}

export default PrivacyPolicy;
