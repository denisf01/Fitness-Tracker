import classes from "./Profile.module.css";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Context from "../../store/context";

const WeightData = (props) => {
  const ctx = useContext(Context);
  const deleteHandler = () => {
    ctx.deleteWeightData(props.id);
  };

  return (
    <li className={classes.data}>
      <div>
        <h3>
          {props.date} - {props.weight}kg
        </h3>
      </div>
      <div>
        <Button onClick={deleteHandler}>
          <DeleteIcon color={"action"} />
        </Button>
      </div>
    </li>
  );
};
export default WeightData;
