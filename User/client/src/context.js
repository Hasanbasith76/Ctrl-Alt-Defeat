import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser , setCurrentUser ] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser , setIsEmailUser ] = useState(false);
  const [isGoogleUser , setIsGoogleUser ] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser );
    return unsubscribe;
  }, []);

  async function initializeUser (user) {
    if (user) {
      setCurrentUser ({ ...user });

      // Check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser (isEmail);

      // Check if the auth provider is Google
      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      );
      setIsGoogleUser (isGoogle);

      setUserLoggedIn(false);

      // Add user to Firestore if not already present
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      }, { merge: true }); // Use merge to avoid overwriting existing data
    } else {
      setCurrentUser (null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser ,
    isGoogleUser ,
    currentUser ,
    setCurrentUser ,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}