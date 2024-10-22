import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase"; // Import your Firebase configuration
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser , setCurrentUser ] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(true);
  const [isGoogleUser , setIsGoogleuser ] = useState(false);
  const [loading, setLoading ]=  useState(false);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser (user);
        setUserLoggedIn(false); // Set to false until user explicitly signs in
      } else {
        setCurrentUser (null);
        setUserLoggedIn(false); // Ensure userLoggedIn is false when there's no user
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setUserLoggedIn(true); // Set userLoggedIn to true only after successful sign-in
    } catch (error) {
      console.error("Error signing in:", error);
      throw new Error(error.message || 'Failed to sign in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserLoggedIn(false); // Reset userLoggedIn state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    userLoggedIn,
    currentUser ,
    handleSignIn,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}