import classes from "./MainPage.module.css";
import { useContext } from "react";
import Context from "../../store/context";
import CustomizedAlert from "../Alert/Alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const MainBackground = (props) => {
  const ctx = useContext(Context);
  const history = useHistory();
  const loginHandler = () => {
    history.push("/login");
  };
  return (
    <div className={classes.background}>
      {ctx.isLoggedOut && <CustomizedAlert text={"Logged out"} />}
      <div className={classes.text}>
        <h1>Welcome to the page!</h1>
        <h3>Track all kinds of fitness activities</h3>
        {!ctx.isLoggedIn && (
          <div className={classes.login}>
            Join us now!
            <div>
              <button onClick={loginHandler}>Login/Register</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBackground;
