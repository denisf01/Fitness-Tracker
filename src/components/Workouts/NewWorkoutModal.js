import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import classes from "./Workouts.module.css"
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import Context from "../../store/context";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { workoutInputs } from "../../constants/workoutInputs";

export default function NewWorkoutModal(props) {
  const ctx = useContext(Context);
  const [exerciseInput, setExerciseInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  const [rpeInput, setRpeInput] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const handleClose = () => {
    props.close();
  };
  const exerciseChangeHandler = (event) => {
    setExerciseInput(event.target.value);
  };
  const timeChangeHandler = (event) => {
    setTimeInput(event.target.value);
  };
  const weightChangeHandler = (event) => {
    setWeightInput(event.target.value);
  };
  const repsChangeHandler = (event) => {
    setRepsInput(event.target.value);
  };
  const rpeChangeHandler = (event) => {
    setRpeInput(event.target.value);
  };
  const onSubmit = (data) => {
    console.log(data);
    // props.onSubmit();
    // props.close();
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add new workout</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <FormControl style={{ marginTop: "5px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
              <Select
                value={exerciseInput}
                label="Exercise"
                error={!!errors.exercise}
                {...register(`exercise`, {
                  required: true,
                })}
                onChange={exerciseChangeHandler}
              >
                {ctx.exercises.map((exercise) => {
                  return (
                    <MenuItem
                      key={Math.random().toString()}
                      value={exercise.name}
                    >
                      {exercise.name}
                    </MenuItem>
                  );
                })}
              </Select>

              {workoutInputs.map((input) => {
                return (
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
                    type={"number"}
                    InputProps={{
                      inputProps: {
                        ...input.inputProps,
                      },
                    }}
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
            </FormControl>
            <div className={classes.action}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type={"submit"}>Submit</Button>
            </div>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
