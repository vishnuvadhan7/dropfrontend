// components/PaymentPage.jsx

import React, { useState } from 'react';
import { 
  MapPinIcon, 
  ArchiveBoxIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { MdDirectionsBike } from "react-icons/md";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";

// ✅ Accept onPayNow prop
const PaymentPage = ({ details, onBack, onPayNow }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  // ✅ Summary Field Component
  const SummaryField = ({ text, icon: Icon }) => (
    <div className="relative mb-4">
      <div className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-600 rounded-lg pr-10">
        {text}
      </div>
      <Icon className="h-6 w-6 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
    </div>
  );

  // ✅ Payment Method Button
  const PaymentButton = ({ id, name, icon: Icon, color }) => (
    <button
      onClick={() => setPaymentMethod(id)}
      className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 transition ${
        paymentMethod === id
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-6 w-6" style={{ color }} />
      <span className="ml-2 font-medium text-gray-700">{name}</span>
    </button>
  );

  // ✅ Handle Payment Action
  const handlePayNow = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    console.log('Processing payment for:', details, 'with method:', paymentMethod);

    // Navigate to payment success
    onPayNow();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#B9BFC7' }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
        
        {/* ✅ Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Campus Drop</h1>
          <p className="text-gray-600 font-medium text-lg">Secure Payment</p>
        </div>

        {/* ✅ Booking Summary */}
        <SummaryField text={details.pickupLocation} icon={MapPinIcon} />

        <SummaryField
          text={details.packageType === 'parcel' ? 'Parcel' : 'Personal Item'}
          icon={ArchiveBoxIcon}
        />

        {/* ✅ Delivery Mode */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          
          {/* Normal */}
          <div
            className={`p-4 rounded-lg border-2 text-left ${
              details.deliveryMode === 'normal'
                ? 'bg-blue-100 border-blue-400 text-blue-700'
                : 'bg-gray-50 border-gray-200 text-gray-400 opacity-70'
            }`}
          >
            <MdDirectionsBike className="h-7 w-7 mb-1" />
            <span className="block font-bold text-lg">Normal</span>
            <span className="block text-sm">₹15</span>
          </div>

          {/* Urgent */}
          <div
            className={`p-4 rounded-lg border-2 text-left ${
              details.deliveryMode === 'urgent'
                ? 'bg-blue-100 border-blue-400 text-blue-700'
                : 'bg-gray-50 border-gray-200 text-gray-400 opacity-70'
            }`}
          >
            <ClockIcon className="h-7 w-7 mb-1" />
            <span className="block font-bold text-lg">Urgent</span>
            <span className="block text-sm">₹30</span>
          </div>
        </div>

        {/* ✅ Payment Method Selection */}
        <p className="text-gray-600 font-medium mb-3">Choose Payment Method</p>

        <div className="flex space-x-3 mb-8">
          <PaymentButton id="gpay" name="GPay" icon={SiGooglepay} color="#EA4335" />
          <PaymentButton id="phonepe" name="PhonePe" icon={SiPhonepe} color="#6739B7" />
          <PaymentButton id="paytm" name="Paytm" icon={SiPaytm} color="#00B9F1" />
        </div>

        {/* ✅ Pay Now */}
        <button
          onClick={handlePayNow}
          className="
            w-full bg-[#87ceeb] text-white py-3 px-4 rounded-full font-bold text-lg
            hover:bg-[#6fb2d3] focus:outline-none focus:ring-2 focus:ring-blue-400 
            focus:ring-offset-2 transition shadow-lg hover:shadow-xl
          "
          style={{
            boxShadow:
              '0 10px 25px -5px rgba(135, 206, 235, 0.4), 0 8px 10px -6px rgba(135, 206, 235, 0.3)',
          }}
        >
          PAY NOW (₹{details.price})
        </button>

        {/* ✅ Back Button */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back to Booking
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;
