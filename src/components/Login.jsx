import React, { useState, useEffect } from 'react';

// Image above the card
const loginTopImageUrl = '/back.png';

// ✅ (Optional) Background image - not used in this layout
const backgroundImageUrl = 'https://i.imgur.com/8aM0rMa.png';

// ✅ 1. Get API URL from Vercel env or use fallback
const API_URL = import.meta.env.VITE_API_URL || "https://dropbackend.onrender.com/api";

console.log("✅ API URL Loaded =>", API_URL); // Debug

const Login = ({ role, onBack, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState('email');
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [otpId, setOtpId] = useState(null);

  // ✅ Timer logic
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = () =>
    `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;

  // ✅ OTP input logic
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOtpBackspace = (element, index) => {
    if (!element.value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // ✅ SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      showMessage('Please enter your email', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const userId = "507f1f77bcf86cd799439011"; // static for now
      const userName = email.split('@')[0];
      const userRole = role;

      const response = await fetch(`${API_URL}/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, userName, userRole }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpId(data.otpId);
        setStep("otp");
        setTimer(data.expiresIn || 60);
        showMessage(data.message, "success");
      } else {
        showMessage(data.error || data.message, "error");
      }
    } catch (err) {
      showMessage("Failed to send OTP", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    const otpString = otp.join('');

    if (otpString.length !== 6) {
      showMessage("Please enter a valid 6-digit OTP", "error");
      return;
    }

    setIsLoading(true);

    try {
      const userId = "507f1f77bcf86cd799439011";

      const response = await fetch(`${API_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpId, otp: otpString, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Login successful!", "success");

        setTimeout(() => onLoginSuccess(), 800);
      } else {
        showMessage(data.error || data.message, "error");
      }
    } catch (err) {
      showMessage("OTP verification failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = () => {
    if (timer > 0) {
      showMessage(`Please wait ${formatTime()} before resending`, "error");
      return;
    }
    console.log("Resend OTP clicked");
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3500);
  };

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#e0f2f7]">

      {/* ✅ Top Illustration */}
      <div className="mb-5 -mt-38">
        <img
          src={loginTopImageUrl}
          alt="Login Illustration"
          className="w-40 mx-auto drop-shadow-xl"
        />
      </div>

      {/* ✅ Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Campus Drop</h1>
          <p className="text-gray-600 text-lg">{capitalize(role)} Login</p>
        </div>

        {/* ✅ Feedback Message */}
        {message && (
          <div
            className={`mb-4 p-3 text-center rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* ✅ EMAIL STEP */}
        {step === "email" ? (
          <form onSubmit={sendOtp}>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-400 text-white p-3 rounded-lg font-bold disabled:opacity-50"
            >
              {isLoading ? "SENDING..." : "SEND OTP"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="block mx-auto mt-4 text-gray-700"
            >
              ← Back
            </button>
          </form>
        ) : (
          /* ✅ OTP STEP */
          <form onSubmit={verifyOtp}>
            <div className="flex gap-2 justify-center mb-4">
              {otp.map((value, i) => (
                <input
                  key={i}
                  id={`otp-input-${i}`}
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpChange(e.target, i)}
                  onKeyUp={(e) =>
                    e.key === "Backspace" && handleOtpBackspace(e.target, i)
                  }
                  className="w-10 h-12 border text-center rounded-lg text-xl"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-400 text-white p-3 rounded-lg font-bold disabled:opacity-50"
            >
              {isLoading ? "VERIFYING..." : "VERIFY OTP"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;


