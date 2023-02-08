import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import Context from "../../store/context";
import dayjs from "dayjs";
import classes from "./Profile.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
export default function FormDialog(props) {
  const ctx = useContext(Context);
  const { t } = useTranslation();
  const [weight, setWeight] = useState("");
  const [date, setDate] = React.useState(dayjs());
  const [error, setError] = useState(false);
  const handleClose = () => {
    setError(false);
    props.close();
  };
  const inputChangeHandler = (event) => {
    setWeight(event.target.value);
  };
  const handleSubmit = () => {
    if (weight.toString().length === 0 || weight <= 0) {
      setError(true);
      return;
    }
    setError(false);
    const dateStr =
      ("0" + date.get("date")).slice(-2) +
      "-" +
      ("0" + (date.get("month") + 1)).slice(-2) +
      "-" +
      date.get("year");
    ctx.addWeightData({
      date: dateStr,
      weight,
    });
  };
  const dateChangeHandler = (newValue) => {
    setDate(newValue);
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          <TextField
            error={error}
            onChange={inputChangeHandler}
            autoFocus
            margin="dense"
            id="name"
            label={t("weightLabel")}
            type="number"
            fullWidth
            variant="standard"
          />
          <div className={classes.date}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={t("dateLabel")}
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={dateChangeHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Trans i18nKey={"actionButtons"}>
            <Button onClick={handleClose}></Button>
            <Button onClick={handleSubmit}></Button>
          </Trans>
        </DialogActions>
      </Dialog>
    </div>
  );
}
