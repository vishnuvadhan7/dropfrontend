// App.js
import React, { useState } from 'react';
import './App.css';

import Login from './components/Login';
import WelcomePage from './components/WelcomePage';
import RoleSelectionPage from './components/RoleSelectionPage';
import BookingPage from './components/BookingPage';
import PaymentPage from './components/PaymentPage';
import DroperDashboard from './components/DroperDashboard';
import DroperDeliveryDetails from './components/DroperDeliveryDetails';
import AdminDashboard from './components/AdminDashboard';
// ✅ 1. Import the new success page
import BookingSuccessPage from './components/BookingSuccessPage'; 

function App() {
  // ✅ 2. Add 'bookingSuccess' state
  const [currentPage, setCurrentPage] = useState('welcome'); // 'welcome', 'roleSelection', 'login', 'dashboard', 'payment', 'bookingSuccess'
  const [userRole, setUserRole] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  
  const navigateToRoleSelection = () => setCurrentPage('roleSelection');
  const navigateToLogin = (role) => {
    setUserRole(role);
    setCurrentPage('login');
  };
  const navigateBackToRoleSelection = () => {
    setCurrentPage('roleSelection');
    setUserRole(null); 
  };
  const navigateToDashboard = () => setCurrentPage('dashboard');
  const navigateToPayment = (details) => {
    setBookingDetails(details); 
    setCurrentPage('payment');
  };
  const navigateBackToBooking = () => setCurrentPage('dashboard'); 
  const navigateToDroperDetails = () => setCurrentPage('droperDeliveryDetails');
  const navigateBackToDroperDashboard = () => setCurrentPage('dashboard');

  // ✅ 3. Add function to go from Payment -> Success
  const navigateToSuccess = () => {
    setBookingDetails(null); // Clear the booking details
    setCurrentPage('bookingSuccess');
  };

  // ✅ 4. Add function to go from Success -> Dashboard (Home)
  const navigateHome = () => {
    setCurrentPage('dashboard');
  };

  // Render pages
  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onGetStarted={navigateToRoleSelection} />;
      case 'roleSelection':
        return <RoleSelectionPage onSelectRole={navigateToLogin} />;
      case 'login':
        return (
          <Login
            role={userRole}
            onBack={navigateBackToRoleSelection}
            onLoginSuccess={navigateToDashboard}
          />
        );
      case 'dashboard':
        if (userRole === 'user') {
          return <BookingPage onConfirmBooking={navigateToPayment} />;
        }
        if (userRole === 'droper') {
          return <DroperDashboard onAcceptOrder={navigateToDroperDetails} />;
        }
        if (userRole === 'admin') {
          return <AdminDashboard />;
        }
        return <RoleSelectionPage onSelectRole={navigateToLogin} />;

      case 'payment':
        return (
          <PaymentPage
            details={bookingDetails}
            onBack={navigateBackToBooking}
            // ✅ 5. PASS THE PROP HERE
            onPayNow={navigateToSuccess} 
          />
        );

      case 'droperDeliveryDetails':
        return (
          <DroperDeliveryDetails
            onBack={navigateBackToDroperDashboard}
          />
        );
      
      // ✅ 6. Add the new case for the success page
      case 'bookingSuccess':
        return (
          <BookingSuccessPage
            onGoHome={navigateHome}
          />
        );
        
      default:
        return <WelcomePage onGetStarted={navigateToRoleSelection} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;