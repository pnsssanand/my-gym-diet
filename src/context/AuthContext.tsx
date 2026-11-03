import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { StorageService } from '../services/storage';
import { UserProfile } from '../types';
import { INITIAL_USER_PROFILE } from '../data/initialProfile';

interface AuthContextType {
  user: User | null;
  profile: UserProfile;
  loading: boolean;
  isFirebaseActive: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [loading, setLoading] = useState<boolean>(true);
  const isFirebaseActive = isFirebaseConfigured();

  useEffect(() => {
    let unsubscribe = () => {};

    if (auth) {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          const loadedProfile = await StorageService.getUserProfile(firebaseUser.uid);
          setProfile({
            ...loadedProfile,
            email: firebaseUser.email || loadedProfile.email,
            displayName: firebaseUser.displayName || loadedProfile.displayName,
          });
        } else {
          setUser(null);
          // Default to preconfigured user Anand Pinisetty
          const cached = await StorageService.getUserProfile(INITIAL_USER_PROFILE.uid);
          setProfile(cached);
        }
        setLoading(false);
      });
    } else {
      // In offline / local mode, load preconfigured Anand Pinisetty profile
      StorageService.getUserProfile(INITIAL_USER_PROFILE.uid).then((p) => {
        setProfile(p);
        setLoading(false);
      });
    }

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (auth) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const p = await StorageService.getUserProfile(cred.user.uid);
        setProfile(p);
      } else {
        // Local simulation
        const simulatedProfile = {
          ...INITIAL_USER_PROFILE,
          email,
          displayName: email.split('@')[0],
        };
        setProfile(simulatedProfile);
        await StorageService.saveUserProfile(simulatedProfile);
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      if (auth) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const newProfile: UserProfile = {
          ...INITIAL_USER_PROFILE,
          uid: cred.user.uid,
          email,
          username,
          displayName: username,
          createdAt: new Date().toISOString(),
        };
        await StorageService.saveUserProfile(newProfile);
        setProfile(newProfile);
      } else {
        const newProfile: UserProfile = {
          ...INITIAL_USER_PROFILE,
          uid: `user_${Date.now()}`,
          email,
          username,
          displayName: username,
          createdAt: new Date().toISOString(),
        };
        await StorageService.saveUserProfile(newProfile);
        setProfile(newProfile);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    if (auth) {
      await sendPasswordResetEmail(auth, email);
    } else {
      // simulate
      await new Promise((res) => setTimeout(res, 500));
    }
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    setProfile(INITIAL_USER_PROFILE);
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    const next = { ...profile, ...updated, updatedAt: new Date().toISOString() };
    setProfile(next);
    await StorageService.saveUserProfile(next);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isFirebaseActive,
        login,
        signup,
        resetPassword,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
