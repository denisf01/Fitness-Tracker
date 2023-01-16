import WorkoutsPhoto from "../../images/WorkoutsPhoto.jpg";
import WorkoutsTable from "./WorkoutsTable";
import classes from "./Workouts.module.css"
const Workouts = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${WorkoutsPhoto})`,
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={classes.table}>
        <WorkoutsTable />
      </div>
    </div>
  );
};

export default Workouts;
