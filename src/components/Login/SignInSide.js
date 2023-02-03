import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { loginInputs } from "../../constants/loginInputs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginImage from "../../images/login-image.jpg";
import { useContext, useState } from "react";
import { signIn_url, signUp_url, users_url } from "../../constants/url";
import Context from "../../store/context";
import CustomizedAlert from "../Alert/Alert";
import { Copyright } from "../../constants/functions";

const theme = createTheme();

export default function SignInSide() {
  const ctx = useContext(Context);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!isLogin) {
      if (data.password !== data.repassword) {
        setError({ type: "password", text: "Repeat password does not match!" });
        return;
      }
    }
    axios
      .post(isLogin ? signIn_url : signUp_url, {
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      })
      .then(function (response) {
        console.log(response);

        setError(null);
        if (!isLogin) {
          axios.put(users_url + `${response.data.localId}.json`, {
            FirstName: data.firstname,
            LastName: data.lastname,
            email: data.email,
          });
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
          ? setError({ type: "login", text: "Invalid email or password." })
          : setError({ type: "login", text: "Email already exists!" });
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
        <CustomizedAlert
          text={
            isLogin
              ? "Logged in successfully. Redirecting..."
              : "Registered successfully. Redirecting...."
          }
        />
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
              {loginInputs.map((input) => {
                return (
                  (input.id === "firstname" ||
                  input.id === "lastname" ||
                  input.id === "repassword"
                    ? !isLogin
                    : true) && (
                    <TextField
                      error={!!errors[`${input.id}`]}
                      helperText={
                        errors[`${input.id}`] === undefined
                          ? ""
                          : input.helperText
                      }
                      margin={input.margin}
                      required
                      fullWidth
                      type={input.type}
                      key={input.id}
                      id={input.id}
                      label={input.label}
                      name={input.id}
                      autoComplete={input.autoComplete}
                      {...register(`${input.id}`, {
                        ...input.register,
                      })}
                    />
                  )
                );
              })}

              <Typography style={{ color: "red" }}>
                {!!error && error.type === "login" ? error.text : ""}
              </Typography>
              <Typography style={{ color: "red" }}>
                {!!error && error.type === "password" ? error.text : ""}
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
