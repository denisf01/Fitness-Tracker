import classes from "./Exercise.module.css";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const Exercise = (props) => {
  return (
    <li className={classes.exercise}>
      <div>
        <h3>Test</h3>
      </div>
      <div>
        <Button>
          <EditIcon />
        </Button>
        <Button>
          <DeleteIcon color={"action"} />
        </Button>
      </div>
    </li>
  );
};
export default Exercise;
