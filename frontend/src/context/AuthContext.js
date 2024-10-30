import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [isVendedor, setIsVendedor] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedVendedor = localStorage.getItem("vendedor");
    const storedUserId = localStorage.getItem("userId");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedVendedor) {
      setIsVendedor(storedVendedor === "true" || storedVendedor === true);
    }

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = (name, vendedor, id) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("vendedor", vendedor);
    localStorage.setItem("userId", id);
    setUserName(name);
    setIsVendedor(Boolean(vendedor)); // Garante que é um booleano
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("vendedor");
    localStorage.removeItem("userId");
    setUserName("");
    setIsVendedor(false);
    setUserId("");
  };

  return (
    <AuthContext.Provider
      value={{ userName, isVendedor, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
