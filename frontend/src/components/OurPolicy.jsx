import React from 'react';
// Importing images/icons from your assets folder
import { assets } from '../assets/assets';  // Make sure this path is correct

const OurPolicy = () => {
  return (

    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm md:text-gray-700">

    
      <div>
        <img src={assets.exchange_icon} alt="Exchange Icon" className="w-12 mx-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400 ">
              Hassle-free exchanges available within 30 days of purchase for your convenience.
        </p>
      </div>

      <div>
        <img src={assets.quality_icon} alt="Quality Icon" className="w-12 mx-auto mb-5" />
        <p className="font-semibold mt-2">7-Day Return Policy</p>
        <p className="text-gray-400">
          Returns accepted within 7 days with full refund or replacement.
        </p>
      </div>

      <div>
        <img src={assets.support_img} alt="Support Icon" className="w-12 mx-auto mb-5" />
        <p className="font-semibold mt-2">Customer Support</p>
        <p className="text-gray-400">
          Our dedicated support team is available 24/7 to assist you with any queries.
        </p>
      </div>

    </div>
  );
};

export default OurPolicy;
