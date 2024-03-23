// src/pages/SignupPage.js
import React from 'react';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    // Redirect the user after successful signup
    navigate('/login'); // Adjust the path as needed
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <SignupForm onSignupSuccess={handleSignupSuccess} />
    </div>
  );
};

export default SignupPage;
