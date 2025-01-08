import React from 'react';
import SignInForm from '../forms/SignInForm';
import './SignInPage.css';

const SignInPage = () => {
  return (
    <div className="signin-page">
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Welcome Back!</h1>
        <p>Access your account to enjoy the best shopping experience.</p>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
