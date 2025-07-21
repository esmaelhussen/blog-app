import React, { createContext, useState, useEffect } from "react";
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
} from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => setCurrentUser(user), [user]);

  const register = (username, password) => {
    const users = getUsers();
    if (users.find((u) => u.username === username)) return false;
    users.push({ username, password });
    saveUsers(users);
    setUser({ username });
    return true;
  };

  const login = (username, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
