import React, { useState, useEffect } from 'react';
import { 
  TruckIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ClockIcon, 
  ExclamationCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  // Mock data for the dashboard
  const [dashboardData, setDashboardData] = useState({
    totalDeliveries: 1242,
    totalRevenue: 24840,
    monthlyRevenue: [
      { month: 'Jan', revenue: 12000 },
      { month: 'Feb', revenue: 19000 },
      { month: 'Mar', revenue: 15000 },
      { month: 'Apr', revenue: 18000 },
      { month: 'May', revenue: 22000 },
      { month: 'Jun', revenue: 24000 },
    ],
    droperList: [
      { id: 1, name: 'Alex Johnson', photo: '', rating: 4.8, status: 'Active' },
      { id: 2, name: 'Maria Garcia', photo: '', rating: 4.9, status: 'Active' },
      { id: 3, name: 'James Wilson', photo: '', rating: 4.5, status: 'Inactive' },
      { id: 4, name: 'Sarah Miller', photo: '', rating: 4.7, status: 'Active' },
    ],
    activeDeliveries: [
      { orderId: '#ORD-001', droper: 'Alex Johnson', status: 'In Transit', eta: '25 mins' },
      { orderId: '#ORD-002', droper: 'Maria Garcia', status: 'Picked Up', eta: '45 mins' },
      { orderId: '#ORD-003', droper: 'James Wilson', status: 'Processing', eta: '1 hr' },
    ],
    pendingOrders: [
      { orderId: '#ORD-004', customer: 'John Doe', amount: 25.00, time: '10 mins ago' },
      { orderId: '#ORD-005', customer: 'Emma Watson', amount: 32.50, time: '15 mins ago' },
      { orderId: '#ORD-006', customer: 'Michael Brown', amount: 18.75, time: '20 mins ago' },
      { orderId: '#ORD-007', customer: 'Sophia Davis', amount: 41.20, time: '25 mins ago' },
    ]
  });

  // Simple bar chart component for monthly revenue
  const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(item => item.revenue));
    
    return (
      <div className="flex items-end justify-between h-32 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 px-1">
            <div className="text-xs text-gray-600 mb-1">{item.month}</div>
            <div 
              className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-all duration-300"
              style={{ height: `${(item.revenue / maxValue) * 100}%` }}
            ></div>
            <div className="text-xs text-gray-600 mt-1">{item.revenue/1000}k</div>
          </div>
        ))}
      </div>
    );
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Cards - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Deliveries Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <TruckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardData.totalDeliveries.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{dashboardData.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Card */}
          <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{dashboardData.monthlyRevenue[dashboardData.monthlyRevenue.length - 1].revenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <BarChart data={dashboardData.monthlyRevenue} />
          </div>
        </div>

        {/* Second Row - Droper List and Active Deliveries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Droper List Card */}
          <div className="bg-white rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Droper List</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.droperList.map((droper) => (
                <div key={droper.id} className="px-6 py-4 flex items-center">
                  <div className="flex-shrink-0">
                    {droper.photo ? (
                      <img className="h-10 w-10 rounded-full" src={droper.photo} alt={droper.name} />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{droper.name}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        droper.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {droper.status}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center">
                      <StarRating rating={droper.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Deliveries Card */}
          <div className="bg-white rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Active Deliveries</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.activeDeliveries.map((delivery, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{delivery.orderId}</p>
                      <p className="text-sm text-gray-500">Droper: {delivery.droper}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {delivery.status}
                      </span>
                      <p className="mt-1 text-sm text-gray-500">ETA: {delivery.eta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row - Pending Orders */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pending Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.pendingOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 font-medium">
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;