import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    if (!auth) return Promise.reject(new Error('Firebase Auth is not configured.'));
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (!auth) return Promise.resolve();
    return signOut(auth);
  }

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      if (auth) {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch(e) {
      console.warn("Firebase Auth not initialized fully yet.");
      setLoading(false);
    }
    
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
