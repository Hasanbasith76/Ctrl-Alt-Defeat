import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import auth from './auth';
import Homepage from './Homepage';
import Signup from './Signup';
import Dashboard from './Dashboard'; 
import Results from './Result';
import Compatibility from './Compatibility';
import Instructions from './Instructions';
import Testwindow from './Testwindow';
import Thankyou from './Thankyou';
import Checkwindow from './Checkwindow';
import reportWebVitals from './reportWebVitals';
import Signin from './Signin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
    <Routes>
        <Route path='/' Component={Homepage} />
        <Route path='/signin' Component={Signin} />
        <Route path='/signin/oauth' Component={auth}/>
        <Route path='/signup' Component={Signup} />
        <Route path='/Dashboard' Component={Dashboard} />
        <Route path='/reports' Component={Results} />
        <Route path='/Compatibility' Component={Compatibility} />
        <Route path='/Instructions' Component={Instructions} />
        <Route path='/Checkwindow' Component={Checkwindow} />
        <Route path='/Testwindow' Component={Testwindow} />
        <Route path='/Thankyou' Component={Thankyou} />
    </Routes> 
  </BrowserRouter>
  </div>
    
        
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
