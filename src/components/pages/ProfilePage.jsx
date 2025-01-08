import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = ({ isOwner = false, userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${userId}/profile/`
        );
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userData) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={userData.avatar || '/avatar-placeholder.png'}
          alt={`${userData.name}'s avatar`}
          className="profile-avatar"
        />
        <h2>{userData.name}</h2>
        <p>{userData.bio || 'No bio available.'}</p>
      </div>

      <div className="profile-details">
        <h3>Profile Information</h3>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Country:</strong> {userData.country || 'Not specified'}
        </p>
        <p>
          <strong>Mobile:</strong> {userData.mobilePhone || 'Not specified'}
        </p>
        <p>
          <strong>Language:</strong> {userData.language || 'Not specified'}
        </p>
        <p>
          <strong>Address:</strong>{' '}
          {userData.address1 ? `${userData.address1}, ${userData.address2}` : 'Not specified'}
        </p>
      </div>

      {isOwner && (
        <div className="dashboard-actions">
          <h3>Dashboard</h3>
          <ul>
            <li>
              <a href="/orders">My Orders</a>
            </li>
            <li>
              <a href="/wishlist">My Wishlist</a>
            </li>
            <li>
              <a href="/settings">Account Settings</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
