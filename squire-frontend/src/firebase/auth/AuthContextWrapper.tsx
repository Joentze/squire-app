import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../base";

const FirebaseAuthContext = createContext<string | undefined>(undefined);

interface AuthDataProps {
  children: React.ReactNode | React.ReactNode[];
}

export const useAuth = () => {
  return useContext(FirebaseAuthContext);
};

export const FirebaseAuthWrapper: React.FC<AuthDataProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<string | undefined>(undefined);
  useEffect(() => {
    onAuthStateChanged(auth, (FirebaseUser) => {
      setUser((FirebaseUser as User)?.uid);
      setLoading(false);
    });
  }, []);
  return (
    <FirebaseAuthContext.Provider value={user}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
};
