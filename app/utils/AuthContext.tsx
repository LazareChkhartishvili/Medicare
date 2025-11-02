import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const ROLE_STORAGE_KEY = "@medicare_user_role";

export type UserRole = "doctor" | "patient" | null;

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRoleState] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserRole();
  }, []);

  const loadUserRole = async () => {
    try {
      const storedRole = await AsyncStorage.getItem(ROLE_STORAGE_KEY);
      setUserRoleState(storedRole as UserRole);
    } catch (error) {
      console.error("Error loading user role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserRole = async (role: UserRole) => {
    try {
      setUserRoleState(role);
      if (role) {
        await AsyncStorage.setItem(ROLE_STORAGE_KEY, role);
      } else {
        await AsyncStorage.removeItem(ROLE_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error setting user role:", error);
    }
  };

  const value: AuthContextType = {
    userRole,
    setUserRole,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
