import React, { useState } from 'react';
import {
  MapPinIcon,
  ArchiveBoxIcon,
  ShoppingBagIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { MdDirectionsBike } from "react-icons/md";

// ✅ Move InputBox outside of BookingPage to prevent re-creation on each render
const InputBox = React.memo(({ placeholder, value, onChange }) => (
  <div className="relative mb-5">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-5 py-3.5 border border-gray-300 rounded-xl bg-white 
                 shadow-inner pr-12 text-gray-800 placeholder-gray-400
                 focus:ring-4 focus:ring-sky-300 focus:border-sky-500 
                 transition-all duration-300"
    />
    
    {/* Icon inside input */}
    <MapPinIcon
      className="h-6 w-6 text-gray-400 absolute right-4 top-1/2 
                 -translate-y-1/2 pointer-events-none"
    />
  </div>
));

InputBox.displayName = 'InputBox';

const BookingPage = ({ onConfirmBooking }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [packageType, setPackageType] = useState(null);
  const [deliveryMode, setDeliveryMode] = useState(null);

  const handleConfirm = () => {
    if (!pickupLocation || !dropLocation || !packageType || !deliveryMode) {
      alert('Please fill in all fields to continue.');
      return;
    }

    const bookingDetails = {
      pickupLocation,
      dropLocation,
      packageType,
      deliveryMode,
      price: deliveryMode === 'normal' ? 15 : 30
    };

    onConfirmBooking(bookingDetails);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 
                    bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">

      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl 
                      shadow-2xl p-8 sm:p-10 w-full max-w-md transition-all duration-500
                      hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-sm tracking-tight">
            Campus Drop
          </h1>
          <p className="text-gray-600 font-medium text-lg mt-2">Book a Delivery</p>
        </div>

        {/* ✅ Pickup & Drop Input Fields */}
        <InputBox
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={setPickupLocation}
        />

        <InputBox
          placeholder="Drop Location"
          value={dropLocation}
          onChange={setDropLocation}
        />

        {/* Package Type Selection */}
        <div className="grid grid-cols-2 gap-5 my-8">
          <button
            onClick={() => setPackageType('parcel')}
            className={`flex flex-col items-center p-5 rounded-2xl border-2 shadow-sm 
                        transition-all duration-300 hover:scale-[1.03] ${
              packageType === 'parcel'
                ? 'bg-sky-100 border-sky-500 text-sky-700 shadow-md'
                : 'bg-white/70 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArchiveBoxIcon className="h-9 w-9 mb-1" />
            <span className="font-semibold text-base">Parcel</span>
          </button>

          <button
            onClick={() => setPackageType('personal')}
            className={`flex flex-col items-center p-5 rounded-2xl border-2 shadow-sm
                        transition-all duration-300 hover:scale-[1.03] ${
              packageType === 'personal'
                ? 'bg-sky-100 border-sky-500 text-sky-700 shadow-md'
                : 'bg-white/70 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingBagIcon className="h-9 w-9 mb-1" />
            <span className="font-semibold text-base">Personal Item</span>
          </button>
        </div>

        {/* Delivery Mode */}
        <p className="text-gray-700 font-semibold mb-3 text-lg">Delivery Mode</p>

        <div className="grid grid-cols-2 gap-5 mb-10">
          <button
            onClick={() => setDeliveryMode('normal')}
            className={`p-5 rounded-2xl border-2 shadow-sm transition-all duration-300
                        hover:scale-[1.03] text-left ${
              deliveryMode === 'normal'
                ? 'bg-sky-100 border-sky-500 text-sky-700 shadow-md'
                : 'bg-white/70 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MdDirectionsBike className="h-8 w-8 mb-1" />
            <span className="block font-bold text-xl">Normal</span>
            <span className="block text-sm">₹15</span>
            <span className="text-xs opacity-80">Standard Delivery</span>
          </button>

          <button
            onClick={() => setDeliveryMode('urgent')}
            className={`p-5 rounded-2xl border-2 shadow-sm transition-all duration-300
                        hover:scale-[1.03] text-left ${
              deliveryMode === 'urgent'
                ? 'bg-sky-100 border-sky-500 text-sky-700 shadow-md'
                : 'bg-white/70 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ClockIcon className="h-8 w-8 mb-1" />
            <span className="block font-bold text-xl">Urgent</span>
            <span className="block text-sm">₹30</span>
            <span className="block text-xs opacity-80">Express Delivery</span>
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 
                     text-white font-bold py-4 px-6 rounded-2xl shadow-lg
                     hover:from-sky-600 hover:to-blue-700 transition-all duration-300
                     transform hover:scale-[1.02] focus:ring-4 focus:ring-sky-300
                     focus:outline-none text-lg"
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
};

export default BookingPage;