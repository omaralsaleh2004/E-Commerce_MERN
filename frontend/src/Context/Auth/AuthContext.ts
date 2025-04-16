import { createContext, useContext } from "react";

interface AuthContextTypes {
  username: string | null;
  token: string | null;
  login: (username : string , token : string) => void;
}
export const AuthContext = createContext<AuthContextTypes>({username : null , token : null , login : () => {}});

export const useAuth = () => useContext(AuthContext);
