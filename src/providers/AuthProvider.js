import React, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateUserProfile = async (data) => {
    try {
      const userDocRef = firestore().collection('users').doc(user.uid);
      await userDocRef.set(data, { merge: true });
      setUser({ ...user, ...data });
    } catch (error) {
      console.log(error);
    }
  };

  const authContextValue = {
    user,
    loading,
    error,
    handleLogin,
    handleLogout,
    handleRegister,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
