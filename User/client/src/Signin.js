import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import { GoogleOAuthProvider } from '@react-oauth/google';
import './Signin.css';
import { useAuth } from './context';
import { doSignInWithGoogle } from './authfb';

function Signin() {
  const { userLoggedIn, handleSignIn } = useAuth(); // Use handleSignIn from context
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    if (userLoggedIn) {
      navigate('/dashboard'); // Redirect to dashboard
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await handleSignIn(email, password); // Call the sign-in function from context
        navigate('/dashboard'); // Redirect to dashboard
      } catch (error) {
        setErrorMessage(error.message); // Set the error message to be displayed
      } finally {
        setIsSigningIn(false);
      }
    }
  };
  
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
        setErrorMessage(err.message);
      });
    }
  };

  return (
    <div className="Signin">
      <h1 className="Greet">Welcome Back, User!</h1>
      <p>Sign in with your email address</p>
      <form onSubmit={onSubmit}>
        <label className="lbl">Email</label>
        <br />
        <input
          type="text"
          placeholder="Enter your email address"
          className="email-input"
          required
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label className="lbl">Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          className="password-input"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="submit" className="Submit-btn">
          {isSigningIn ? 'Signing In...' : 'Login'}
        </button>
      </form>
      <p className="f">forgot your password?</p>
      <br />
      <br />
      <GoogleOAuthProvider>
        <button className="Custom-google" onClick={onGoogleSignIn}>
          <img src={require('./Google-Symbol.png')} width={30} className='Google-style' />
          {isSigningIn ? 'Signing In...' : 'Sign in With Google'}
        </button>
      </GoogleOAuthProvider>
      <a href='signup'>
        <p className='para'>New Here? Sign up for exclusive content...</p>
      </a>
    </div>
  );
}

export default Signin;