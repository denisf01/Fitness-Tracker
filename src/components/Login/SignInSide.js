import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginImage from "../../images/login-image.jpg";
import Header from "../MainPage/Header";
import { createRef, useContext, useRef, useState } from "react";
import { API_KEY } from "../../constants/api";
import Context from "../../store/context";
import CustomizedSnackbars from "./Alert";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link style={{ color: "inherit" }} to="/">
        FitnessTracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const ctx = useContext(Context);
  const [error, setError] = useState(undefined);
  const [isLogin, setIsLogin] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let url;
  if (isLogin)
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      API_KEY;
  else
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      API_KEY;
  const onSubmit = (data) => {
    axios
      .post(url, {
        email: data.Email,
        password: data.Password,
        returnSecureToken: true,
      })
      .then(function (response) {
        console.log(response);

        setError(undefined);
        if (!isLogin) {
          axios.put(
            `https://final-project-5c7aa-default-rtdb.europe-west1.firebasedatabase.app/users/${response.data.localId}.json`,
            {
              FirstName: data.FirstName,
              LastName: data.LastName,
              email: data.Email,
            }
          );
        }
        const expirationTime = new Date(
          new Date().getTime() + +response.data.expiresIn * 1000
        );
        setIsSuccess(true);
        setTimeout(() => {
          ctx.login(
            response.data.idToken,
            response.data.localId,
            expirationTime.toISOString()
          );
          setIsSuccess(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
        isLogin
          ? setError("Invalid email or password.")
          : setError("Email already exists.");
      });
  };

  const RegisterHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(undefined);
    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <br />
      {isSuccess && (
        <CustomizedSnackbars text={"Logged in successfully. Redirecting..."} />
      )}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Sign In" : "Sign up"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              {!isLogin && (
                <TextField
                  error={errors.FirstName !== undefined}
                  helperText={
                    errors.FirstName === undefined
                      ? ""
                      : "Please enter valid first name."
                  }
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First name"
                  name="firstname"
                  autoComplete=""
                  {...register("FirstName", {
                    required: true,
                    maxLength: 80,
                    minLength: 2,
                  })}
                />
              )}
              {!isLogin && (
                <TextField
                  error={errors.LastName !== undefined}
                  helperText={
                    errors.LastName === undefined
                      ? ""
                      : "Please enter valid last name."
                  }
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last name"
                  name="lastname"
                  autoComplete=""
                  {...register("LastName", {
                    required: true,
                    maxLength: 80,
                    minLength: 2,
                  })}
                />
              )}
              <TextField
                error={errors.Email !== undefined}
                helperText={
                  errors.Email === undefined
                    ? ""
                    : "Please enter valid e-mail address."
                }
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("Email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <TextField
                error={errors.Password !== undefined}
                helperText={
                  errors.Password === undefined
                    ? ""
                    : "Password must be at least 6 characters."
                }
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("Password", { required: true, minLength: 6 })}
              />

              <Typography style={{ color: "red" }}>
                {!!error ? error : ""}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLogin ? "Sign in" : "Sign up"}
              </Button>
              <Grid container>
                <Grid item>
                  <div
                    onClick={RegisterHandler}
                    style={{
                      cursor: "pointer",
                      color: "#3737F3FF",
                      textDecoration: "underline 2px",
                    }}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </div>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
