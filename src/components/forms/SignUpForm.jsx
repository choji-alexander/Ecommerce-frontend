import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'EG', name: 'Egypt' },
    { code: 'JA', name: 'Jamaica' },
    { code: 'NG', name: 'Nigeria' },
    // Add more countries as needed.
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.termsAgreed) {
      setError('You must agree to the terms of service');
      return;
    }

    try {
      // Check if email is already in use
      const emailCheckResponse = await axios.post(
        'http://localhost:8000/api/email_used_check_/',
        { email: formData.email }
      );

      if (emailCheckResponse.data.emailUsed) {
        setError('Email is already in use. Redirecting to sign-in...');
        setTimeout(() => navigate('/sign-in'), 2000);
        return;
      }

      // Prepare data for sign-up
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        country: formData.country,
        password: formData.password,
      };

      // Proceed with signup
      await axios.post('http://localhost:8000/api/auth/signup/', payload);
      setSuccess('Sign up successful! Check your email for verification.');
      setError(null);

      setTimeout(() => navigate('/check-email'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Sign Up</h2>
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
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
        <div className="form-group">
          <label>Re-enter Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group terms">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleChange}
            required
          />
          <label>I agree to the terms of service</label>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" className="submit-button">Sign Up</button>
        <div className="oauth-buttons">
          <button type="button" className="oauth-button google">Sign Up with Google</button>
          <button type="button" className="oauth-button x">Sign Up with X</button>
          <button type="button" className="oauth-button bing">Sign Up with Bing</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
