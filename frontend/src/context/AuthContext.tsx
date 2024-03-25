import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
} from '../helpers/api-communicator';

//basically to remove the need of prop drilling, we use context api or reduxTk, to manage states gloablly.

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUSer] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //fetch if the user's cookies are valid . then skip login:
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUSer({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUSer({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  const signup = async (name: string, email: string, password: string) => {};

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUSer(null);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
