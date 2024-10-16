import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Signin.css';
import { useAuth } from './context';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from './authfb';

function Signin() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        // doSendEmailVerification();
      } catch (error) {
        setIsSigningIn(false);
        setErrorMessage(error.message);
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
        {userLoggedIn && (<Navigate to={'/Dashboard'} replace={true} />)}
        <h1 className="Greet">Welcome Back, User!</h1>
        <p>Sign in with your email address</p>
        <form onSubmit={onSubmit}>
          <label className="lbl">Email</label>
          <br />
          <input
            type="text"
            placeholder="Enter your email address"
            className="email-input"
            required="true"
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
            required="true"
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
        <br/>
        <br />
        <GoogleOAuthProvider>
            <button className="Custom-google" onClick={onGoogleSignIn}>
              <img src={require('./Google-Symbol.png')} width={30} className='Google-style'/>
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