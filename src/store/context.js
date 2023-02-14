import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { users_url } from "../constants/url";
import { sortDates } from "../constants/functions";

let logoutTimer;

const Context = React.createContext({
  token: null,
  id: null,
  isLoggedIn: false,
  login: (token, id, expirationTime) => {},
  logout: () => {},
  isLoggedOut: false,
  exercises: [],
  user: [],
  weightData: [],
  addWeightData: (data) => {},
  deleteWeightData: (id) => {},
  addExercise: (name) => {},
  deleteExercise: (id) => {},
  editExercise: (id, input) => {},
  workouts: [],
  addWorkout: (name) => {},
  addWorkoutDetail: (parentId, data) => {},
  deleteWorkout: (id) => {},
  deleteWorkoutDetail: (parentId, id) => {},
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
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
  });
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    axios
      .get(users_url + userId + "/exercises.json")
      .then(function (response) {
        // handle success
        if (!!response.data) {
          const initialExercises = Object.keys(response.data).map((id) => {
            return { id, name: response.data[id].name };
          });

          setExercises(initialExercises);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios
      .get(users_url + userId + "/weightData.json")
      .then(function (response) {
        // handle success
        if (!!response.data) {
          const initialWeightData = Object.keys(response.data).map((id) => {
            return {
              id,
              date: response.data[id].date,
              weight: response.data[id].weight,
            };
          });

          setWeightData(initialWeightData.sort(sortDates));
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios
      .get(users_url + userId + "/workouts.json")
      .then(function (response) {
        // handle success
        if (!!response.data) {
          const initialWorkouts = Object.keys(response.data).map((id) => {
            const details = response.data[id].details;
            let detailsArray;
            if (!!details)
              detailsArray = Object.keys(response.data[id].details);
            else detailsArray = [];

            return {
              id,
              name: response.data[id].name,
              details: detailsArray.map((id2) => {
                return {
                  id: id2,
                  exerciseName: response.data[id].details[id2].exerciseName,
                  time: response.data[id].details[id2].time,
                  weight: +response.data[id].details[id2].weight,
                  reps: +response.data[id].details[id2].reps,
                  rpe: +response.data[id].details[id2].rpe,
                };
              }),
            };
          });

          setWorkouts(initialWorkouts);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios
      .get(users_url + userId + ".json")
      .then(function (response) {
        // handle success
        setUser({
          firstName: response.data.FirstName,
          lastName: response.data.LastName,
          email: response.data.email,
        });
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
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const addWeightDataHandler = (data) => {
    const id = (Math.random() + 1).toString(36).substring(7);
    setWeightData((prevState) => {
      let newState = [
        ...prevState,
        { date: data.date, weight: data.weight, id },
      ];
      newState = newState.sort(sortDates);
      return [...newState];
    });
    axios
      .put(users_url + userId + `/weightData/${id}.json`, {
        date: data.date,
        weight: data.weight,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const addWorkoutHandler = (name) => {
    const id = (Math.random() + 1).toString(36).substring(7);
    setWorkouts((prevState) => {
      return [...prevState, { id, name, details: [] }];
    });
    axios
      .put(users_url + userId + `/workouts/${id}.json`, {
        name: name,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const addWorkoutDetailHandler = (parentId, data) => {
    const time = [data.time.$H, data.time.$m, data.time.$s];

    data.time = time[2] + 60 * time[1] + 3600 * time[0]; // save time in seconds

    const id = (Math.random() + 1).toString(36).substring(7);
    setWorkouts((prevState) => {
      const index = prevState.findIndex((el) => el.id === parentId);
      prevState[index].details = [
        ...prevState[index].details,
        {
          id,
          exerciseName: data.exercise,
          time: data.time,
          weight: +data.weight,
          reps: +data.reps,
          rpe: +data.rpe,
        },
      ];
      return [...prevState];
    });
    axios
      .put(users_url + userId + `/workouts/${parentId}/details/${id}.json`, {
        exerciseName: data.exercise,
        time: data.time,
        weight: +data.weight,
        reps: +data.reps,
        rpe: +data.rpe,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteExerciseHandler = (id) => {
    const newExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(newExercises);
    axios.delete(users_url + userId + `/exercises/${id}.json`);
  };
  const deleteWeightDataHandler = (id) => {
    const newWeightData = weightData.filter((data) => data.id !== id);
    setWeightData(newWeightData);
    axios.delete(users_url + userId + `/weightData/${id}.json`);
  };

  const deleteWorkoutHandler = (id) => {
    const newWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(newWorkouts);

    axios.delete(users_url + userId + `/workouts/${id}.json`);
  };

  const deleteWorkoutDetailHandler = (parentId, ids) => {
    setWorkouts((prevState) => {
      const index = prevState.findIndex((el) => el.id === parentId);
      prevState[index].details = prevState[index].details.filter(
        (workout) => !ids.includes(workout.id)
      );
      return [...prevState];
    });
    for (const id of ids) {
      axios.delete(
        users_url + userId + `/workouts/${parentId}/details/${id}.json`
      );
    }
  };
  const editExerciseHandler = (id, input) => {
    // let oldName;
    setExercises((prevState) => {
      let newState = [...prevState];
      const index = newState.findIndex((exercise) => exercise.id === id);
      // oldName = newState[index].name;
      newState[index].name = input;
      return newState;
    });
    axios.put(users_url + userId + `/exercises/${id}.json`, { name: input });
  };
  const logoutHandler = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.clear();
    setExercises([]);
    setWorkouts([]);
    setWeightData([]);
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
    user,
    addWeightData: addWeightDataHandler,
    deleteWeightData: deleteWeightDataHandler,
    addExercise: addExerciseHandler,
    deleteExercise: deleteExerciseHandler,
    editExercise: editExerciseHandler,
    addWorkout: addWorkoutHandler,
    deleteWorkout: deleteWorkoutHandler,
    addWorkoutDetail: addWorkoutDetailHandler,
    deleteWorkoutDetail: deleteWorkoutDetailHandler,
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
