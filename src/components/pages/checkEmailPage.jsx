import React from 'react';
import './checkEmailPage.css';

const CheckEmailPage = () => {
  return (
    <div className="check-email-page">
      <h1>Check Your Email</h1>
      <p>We’ve sent a verification link to your email address.</p>
      <button className="resend-button">Resend Email</button>
    </div>
  );
};

export default CheckEmailPage;
