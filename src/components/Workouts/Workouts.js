import classes from "./Workouts.module.css";
import { useContext, useState } from "react";
import WorkoutInput from "../Modal/ModalInput";
import Context from "../../store/context";
import WorkoutsTable from "./WorkoutsTable";
import { useTranslation } from "react-i18next";
const Workouts = (props) => {
  const { t } = useTranslation();
  const ctx = useContext(Context);
  const [isInput, setIsInput] = useState(false);
  const addWorkoutHandler = () => {
    setIsInput(true);
  };
  const closeHandler = () => {
    setIsInput(false);
  };

  return (
    <div className={classes.background}>
      <WorkoutInput
        id={"input"}
        label={t("workoutName")}
        text={t("workoutText")}
        title={t("newWorkout")}
        open={isInput}
        close={closeHandler}
        onSubmit={ctx.addWorkout}
      />

      <div className={classes.workouts}>
        <WorkoutsTable
          data={ctx.workouts}
          addHandler={addWorkoutHandler}
          title={t("workouts")}
        />
      </div>
    </div>
  );
};

export default Workouts;
