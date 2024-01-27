import React, { createContext } from "react";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  // const ContextValue = {
  //   token,
  //   isLoggedin,
  //   login,
  //   logout,
  // };
  return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
};
export default AuthContextProvider;
