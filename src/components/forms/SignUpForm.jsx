import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMicrosoft } from 'react-icons/fa'; // Bing icon
import Flag from 'react-world-flags';
import './SignUpForm.css';
import Select from 'react-select';
import TwitterLogin from 'react-twitter-login';  // Import Twitter OAuth login button
import { GoogleLogin } from '@react-oauth/google';  // Import Google OAuth login button
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';  // Your MSAL config


const countries = [
  { code: 'US', name: 'United States' },
  { code: 'EG', name: 'Egypt' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'MO', name: 'Morocco' },
  // Add more countries as needed.
];

const CountryDropdown = ({ formData, handleChange2 }) => {
  const options = countries.map((country) => ({
    value: country.code,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Flag code={country.code} style={{ width: 24, height: 16, marginRight: 8 }} />
        {country.name} ({country.code})
      </div>
    ),
  }));

  return (
    <Select
      name="country"
      value={options.find(option => option.value === formData.country)}
      onChange={(selectedOption) => handleChange2({ target: { name: 'country', value: selectedOption.value } })}
      options={options}
      required
    />
  );
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();  // Move useMsal hook here
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Include at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Include at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Include at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Include at least one special character';
    }
    return 'Password is strong';
  };

  const handleGoogleSignUp = async (response) => {
    try {
      const payload = { token: response.credential };

      // Send the token to your backend for sign-up
      await axios.post('http://localhost:8000/api/auth/Google_signup/', payload);
      setSuccess('Google sign-up successful!');
      setError(null);

      setTimeout(() => navigate('/check-email'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleTwitterLogin = async (response) => {
    try {
      const payload = { token: response.oauth_token, tokenSecret: response.oauth_token_secret };
  
      // Send the token to your backend for sign-in or sign-up
      await axios.post('http://localhost:8000/api/auth/Twitter_signup/', payload);
      setSuccess('Twitter sign-up successful!');
      setError(null);
  
      setTimeout(() => navigate('/check-email'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleMicrosoftSignUp = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      const payload = { token: response.accessToken };
      await axios.post('http://localhost:8000/api/auth/Microsoft_signup/', payload);
      setSuccess('Microsoft sign-up successful!');
      setError(null);
      setTimeout(() => navigate('/check-email'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };
  

  // Update password strength message dynamically
  useEffect(() => {
    setPasswordStrengthMessage(checkPasswordStrength(formData.password));
  }, [formData.password]);

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
        <div className="form-row">
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
          <CountryDropdown formData={formData} handleChange2={handleChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="password-strength">
            <p>{passwordStrengthMessage}</p>
          </div>
        </div>
        <div className="form-group">
          <label>Re-enter Password</label>
          <div className="password-field">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
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
        <button type="submit" className="submit-button">Submit</button>
        <div className="oauth-buttons">
        <GoogleLogin 
            onSuccess={handleGoogleSignUp} 
            onError={() => console.log('Google Sign Up failed')} 
          />
          <TwitterLogin
  authCallback={handleTwitterLogin}
  consumerKey="your-consumer-key" // Set your consumer key
  consumerSecret="your-consumer-secret" // Set your consumer secret
  buttonText="Login with Twitter"
/>
<button type="button" className="oauth-button bing" onClick={handleMicrosoftSignUp}><FaMicrosoft size={24} /></button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
