import ProfileBackgroundPhoto from "../../images/profile-background.jpg";
import classes from "./Profile.module.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Context from "../../store/context";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";

import ProfileCard from "./ProfileCard";
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

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const context1 = (
    <Box className={classes.loading} sx={{ display: "flex" }}>
      <CircularProgress color={"inherit"} />
    </Box>
  );

  const context2 = (
    <div className={classes.text}>
      <Typography
        style={{ marginBottom: "1rem" }}
        className={classes.textItem}
        variant="h5"
        component="h5"
      >
        First Name: {data.firstName}
      </Typography>
      <Typography
        style={{ marginBottom: "1rem" }}
        className={classes.textItem}
        variant="h5"
        component="h5"
      >
        Last Name: {data.lastName}
      </Typography>
      <Typography
        style={{ marginBottom: "1rem" }}
        className={classes.textItem}
        variant="h5"
        component="h5"
      >
        e-mail: {data.email}
      </Typography>
    </div>
  );

  return (
    <div
      style={{
        backgroundImage: `url(${ProfileBackgroundPhoto})`,
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={classes.card}>
        <ProfileCard>
          <div className={classes.icon}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>
              U
            </Avatar>
          </div>
          <div className={classes.text}>
            {loading && context1}
            {!loading && context2}
          </div>
        </ProfileCard>
      </div>
    </div>
  );
};

export default Profile;
