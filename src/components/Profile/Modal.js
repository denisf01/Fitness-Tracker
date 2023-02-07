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
import { passwordChange_url } from "../../constants/url";
import axios from "axios";
import Context from "../../store/context";
import CustomizedAlert from "../Alert/Alert";
import { changePassword, loginInputs } from "../../constants/loginInputs";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
export default function FormDialog(props) {
  const [success, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const ctx = useContext(Context);
  const { t } = useTranslation();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClose = () => {
    props.close();
    setError(null);
    reset();
  };
  const submitHandler = (data) => {
    if (data.password !== data.repassword) {
      setError(t("repassword"));
      return;
    }
    setError(null);

    axios
      .post(passwordChange_url, {
        idToken: ctx.token,
        password: data.password,
        returnSecureToken: true,
      })
      .then(function (response) {
        console.log(response);
        const expirationTime = new Date(
          new Date().getTime() + +response.data.expiresIn * 1000
        );

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          ctx.login(
            response.data.idToken,
            response.data.localId,
            expirationTime.toISOString()
          );
          reset();
          props.close();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
        setError(t("oldLogin"));
      });
  };

  return (
    <div>
      {success && <CustomizedAlert text={t("passwordChangeSuccess")} />}

      <Dialog open={props.open} onClose={handleClose}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 1 }}
        >
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{props.text}</DialogContentText>

            {changePassword.map((input) => {
              return (
                <TextField
                  error={!!errors[`${input.id}`]}
                  helperText={
                    errors[`${input.id}`] === undefined ? "" : input.helperText
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
              );
            })}
          </DialogContent>
          <Typography style={{ color: "red", textAlign: "center" }}>
            {!!error ? error : ""}
          </Typography>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type={"submit"}>Confirm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
