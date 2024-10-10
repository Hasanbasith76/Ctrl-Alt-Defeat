// client/src/App.js
import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './Signin.css';
import axios from 'axios';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    console.log('handlesubmit called');
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { username, password });
      console.log(response.data);
      // Login successful, redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="Signin">
      <h1 className="Greet">Welcome Back, User!</h1>
      <p>Sign in with your email address</p>
      <form onSubmit={(e) => {
      handleSubmit(e);
      }}>
        <label className="lbl">Email</label>
        <br />
        <input
          type="text"
          placeholder="Enter your email address"
          className="email-input"
          required="true"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label className="lbl">Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          className="password-input"
          required="true"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="Submit-btn">Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <p className="f">forgot your password?</p>
      <br />
        <button className="Custom-google">
          <GoogleOAuthProvider>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Google login failed');
            }}
          />
          </GoogleOAuthProvider>
        </button>
      <a href="/signup">
        <p className="p">New here? Create an account and join us today!</p>
      </a>
    </div>
  );
}

export default Signin;