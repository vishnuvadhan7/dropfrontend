// components/DroperDashboard.jsx
import React, { useState } from 'react';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { FaBicycle } from "react-icons/fa"; // Using react-icons for the bike

// Mock data for the list
const doperList = [
  { id: 1, name: 'Student Dorms B', rating: 5, status: 'Active' },
  { id: 2, name: 'Student Dorms B', rating: 5, status: 'Active' },
  { id: 3, name: 'Pikram K.', rating: 4, status: 'Inactive' },
];

// 1. Accept the 'onAcceptOrder' prop from App.js
const DroperDashboard = ({ onAcceptOrder }) => {
  const [tab, setTab] = useState('pending');

  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setTab(id)}
      className={`pb-2 border-b-2 ${
        tab === id
          ? 'border-blue-500 text-blue-500'
          : 'border-transparent text-gray-500'
      } font-medium`}
    >
      {label} {count && `(${count})`}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-2 font-sans">
      <div className="max-w-md mx-auto bg-gray-100 rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gray-100">
          <div className="flex justify-between items-center mb-4">
            <Bars3Icon className="h-6 w-6 text-gray-700" />
            <h1 className="text-xl font-bold text-gray-800">Droper Dashboard</h1>
            <div className="w-6"></div> {/* Spacer */}
          </div>
          
          {/* Tabs */}
          <div className="flex justify-around">
            <TabButton id="pending" label="Pending" count={3} />
            <TabButton id="picked" label="Picked" count={1} />
            <TabButton id="delivered" label="Delivered" count={12} />
          </div>
        </div>

        {/* Doper List */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Droper List</h2>
          <div className="space-y-3">
            {doperList.map((doper) => (
              <div key={doper.id} className="bg-white p-3 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center">
                  <UserCircleIcon className="h-10 w-10 text-gray-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{doper.name}</h3>
                    <div className="flex">
                      {'★'.repeat(doper.rating)}{'☆'.repeat(5 - doper.rating)}
                    </div>
                  </div>
                </div>
                {doper.status === 'Active' ? (
                  <FaBicycle className="h-5 w-5 text-green-500" />
                ) : (
                  <span className="text-sm text-gray-400">{doper.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order ID Card */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Order ID</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaBicycle className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-800">University Library</h3>
                  <div className="flex text-yellow-500">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <FaBicycle className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="flex space-x-3">
              {/* 2. Call the prop on click */}
              <button 
                onClick={onAcceptOrder}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold"
              >
                Accept
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold">
                Reject
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DroperDashboard;