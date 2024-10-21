import {
  AuthError,
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
import { getUserDetail } from "../service/user";

export interface IAuthContext {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user?: IUser;
  userId?: string;
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

    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        if (firebaseUser) {
          const { uid, email } = firebaseUser;

          try {
            const userDetail = await getUserDetail(uid);
            const userData: IUser = {
              userId: uid,
              email,
              displayName: userDetail?.displayName,
              role: userDetail?.role,
              ...userDetail,
            };
            localStorage.setItem("user", JSON.stringify(userData)); // Save the merged data
            setUser(userData);
          } catch (error) {
            console.error("Error fetching user details from Firestore:", error);
          }
        } else {
          localStorage.removeItem("user");
          setUser(undefined);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const userId = useMemo(() => user?.userId, [user?.userId]);

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
      userId,
    }),
    [user, login, logout, loading, userId]
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
