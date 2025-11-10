import React from 'react';

// Replace these with your actual image URLs
const loginTopImageUrl = '/back.png';
const backgroundImageUrl = 'https://i.imgur.com/8aM0rMa.png';

// ✅ FIX: You MUST define illustrationUrl
const illustrationUrl = '/back.png'; 
// or: const illustrationUrl = 'https://i.imgur.com/L3Pq8k6.png';

const WelcomePage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#e0f2f7]">
      
      {/* Illustration ABOVE the card */}
      <div className="mb-5 -mt-38">
        <img 
          src={illustrationUrl}
          alt="Campus Delivery Illustration"
          className="w-48 h-auto mx-auto drop-shadow-lg"
        />
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 pt-12 w-full max-w-md text-center">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Campus Drop</h1>
          <p className="text-gray-600 text-lg">Fast & Fresh Campus Deliveries</p>
        </div>

        {/* Get Started Button */}
        <button
          onClick={onGetStarted}
          className="
            w-full text-white py-3 px-4 rounded-full font-bold text-lg
            bg-gradient-to-r from-blue-400 to-blue-500
            hover:from-blue-200 hover:to-blue-350
            transition shadow-lg hover:shadow-xl
          "
        >
          GET STARTED
        </button>

      </div>

    </div>
  );
};

export default WelcomePage;
