import classes from "./MainBackground.module.css";
import myImage from "../../images/main-image.jpg";
import {useContext} from "react";
import Context from "../../store/context";
import CustomizedAlert from "../Alert/Alert";


const MainBackground = (props) => {
    const ctx = useContext(Context);
  return (
    <div className={classes.image}>
        {ctx.isLoggedOut && <CustomizedAlert text={"Logged out"}/>}
      <img src={myImage} />
      <div className={classes.text}>
        <h1>Welcome to the page!</h1>
        <h3>Track all kinds of fitness activities</h3>
      </div>
    </div>
  );
};

export default MainBackground;
