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
  const handleClose = () => {
    props.close();
  };
  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = () => {
    ctx.addExercise(input);
    props.close();
    setInput('');
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add new exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new exercise.
          </DialogContentText>
          <TextField
            onChange={inputChangeHandler}
            autoFocus
            margin="dense"
            id="name"
            label="Exercise name"
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
