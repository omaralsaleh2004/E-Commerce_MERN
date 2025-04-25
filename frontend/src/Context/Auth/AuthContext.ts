import { createContext, useContext } from "react";
import { Order } from "../../types/Order";

interface AuthContextTypes {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrders: Order[];
  login: (username: string, token: string) => void;
  logout: () => void;
  getMyOrders: () => void;
}
export const AuthContext = createContext<AuthContextTypes>({
  username: null,
  token: null,
  login: () => {},
  isAuthenticated: false,
  myOrders: [],
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
