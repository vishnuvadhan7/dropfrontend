// components/DroperDeliveryDetails.jsx
import React from 'react';
import { Bars3Icon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { FaCheckCircle } from 'react-icons/fa'; // For the green check

// 1. Accept the 'onBack' prop from App.js
const DroperDeliveryDetails = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-2 font-sans">
      <div className="max-w-md mx-auto bg-blue-600 rounded-2xl overflow-hidden shadow-lg">
        
        {/* Header */}
        <div className="p-4 text-white">
          <div className="flex justify-between items-center mb-4">
            {/* 2. Use 'onBack' for the back arrow */}
            <button onClick={onBack}>
              <ArrowLeftIcon className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-xl font-bold">Campus Drop</h1>
            <div className="w-6"></div> {/* Spacer */}
          </div>

          {/* Top Card */}
          <div className="bg-white text-gray-800 p-4 rounded-lg shadow mb-4">
            <p className="text-sm text-gray-500">Order ID</p>
            <h2 className="text-2xl font-bold">Campus Drop</h2>
            <p className="text-sm text-gray-500">Toul's Fact</p>
            {/* You can add the small graph icon here if needed */}
          </div>
        </div>
        
        {/* Active Deliveries */}
        <div className="bg-white p-4 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Active Deliveries</h2>
          
          {/* Delivery Card */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>Order ID</span>
              <span>Droper</span>
              <span>Status</span>
              <span>ETA</span>
            </div>
            <div className="flex justify-between items-center font-medium text-gray-800">
              <span className="text-blue-600">#ODR792</span>
              <span>University Library</span>
              <span className="text-yellow-600">...</span> {/* Placeholder for status */}
              <span>10 min</span>
            </div>
          </div>
          
          {/* Droper Info */}
          <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Droper</p>
              <p className="font-semibold text-gray-800">Arjun S.</p>
            </div>
            <span className="font-medium text-gray-800">81.5</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold">
              Navigate
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold">
              Update Status
            </button>
          </div>

          {/* Other Deliveries (Bottom List) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="text-sm text-gray-500">Droper</span>
              <span className="text-sm text-gray-500">Stats</span>
              <span className="text-sm text-gray-500">Natus</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Arjun S.</span>
              <span>...</span>
              <span>...</span>
              <span className="font-medium">40</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Arjun S.</span>
              <span>...</span>
              <span>...</span>
              <FaCheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DroperDeliveryDetails;