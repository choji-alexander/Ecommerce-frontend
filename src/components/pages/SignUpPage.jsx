import React from 'react';
import SignUpForm from '../forms/SignUpForm';
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Join Our Store</h1>
        <p>Sign up to explore exclusive deals and offers!</p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
