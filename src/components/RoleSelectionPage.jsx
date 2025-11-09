import React from 'react';

// ✅ Top image above card
const loginTopImageUrl = '/back.png';

const RoleSelectionPage = ({ onSelectRole }) => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#e0f2f7]">

      {/* ✅ Image ABOVE Card */}
      <div className="mb-5 -mt-32">
        <img
          src={loginTopImageUrl}
          alt="Login Illustration"
          className="w-40 mx-auto drop-shadow-xl"
        />
      </div>

      {/* ✅ CARD */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">

        {/* ✅ Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Campus Drop</h1>
          <p className="text-gray-600 text-lg">Choose Your Role</p>
        </div>

        {/* ✅ ROLE BUTTON COMPONENT */}
        <div className="space-y-4">
          {[
            { role: "user", label: "Login as User" },
            { role: "droper", label: "Login as Droper" },
            { role: "admin", label: "Login as Admin" }
          ].map(({ role, label }) => (
            <button
              key={role}
              onClick={() => onSelectRole(role)}
              className="
                w-full text-white py-3 px-4 rounded-full font-bold text-lg
                bg-gradient-to-r from-blue-400 to-blue-500
                hover:from-blue-200 hover:to-blue-350
                transition shadow-lg hover:shadow-xl
              "
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
