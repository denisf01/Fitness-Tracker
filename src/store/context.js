import React, { useEffect, useState } from "react";

const Context = React.createContext({
  token: null,
  id: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const ContextProvider = (props) => {
  const tokenId = localStorage.getItem("tokenId");
  const userId = localStorage.getItem("userId");

  const [token, setToken] = useState(!!tokenId ? tokenId : null);
  const [id, setId] = useState(!!userId ? userId : null);


  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setId(null);
    localStorage.clear();
  };
  const loginHandler = (token, id) => {
    setToken(token);
    setId(id);
    localStorage.setItem("tokenId", token);
    localStorage.setItem("userId", id);

  };
  const contextValue = {
    token,
    id,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
