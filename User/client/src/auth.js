import React from "react";
import Signin from "./Signin";
import './auth.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function auth(){
    return(
            <GoogleOAuthProvider clientId="38472521135-cr1h27u93s0tvdh0uoqiusqnd4hn8hjm.apps.googleusercontent.com">
                <Signin/>
            </GoogleOAuthProvider>
        )
}