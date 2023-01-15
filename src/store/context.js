import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { users_url } from "../constants/url";
let logoutTimer;

const Context = React.createContext({
  token: null,
  id: null,
  isLoggedIn: false,
  login: (token, id, expirationTime) => {},
  logout: () => {},
  isLoggedOut: false,
  exercises: [],
  addExercise: (name) => {},
  deleteExercise: (id) => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
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
  const userId = localStorage.getItem("userId");
  const [exercises, setExercises] = useState([]);
  let initialExercises;
  useEffect(() => {
    axios
      .get(users_url + userId + "/exercises.json")
      .then(function (response) {
        // handle success

        initialExercises = Object.keys(response.data).map((id) => {
          return { id, name: response.data[id].name };
        });

        setExercises(initialExercises);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [userId]);

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(!!userId ? userId : null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const isLoggedIn = !!token;
  const addExerciseHandler = (name) => {
    const id = (Math.random() + 1).toString(36).substring(7);
    setExercises((prevState) => {
      return [{ name: name, id }, ...prevState];
    });
    axios
      .put(users_url + userId + `/exercises/${id}.json`, {
        name,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteExerciseHandler = (id) => {
    const newExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(newExercises);
    // izbrisati i iz base podataka 
  };
  const logoutHandler = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.clear();
    setExercises([]);
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
    isLoggedOut,
    exercises,
    addExercise: addExerciseHandler,
    deleteExercise: deleteExerciseHandler,
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
