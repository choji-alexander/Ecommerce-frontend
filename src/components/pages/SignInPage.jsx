import React from 'react';
import SignInForm from '../forms/SignInForm';
import './SignInPage.css';

const SignInPage = () => {
  return (
    <div className="signin-page">
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Welcome Back!</h1>
        <p>Sign in to access your account</p>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
