import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  access: string | null;
  setAccess: (access: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [access, setAccess] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUsername = localStorage.getItem("username");
      const storedAccess = localStorage.getItem("access");
      if (storedUsername) setUsername(storedUsername);
      if (storedAccess) setAccess(storedAccess);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ username, setUsername, access, setAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
