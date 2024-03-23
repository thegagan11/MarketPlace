import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ListingPage from './pages/ListingPage';
import NotFoundPage from './pages/NotFoundPage';
import UserProfile from './pages/UserProfile';
import BookingPage from './pages/BookingPage';
import ServiceDetail from './pages/ServiceDetail';
import ProviderDashboard from './pages/ProviderDashboard';
import CreateListingForm from './components/CreateListingForm';

function App() {

  useEffect(() => {
    fetch('http://localhost:3004/api/test')
      .then(response => response.text())
      .then(message => console.log(message));
  }, []);

  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/listings/:id" element={<ServiceDetail />} />
        <Route path="/book/:id" element={<BookingPage />} /> {/* Updated to use MyBookings for booking initiation */}
        {/* <Route path="*" element={<NotFoundPage />} /> Uncommented to serve as catch-all route */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/create-listing" element={<CreateListingForm />} />
        <Route path="/my-bookings" element={<BookingPage />} />
        <Route path="/dashboard" element={<ProviderDashboard />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
