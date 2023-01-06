import * as React from "react";
import Button from "@mui/material/Button";
import { Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import Context, { ContextProvider } from "./store/context";
import { useContext } from "react";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/MainPage/Header";
function App() {
  const ctx = useContext(Context);
  return (
    <React.Fragment>
        <Header/>
      <Switch>
        <Route path={"/"} exact>
          <LandingPage />
        </Route>
        {!ctx.isLoggedIn && (
          <Route path={"/login"} exact>
            <SignInPage />
          </Route>
        )}
        {ctx.isLoggedIn && (
          <Route path={"/profile"} exact>
            <ProfilePage />
          </Route>
        )}
        <Route path={"/"}>
          <Redirect to={"/"} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
