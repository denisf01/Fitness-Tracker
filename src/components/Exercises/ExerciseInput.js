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

export default function FormDialog(props) {
  const ctx = useContext(Context);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const handleClose = () => {
    setError(false);
    props.close();
  };
  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = () => {
    if (input.toString().length === 0) {
      setError(true);
      return;
    }
    setError(false);
    if (props.id === "input") {
      ctx.addExercise(input);
      props.close();
      setInput("");
    }
    if (props.id === "edit") {
      if (!!props.exerciseId) {
        ctx.editExercise(props.exerciseId, input);
      }
    }
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          <TextField
            defaultValue={props.editName}
            error={error}
            onChange={inputChangeHandler}
            autoFocus
            margin="dense"
            id="name"
            label={props.label}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
