import {
  AuthError,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { firebaseAuth } from "../service/firebase.config";
import { IUser } from "../interface/users";

export interface IAuthContext {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
  loading: boolean;
  error?: Error | AuthError;
}

const initialAuthContext: IAuthContext = {
  login: () => {
    throw new Error("IAuthContext:login is not initiated");
  },
  logout: () => {
    throw new Error("IAuthContext:logout is not initiated");
  },
  loading: true,
};

const AuthContext = createContext(initialAuthContext);
AuthContext.displayName = "Auth";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [user, setUser] = useState<IUser | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") as string);

    if (storedUser) {
      setUser(storedUser); // Preload from localStorage
      setLoading(true); // Keep loading true until Firebase check is complete
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        const userData: IUser = { id: uid, email, displayName };
        localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
        setUser(userData ?? undefined);
      } else {
        localStorage.removeItem("user");
      }
      // setUser(user ?? undefined);
      setLoading(false); // Only stop loading after Firebase confirms the user state
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/home");
      setLoading(false);
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    setUser(undefined);
    navigate("/");
    await signOut(firebaseAuth);
  }, [navigate]);

  const context = useMemo(
    () => ({
      user: user,
      login,
      logout,
      loading,
    }),
    [user, login, logout, loading]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, AuthContext, useAuth };
