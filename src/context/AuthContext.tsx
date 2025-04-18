import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  name:string|null;
  login: (token: string,name:string) => void;
  logout: () => void;
}

const initialState:AuthContextType = {
  token:null,
  name:null,
  login:()=>{},
  logout:()=>{},
}

const AuthContext = createContext<AuthContextType | null>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [name,setName] = useState<string|null>(localStorage.getItem('name'))
  const login = (newToken: string,newName:string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem('name',newName)
    setToken(newToken);
    setName(newName);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    setName(null)
  };

  return (
    <AuthContext.Provider value={{ token,name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
