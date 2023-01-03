import classes from "./Backgroud.module.css";
import myImage from "../../images/main-image.jpg";

const Background = (props) => {
  return (
    <div className={classes.image}>
      <img src={myImage} />
      <div className={classes.text}>
        <h1>Welcome to the page!</h1>
        <h3>Track all kinds of fitness activities</h3>
      </div>
    </div>
  );
};

export default Background;
