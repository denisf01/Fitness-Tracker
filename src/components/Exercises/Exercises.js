import ExercisesPhoto from "../../images/exercises.jpg";
import classes from "./Exercises.module.css";
import Card from "../Card/Card";
import Exercise from "./Exercise";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import ExerciseInput from "./ExerciseInput";
import Context from "../../store/context";
import Button from "@mui/material/Button";
const Exercises = (props) => {
  const ctx = useContext(Context);
  const [isInput, setIsInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [exerciseId, setExerciseId] = useState(null);
  const addExerciseHandler = () => {
    setIsInput(true);
  };
  const closeHandler = () => {
    setIsInput(false);
    setIsEdit(false);
  };
  const editHandler = (id) => {
    setExerciseId(id);
    setIsEdit(true);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${ExercisesPhoto})`,
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <ExerciseInput
        id={"input"}
        label={"Exercise name"}
        text={"Please enter the name of the new exercise."}
        title={"Add new exercise"}
        open={isInput}
        close={closeHandler}
      />
      <ExerciseInput
        exerciseId={exerciseId}
        id={"edit"}
        label={"Exercise name"}
        text={"Please enter the new name of the exercise."}
        title={"Edit existing exercise"}
        open={isEdit}
        close={closeHandler}
      />
      <section className={classes.exercises}>
        <Card>
          <ul>
            {ctx.exercises.length === 0 ? (
              <h3 style={{ textAlign: "center" }}>No exercises</h3>
            ) : (
              ctx.exercises.map((exercise) => {
                return (
                  <Exercise
                    id={exercise.id}
                    key={exercise.id}
                    name={exercise.name}
                    edit={editHandler}
                  />
                );
              })
            )}
            <div style={{ textAlign: "center" }}>
              <Button onClick={addExerciseHandler}>
                <AddIcon />
              </Button>
            </div>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default Exercises;
