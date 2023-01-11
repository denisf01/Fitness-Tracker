import classes from "./MainBackground.module.css";
import myImage from "../../images/main-image.jpg";
import myImage2 from "../../images/main-image2.jpg";

import { useContext } from "react";
import Context from "../../store/context";
import CustomizedAlert from "../Alert/Alert";
import ExercisesPhoto from "../../images/exercises.jpg";

const MainBackground = (props) => {
  const ctx = useContext(Context);
  return (
    <div
      style={{
        backgroundImage: `url(${myImage2})`,
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
          opacity: "1"


      }}
    >
      {ctx.isLoggedOut && <CustomizedAlert text={"Logged out"} />}
      <div className={classes.text}>
        <h1>Welcome to the page!</h1>
        <h3>Track all kinds of fitness activities</h3>
      </div>
    </div>
  );
};

export default MainBackground;
