import React, { useState } from 'react';
import axios from 'axios';
import './SignInForm.css';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from './authConfig';  // Your MSAL config
import TwitterLogin from 'react-twitter-login';  // Import Twitter OAuth login button
import { GoogleLogin } from '@react-oauth/google';  // Import Google OAuth login button
import { FaMicrosoft } from 'react-icons/fa'; // Bing icon
import { useMsal } from '@azure/msal-react';

const SignInForm = () => {
  const navigate = useNavigate();  // This is used to redirect after login
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { instance } = useMsal();  // Move useMsal hook here
  const [showPassword, setShowPassword] = useState(false);
  

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

  const handleGoogleSignIn = async (response) => {
    try {
      const payload = { token: response.credential };
  
      // Send the token to your backend for sign-in
      await axios.post('http://localhost:8000/api/auth/Google_signin/', payload);
      setSuccess('Google sign-in successful!');
      setError(null);
  
      // Redirect after successful sign-in
      setTimeout(() => navigate('/dashboard'), 2000);  // Adjust the redirect to your dashboard or home page
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleTwitterSignIn = async (response) => {
    try {
      const payload = { token: response.oauth_token, tokenSecret: response.oauth_token_secret };
  
      // Send the token to your backend for sign-in
      await axios.post('http://localhost:8000/api/auth/Twitter_signin/', payload);
      setSuccess('Twitter sign-in successful!');
      setError(null);
  
      // Redirect after successful sign-in
      setTimeout(() => navigate('/dashboard'), 2000);  // Adjust the redirect to your dashboard or home page
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      // Get the authentication response from MSAL
      const response = await instance.loginPopup(loginRequest);
      const payload = { token: response.accessToken };
  
      // Send the token to your backend for sign-in
      await axios.post('http://localhost:8000/api/auth/Microsoft_signin/', payload);
      setSuccess('Microsoft sign-in successful!');
      setError(null);
  
      // Redirect after successful sign-in
      setTimeout(() => navigate('/dashboard'), 2000);  // Adjust the redirect to your dashboard or home page
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
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
      </div>
      

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button type="submit" className="submit-button">Sign In</button>

      <div className="oauth-buttons">
      <GoogleLogin 
            onSuccess={handleGoogleSignIn} 
            onError={() => console.log('Google Sign Up failed')} 
          />
          <TwitterLogin
  authCallback={handleTwitterSignIn}
  consumerKey="your-consumer-key" // Set your consumer key
  consumerSecret="your-consumer-secret" // Set your consumer secret
  buttonText="Login with Twitter"
/>
<button type="button" className="oauth-button bing" onClick={handleMicrosoftSignIn}><FaMicrosoft size={24} /></button>
      </div>
    </form>
  );
};

export default SignInForm;
