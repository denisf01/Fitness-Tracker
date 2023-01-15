import classes from "./Exercise.module.css";
import React, {useContext} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Context from "../../store/context";

const Exercise = (props) => {
    const ctx = useContext(Context);
    const deleteHandler = () => {
        ctx.deleteExercise(props.id);

    }
  return (
    <li className={classes.exercise}>
      <div>
        <h3>{props.name}</h3>
      </div>
      <div>
        <Button>
          <EditIcon />
        </Button>
        <Button onClick={deleteHandler}>
          <DeleteIcon color={"action"} />
        </Button>
      </div>
    </li>
  );
};
export default Exercise;
