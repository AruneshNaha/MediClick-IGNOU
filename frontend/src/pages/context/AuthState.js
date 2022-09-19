import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [authToken, setAuthToken] = useState("");

  const authenticate = () => {
    setAuthToken(localStorage.getItem("token"));
  };

  return (
    <AuthContext.Provider value={{ authToken, authenticate }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
