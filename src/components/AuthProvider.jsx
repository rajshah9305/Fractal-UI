// src/components/AuthProvider.jsx
// Provides authentication context and helpers using Supabase
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({
    user: null,
    loading: true,
    login: () => {},
    signup: () => {},
    socialLogin: () => {},
    logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This useEffect hook handles user session management.
  // It now correctly handles the initial session check and listens for auth state changes in one place.
  useEffect(() => {
    setLoading(true);
    // onAuthStateChange returns a subscription object.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // The cleanup function unsubscribes from the auth state listener when the component unmounts.
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Wraps auth calls to handle loading state.
  const handleAuthAction = async (action) => {
      setLoading(true);
      const { error } = await action();
      setLoading(false);
      if (error) {
        console.error("Authentication error:", error.message);
      }
      return { error };
  };

  const value = {
    user,
    loading,
    login: (email, password) => handleAuthAction(() => supabase.auth.signInWithPassword({ email, password })),
    signup: (email, password) => handleAuthAction(() => supabase.auth.signUp({ email, password })),
    socialLogin: (provider) => handleAuthAction(() => supabase.auth.signInWithOAuth({ provider })),
    logout: () => handleAuthAction(() => supabase.auth.signOut()),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
