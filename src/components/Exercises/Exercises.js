import classes from "./Exercises.module.css";
import { useContext, useState } from "react";
import ExerciseInput from "./ExerciseInput";
import Context from "../../store/context";
import ExerciseTable from "./ExerciseTable";
const Exercises = (props) => {
  const ctx = useContext(Context);
  const [isInput, setIsInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [exerciseId, setExerciseId] = useState(null);
  const [editName, setEditName] = useState("");
  const addExerciseHandler = () => {
    setIsInput(true);
  };
  const closeHandler = () => {
    setIsInput(false);
    setIsEdit(false);
  };
  const editHandler = (id) => {
    setExerciseId(id);
    const index = ctx.exercises.findIndex((el) => el.id === id);
    setEditName(ctx.exercises[index].name);
    setIsEdit(true);
  };
  return (
    <div className={classes.background}>
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
        editName={editName}
        id={"edit"}
        label={"Exercise name"}
        text={"Please enter the new name of the exercise."}
        title={"Edit existing exercise"}
        open={isEdit}
        close={closeHandler}
      />
      <div className={classes.exercises}>
        <ExerciseTable
          data={ctx.exercises}
          editHandler={editHandler}
          addHandler={addExerciseHandler}
          title={"Exercises"}
        />
      </div>
    </div>
  );
};

export default Exercises;
