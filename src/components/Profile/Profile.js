import ProfilePhoto from "../../images/profile-photo.png";
import classes from "./Profile.module.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Context from "../../store/context";
import axios from "axios";
const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const ctx = useContext(Context);
  const [data, setData] = useState({
    firstName: "Loading...",
    lastName: "Loading...",
    email: "Loading...",
  });

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://final-project-5c7aa-default-rtdb.europe-west1.firebasedatabase.app/users/${ctx.id}.json`
      );
      setData({
        firstName: response.data.FirstName,
        lastName: response.data.LastName,
        email: response.data.email,
      });
    } catch (error) {}
    setLoading(false);
  }, [ctx.id]);

    const changeName = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                `https://final-project-5c7aa-default-rtdb.europe-west1.firebasedatabase.app/users/${ctx.id}.json`, {
                    FirstName: "Test",
                    LastName: data.lastName,
                    email: data.email
                }

            );
            setData({
                firstName: response.data.FirstName,
                lastName: response.data.LastName,
                email: response.data.email,
            });
        } catch (error) {}
        setLoading(false);
    }, [ctx.id]);



  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const context1 = (
    <Box className={classes.loading} sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );

  const context2 = (
    <div className={classes.text}>
      <Typography variant="h5" component="h5">
        First Name: {data.firstName}
      </Typography>
      <Typography variant="h5" component="h5">
        Last Name: {data.lastName}
      </Typography>
      <Typography variant="h5" component="h5">
        e-mail: {data.email}
      </Typography>
    </div>
  );

  const changeNameHandler = () => {
      changeName();
  }

  return (
    <React.Fragment>
      <div className={classes.icon}>
        <img src={ProfilePhoto} />
      </div>
      {loading && context1}
      {!loading && context2}
        <button onClick={changeNameHandler}>Click me</button>
    </React.Fragment>
  );
};

export default Profile;
