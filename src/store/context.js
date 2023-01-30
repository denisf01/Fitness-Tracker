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
  weightData: [],
  addWeightData: (data) => {},
  deleteWeightData: (id) => {},
  addExercise: (name) => {},
  deleteExercise: (id) => {},
  editExercise: (id, input) => {},
  workouts: [],
  addWorkout: (data) => {},
  deleteWorkout: (id) => {},
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
  const [workouts, setWorkouts] = useState([]);
  const [weightData, setWeightData] = useState([]);
  let initialExercises;
  let initialWorkouts;
  let initialWeightData;
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
    axios
      .get(users_url + userId + "/weightData.json")
      .then(function (response) {
        // handle success

        initialWeightData = Object.keys(response.data).map((id) => {
          return {
            id,
            date: response.data[id].date,
            weight: response.data[id].weight,
          };
        });

        setWeightData(initialWeightData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios
      .get(users_url + userId + "/workouts.json")
      .then(function (response) {
        // handle success

        initialWorkouts = Object.keys(response.data).map((id) => {
          return {
            id,
            name: response.data[id].name,
            time: +response.data[id].time,
            weight: +response.data[id].weight,
            reps: +response.data[id].reps,
            rpe: +response.data[id].rpe,
          };
        });

        setWorkouts(initialWorkouts);
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
  const addWeightDataHandler = (data) => {
    const id = (Math.random() + 1).toString(36).substring(7);
    setWeightData((prevState) => {
      return [{ date: data.date, weight: data.weight, id }, ...prevState];
    });
    axios
      .put(users_url + userId + `/weightData/${id}.json`, {
        date: data.date,
        weight: data.weight,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addWorkoutHandler = (data) => {
    if (data.time === "0") data.time = "";
    const id = (Math.random() + 1).toString(36).substring(7);
    setWorkouts((prevState) => {
      return [
        {
          id,
          name: data.exercise,
          time: +data.time,
          weight: +data.weight,
          reps: +data.reps,
          rpe: +data.rpe,
        },
        ...prevState,
      ];
    });
    axios
      .put(users_url + userId + `/workouts/${id}.json`, {
        name: data.exercise,
        time: data.time,
        weight: data.weight,
        reps: data.reps,
        rpe: data.rpe,
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
    axios
      .delete(users_url + userId + `/exercises/${id}.json`)
      .then(() => console.log("Deleted"));
  };
  const deleteWeightDataHandler = (id) => {
    const newWeightData = weightData.filter((data) => data.id !== id);
    setWeightData(newWeightData);
    axios
      .delete(users_url + userId + `/weightData/${id}.json`)
      .then(() => console.log("Deleted"));
  };

  const deleteWorkoutHandler = (ids) => {
    const newWorkouts = workouts.filter((workout) => !ids.includes(workout.id));
    setWorkouts(newWorkouts);
    for (const id of ids) {
      axios
        .delete(users_url + userId + `/workouts/${id}.json`)
        .then(() => console.log("Deleted"));
    }
  };
  const editExerciseHandler = (id, input) => {
    setExercises((prevState) => {
      let newState = [...prevState];
      const index = newState.findIndex((exercise) => exercise.id === id);
      newState[index].name = input;
      return newState;
    });
    axios
      .put(users_url + userId + `/exercises/${id}.json`, { name: input })
      .then((res) => console.log(res));
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
    workouts,
    weightData,
    addWeightData: addWeightDataHandler,
    deleteWeightData: deleteWeightDataHandler,
    addExercise: addExerciseHandler,
    deleteExercise: deleteExerciseHandler,
    editExercise: editExerciseHandler,
    addWorkout: addWorkoutHandler,
    deleteWorkout: deleteWorkoutHandler,
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
