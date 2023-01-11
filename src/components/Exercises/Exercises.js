import ExercisesPhoto from "../../images/exercises.jpg";
import classes from "./Exercises.module.css";
import Card from "../Card/Card";
import Exercise from "./Exercise";
const Exercises = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${ExercisesPhoto})`,
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
          overflowX: 'hidden',
          overflowY: 'scroll'
      }}
    >
      <section className={classes.exercises}>
        <Card>
          <ul>
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default Exercises;
