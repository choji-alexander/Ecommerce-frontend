import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    mobilePhone: '',
    language: '',
    address1: '',
    address2: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      const response = await axios.post('http://localhost:8000/api/auth/signup/', formData);
      setSuccess('Sign up successful! You can now sign in.');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
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
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mobile Phone</label>
        <input
          type="text"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Language</label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address 1</label>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
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
    </form>
  );
};

export default SignUpForm;
