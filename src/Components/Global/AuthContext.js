import React, { createContext, useState } from "react";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState();
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    console.log(token);
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };
  const ContextValue = {
    token: token,
    isLoggedin: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
