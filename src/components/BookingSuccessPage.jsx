// components/BookingSuccessPage.jsx

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const BookingSuccessPage = ({ onGoHome }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: '#B9BFC7' // "Elephant Grey"
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center">
        
        {/* Success Icon */}
        <FaCheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Booking Successful!
        </h1>
        <p className="text-gray-600 font-medium text-lg mb-8">
          Your order has been placed. A droper will be assigned shortly.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={onGoHome}
          className="w-full bg-[#87ceeb] text-white py-3 px-4 rounded-full font-bold text-lg hover:bg-[#6fb2d3] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition shadow-lg hover:shadow-xl"
          style={{
            boxShadow: '0 10px 25px -5px rgba(135, 206, 235, 0.4), 0 8px 10px -6px rgba(135, 206, 235, 0.3)'
          }}
        >
          Make Another Booking
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessPage;