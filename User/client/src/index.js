import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Homepage from './Homepage';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard'; 
import Results from './Result';
import Compatibility from './Compatibility';
import Instructions from './Instructions';
import Testwindow from './Testwindow';
import Thankyou from './Thankyou';
import Checkwindow from './Checkwindow';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="38472521135-cr1h27u93s0tvdh0uoqiusqnd4hn8hjm.apps.googleusercontent.com">
        <Signin/>
      </GoogleOAuthProvider>;
    </React.StrictMode>
    
    <BrowserRouter>
    <Routes>
        <Route path='/' Component={Homepage} />
        <Route path='/signin' Component={Signin} />
        <Route path='/signup' Component={Signup} />
        <Route path='/Dashboard' Component={Dashboard} />
        <Route path='/reports' Component={Results} />
        <Route path='/Compatibility' Component={Compatibility} />
        <Route path='/Instructions' Component={Instructions} />
        <Route path='/Checkwindow' Component={Checkwindow} />
        <Route path='/Testwindow' Component={Testwindow} />
    </Routes> 
  </BrowserRouter>
  </div>
    
        
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
