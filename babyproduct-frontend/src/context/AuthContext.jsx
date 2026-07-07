import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  
  const login = async (email, password) => {
    console.log("Trying login with:", email, password);
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.message !== "Login successfull") {
        return {
          success: false,
          message: data.message,
        };
      }

      setUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return {
        success: true,
        user: data.user,
      };
    } catch (err) {
      console.log(err);

      return {
        success: false,
        message: "Login failed",
      };
    }
  };

  
  const register = async ({ name, email, password }) => {
    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.message === "Email already exists") {
        return {
          success: false,
          message: data.message,
        };
      }

      return {
        success: true,
        user: data,
      };
    } catch (err) {
      console.log(err);

      return {
        success: false,
        message: "Registration failed",
      };
    }
  };

  
  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);