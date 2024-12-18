import React from 'react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-page">
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a password reset link</p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
