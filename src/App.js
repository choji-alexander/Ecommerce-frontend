import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import UserProfile from './components/forms/UserProfile';
import ProfilePage from './components/pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/my-profile" element={<ProfilePage isOwner={true} userId="current" />} />
      </Routes>
    </Router>
  );
};

export default App;
