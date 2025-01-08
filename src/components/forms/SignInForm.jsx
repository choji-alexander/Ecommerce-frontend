import React, { useState } from 'react';
import axios from 'axios';
import './SignInForm.css';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/signin/', formData);
      setSuccess('Sign in successful! Redirecting...');
      setError(null);
      // Redirect or handle login success here
    } catch (err) {
      const message = err.response?.data?.message;
      if (message?.includes('email not verified')) {
        setError('Please verify your email before signing in.');
      } else {
        setError(message || 'Invalid email or password');
      }
    }
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h2>Sign In to Your Account</h2>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button type="submit" className="submit-button">Sign In</button>

      <div className="oauth-buttons">
        <button type="button" className="oauth-button google-button">
          Sign In with Google
        </button>
        <button type="button" className="oauth-button x-button">
          Sign In with X
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
