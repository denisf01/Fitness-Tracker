import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import classes from "./Workouts.module.css";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef, useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { workoutInputs } from "../../constants/workoutInputs";

export default function NewWorkoutModal(props) {
  const ctx = useContext(Context);
  const ref = useRef();
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const handleStart = () => {
    setStartTimer(true);
  };
  const handleStop = () => {
    setStartTimer(false);
  };
  const handleReset = () => {
    setTimer(0);
    ref.current.value = 0;
  };
  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        setTimer((prevState) => prevState + 1);
      }, 1000);
      ref.current.value = timer;
    }
  }, [timer, startTimer]);
  const handleClose = () => {
    reset();
    props.close();
  };

  const onSubmit = (data) => {
    data.time = ref.current.value.toString();
    console.log(data);
    ctx.addWorkout(data);
    reset();
    props.close();
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
                label="Exercise"
                error={!!errors.exercise}
                {...register(`exercise`, {
                  required: true,
                })}
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
              <div style={{ width: "auto", margin: "auto" }}>
                <Button onClick={handleStart}>Start</Button>
                <Button onClick={handleStop}>Stop</Button>
                <Button onClick={handleReset}>Reset</Button>
              </div>
              <div style={{ textAlign: "center" }}>Time(s)</div>
              {workoutInputs.map((input) => {
                return (
                  <TextField
                    error={!!errors[`${input.id}`]}
                    helperText={
                      errors[`${input.id}`] === undefined
                        ? ""
                        : input.helperText
                    }
                    inputRef={input.id === "time" ? ref : null}
                    defaultValue={input.id === "time" ? 0 : null}
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
