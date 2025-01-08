import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import UserProfile from './components/forms/UserProfile';
import ProfilePage from './components/pages/ProfilePage';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './components/forms/authConfig'; // msalConfig contains the MSAL configuration
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import CheckEmailPage from './components/pages/checkEmailPage'; // Adjust the path based on your folder structure

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  return (
    // Wrap the entire app or relevant routes with GoogleOAuthProvider
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <MsalProvider instance={msalInstance}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/check-email" element={<CheckEmailPage />} />
          <Route path="/my-profile" element={<ProfilePage isOwner={true} userId="current" />} />
        </Routes>
      </Router>
      </MsalProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
