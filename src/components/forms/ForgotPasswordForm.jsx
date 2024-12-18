import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/forgot-password/', { email });
      setSuccess('A password reset link has been sent to your email.');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending reset link.');
      setSuccess(null);
    }
  };

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button type="submit" className="submit-button">Send Reset Link</button>
    </form>
  );
};

export default ForgotPasswordForm;
