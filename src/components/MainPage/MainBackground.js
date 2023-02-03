import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Context from "../../store/context";
import classes from "./MainPage.module.css";
import CustomizedAlert from "../Alert/Alert";
import { useTranslation } from "react-i18next";



const MainBackground = (props) => {
  const { t, i18n } = useTranslation();
  const ctx = useContext(Context);
  const history = useHistory();
  const loginHandler = () => {
    history.push("/login");
  };
  return (
    <div className={classes.background}>
      {ctx.isLoggedOut && <CustomizedAlert text={"Logged out"} />}
      <div className={classes.text}>
        <h1>{t("welcome")}</h1>
        <h3>{t("track")}</h3>
        {!ctx.isLoggedIn && (
          <div className={classes.login}>
            {t("join")}
            <div>
              <button onClick={loginHandler}>{t("login")}</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MainBackground;
