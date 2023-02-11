import WorkoutDetailTable from "./WorkoutDetailTable";
import classes from "./Workouts.module.css";
import { useParams } from "react-router-dom";

const WorkoutDetails = () => {
  const params = useParams();
  const parentId = params.workoutId;
  return (
    <div className={classes.background}>
      <div className={classes.table}>
        <WorkoutDetailTable parentId={parentId} />
      </div>
    </div>
  );
};

export default WorkoutDetails;
