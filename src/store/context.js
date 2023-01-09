import React, { useCallback, useEffect, useState } from "react";
let logoutTimer;

const Context = React.createContext({
  token: null,
  id: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  isLoggedOut: false,
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("tokenId");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("tokenId");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const ContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const userId = localStorage.getItem("userId");

  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(!!userId ? userId : null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.clear();
    setIsLoggedOut(true);
    setTimeout(() => {
      setIsLoggedOut(false);
    }, 3000);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  const loginHandler = (token, id, expirationTime) => {
    setToken(token);
    setId(id);
    localStorage.setItem("tokenId", token);
    localStorage.setItem("userId", id);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  const contextValue = {
    token,
    id,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedOut: isLoggedOut,
  };
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
