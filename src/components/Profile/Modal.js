import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { API_KEY } from "../../constants/api";
import axios from "axios";
import Context from "../../store/context";
import CustomizedAlert from "../Alert/Alert";

export default function FormDialog(props) {
  const [success, setIsSuccess] = useState(false);
  const ctx = useContext(Context);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClose = () => {
    props.close();
    reset();
  };
  const submitHandler = (data) => {
    console.log(data);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
          API_KEY,
        {
          idToken: ctx.token,
          password: data.Password,
          returnSecureToken: true,
        }
      )
      .then(function (response) {
        console.log(response);
        const expirationTime = new Date(
          new Date().getTime() + +response.data.expiresIn * 1000
        );
        ctx.login(
          response.data.idToken,
          response.data.localId,
          expirationTime.toISOString()
        );
        reset();
        props.close();
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {success && <CustomizedAlert text={"Password changed successfully!"} />}

      <Dialog open={props.open} onClose={props.close}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 1 }}
        >
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{props.text}</DialogContentText>

            <TextField
              error={errors.Password !== undefined}
              helperText={
                errors.Password === undefined
                  ? ""
                  : "Password must be at least 6 characters."
              }
              autoFocus
              margin="dense"
              id="name"
              label={props.label}
              type="password"
              fullWidth
              variant="standard"
              autoComplete="password"
              {...register("Password", { required: true, minLength: 6 })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type={"submit"}>Confirm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}