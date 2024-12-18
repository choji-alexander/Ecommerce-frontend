import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    country: '',
    mobilePhone: '',
    language: '',
    address1: '',
    address2: '',
    password: '',
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch user data from backend on load
    axios
      .get('http://localhost:8000/api/auth/profile/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => setUserData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:8000/api/auth/profile/',
        userData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src="/avatar-placeholder.png" alt="User Avatar" className="avatar" />
        <h2>Welcome, {userData.name || 'User'}</h2>
        <p>Manage your profile information</p>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={userData.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile Phone</label>
          <input
            type="text"
            name="mobilePhone"
            value={userData.mobilePhone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Language</label>
          <input
            type="text"
            name="language"
            value={userData.language}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address 1</label>
          <input
            type="text"
            name="address1"
            value={userData.address1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address 2</label>
          <input
            type="text"
            name="address2"
            value={userData.address2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        {message && <p className={message.type === 'success' ? 'success' : 'error'}>{message.text}</p>}
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
