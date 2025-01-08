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
      <div className="footer">
        <p>
          Already have an account? <a href="/Signin">Sign in here</a>.
        </p>
        <p>
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
