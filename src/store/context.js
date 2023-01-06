import React, { useEffect, useState } from "react";

const Context = React.createContext({
  token: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const ContextProvider = (props) => {
  const tokenId = localStorage.getItem("tokenId");
  const [token, setToken] = useState(!!tokenId ? tokenId : null);
  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("tokenId", token);
  };
  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
