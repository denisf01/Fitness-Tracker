import WorkoutsTable from "./WorkoutsTable";
import classes from "./Workouts.module.css"
const Workouts = () => {
  return (
    <div
     className={classes.background}
    >
      <div className={classes.table}>
        <WorkoutsTable />
      </div>
    </div>
  );
};

export default Workouts;
