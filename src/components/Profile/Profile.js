import classes from "./Profile.module.css";
import React, { useContext, useState } from "react";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Context from "../../store/context";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { profileInputs } from "../../constants/profileInputs";
import ProfileCard from "./ProfileCard";
import ProfileTable from "./ProfileTable";
import WeightInput from "./WeightInput";
import { useTranslation } from "react-i18next";
const Profile = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const ctx = useContext(Context);

  const context1 = (
    <Box className={classes.loading} sx={{ display: "flex" }}>
      <CircularProgress color={"inherit"} />
    </Box>
  );

  const context2 = (
    <div className={classes.text}>
      {profileInputs.map((input) => {
        return (
          <Typography
            style={{ marginBottom: "1rem" }}
            className={classes.textItem}
            variant="h5"
            component="h5"
            key={Math.random().toString()}
          >
            {input.title + ": " + ctx.user[input.id]}
          </Typography>
        );
      })}
    </div>
  );
  const inputHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <div className={classes.background}>
      <WeightInput
        id={"input"}
        text={t("weightText")}
        title={t("weightTitle")}
        open={open}
        close={closeHandler}
      />
      <div className={classes.card}>
        <ProfileCard>
          <div className={classes.icon}>
            <Avatar
              sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}
            ></Avatar>
          </div>
          <div className={classes.text}>
            {!ctx.user.firstName ? context1 : context2}
          </div>
        </ProfileCard>
      </div>
      <div className={classes.table}>
        <ProfileTable
          addHandler={inputHandler}
          title={t("trackWeight")}
          data={ctx.weightData}
        />
      </div>
    </div>
  );
};

export default Profile;
