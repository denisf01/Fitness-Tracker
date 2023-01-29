import classes from "./MainPage.module.css";
import { useContext } from "react";
import Context from "../../store/context";
import CustomizedAlert from "../Alert/Alert";

const MainBackground = (props) => {
  const ctx = useContext(Context);
  return (
    <div className={classes.background}>
      {ctx.isLoggedOut && <CustomizedAlert text={"Logged out"} />}
      <div className={classes.text}>
        <h1>Welcome to the page!</h1>
        <h3>Track all kinds of fitness activities</h3>
      </div>
    </div>
  );
};

export default MainBackground;
