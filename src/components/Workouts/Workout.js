import classes from "./Workouts.module.css";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Context from "../../store/context";
import { useHistory } from "react-router-dom";
const Workout = (props) => {
  const history = useHistory();
  const ctx = useContext(Context);
  const deleteHandler = () => {
    ctx.deleteWorkout(props.id);
  };

  const workoutClickHandler = () => {
    history.push(`/workouts/${props.id}`);
  };

  return (
    <li className={classes.workout}>
      <div style={{ width: "93%" }} onClick={workoutClickHandler}>
        <h3>{props.name}</h3>
      </div>
      <div>
        <Button onClick={deleteHandler}>
          <DeleteIcon color={"action"} />
        </Button>
      </div>
    </li>
  );
};
export default Workout;
