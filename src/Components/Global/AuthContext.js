import React, { createContext, useState } from "react";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState();
  const [retrivedData, setRetrivedData] = useState();
  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    console.log(token);
    localStorage.setItem("idToken", token);
    localStorage.setItem("email", email);
    setToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    setToken(null);
  };
  const updatedData = (data) => {
    setRetrivedData(data);
    console.log(data);
  };
  const ContextValue = {
    token: token,
    isLoggedin: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    profileData: retrivedData,
    data: updatedData,
  };
  return (
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
